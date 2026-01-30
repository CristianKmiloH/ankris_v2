# Directiva: Importación de Mazos Anki (.apkg)

> **ID:** DIRECTIVA-IMPORT-ANKI
> **Objetivo:** Permitir al usuario importar archivos `.apkg` (Anki) para popular la base de datos de Ankris.
> **Scope:** Frontend (Botón + Upload) -> Backend (Parseo + Persistencia).

## 1. Entrada (Inputs)
- **Archivo:** `.apkg` (Zip comprimido).
- **Usuario:** `userId` (Propietario del mazo).

## 2. Proceso (Lógica)

### A. Frontend
1.  **UI:** Botón "Importar" en Header (estilo circular, icono `ArrowDownTray` o similar).
2.  **Acción:** `input[type="file"]` oculto.
3.  **Upload:** `FormData` con el archivo a `POST /api/import/anki`.

### B. Backend (Node/TS)
1.  **Middleware:** `multer` recibe archivo y guarda en temporal (`.tmp/uploads/`).
2.  **Servicio (`ImportService.ts`):**
    -   **Unzip:** Extraer `.apkg` usando `adm-zip`.
    -   **DB Read:** Leer `collection.anki2` (SQLite) usando `better-sqlite3`.
    -   **Mapping:**
        -   Anki `col` -> Ankris `Deck` (Root).
        -   Anki `decks` -> Ankris `Deck` (Child).
        -   Anki `models` -> Ankris `NoteType` + `Templates`.
        -   Anki `notes` -> Ankris `Note` (mapeo de campos via orden).
        -   Anki `cards` -> Ankris `Card` (scheduler state mapping).
    -   **Media:** Mover archivos de media extraídos a `storage/media`.
3.  **Cleanup:** Borrar archivos temporales.

## 3. Salida (Outputs)
- **Éxito:** JSON `{ status: "success", importedDecks: 1, importedCards: 50 }`.
- **Error:** JSON `{ error: "Corrupt file / Invalid format" }`.

## 4. Restricciones / Reglas
- **Modularidad:** Todo el proceso debe vivir en `src/modules/import/`.
- **No-Bloqueo:** Idealmente proceso async, pero para MVP síncrono está bien si el mazo es pequeño (<50MB).
- **Tipos de Nota:** Si el `NoteType` ya existe (por nombre/id), reutilizar o versionar para evitar conflictos.

## 5. Dependencias Nuevas
- `multer`
- `adm-zip`
- `better-sqlite3` (o `sqlite3`)
