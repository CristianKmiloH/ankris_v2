# Directiva: Importación desde AnkiWeb

## Objetivo
Permitir a los usuarios buscar y descargar mazos compartidos directamente desde AnkiWeb (ankiweb.net) sin salir de la aplicación.

## Arquitectura
- **Módulo Backend:** `src/modules/ankiweb/`
- **Servicio:** `AnkiWebService` (Scraping con Axios + Cheerio)
- **Controlador:** `AnkiWebController` (Endpoints REST)

## Endpoints
1.  **GET /api/ankiweb/search?q={query}**
    -   **Entrada:** `q` (string) - Término de búsqueda.
    -   **Proceso:**
        1.  Scraping de `https://ankiweb.net/shared/decks/${query}`.
        2.  Parseo de HTML para extraer: Título, ID, Miniatura (si hay), Cantidad de Notas.
    -   **Salida:** Array de objetos `AnkiWebDeck`.

2.  **POST /api/ankiweb/download**
    -   **Entrada:** `{ deckId: string }`
    -   **Proceso:**
        1.  Obtener enlace de descarga desde `https://ankiweb.net/shared/info/${deckId}`.
        2.  Descargar archivo `.apkg` a `.tmp/`.
        3.  Invocar `ImportService.importFromPath` para procesar el mazo.
    -   **Salida:** Resultado de la importación (éxito/error).

## Reglas y Restricciones
-   **Sin API Oficial:** AnkiWeb no tiene API pública. Esta funcionalidad depende del scraping del HTML.
-   **Entorno:** Python no está disponible en el entorno del usuario. Usar Node.js para scripts de validación.
-   **User-Agent:** Usar un User-Agent genérico al hacer peticiones para evitar bloqueos simples.
-   **Manejo de Errores:** Si AnkiWeb cambia su estructura HTML, el servicio fallará. Implementar logs claros para facilitar la depuración.
-   **Respeto:** No abusar de las peticiones (rate limiting implícito por la velocidad del usuario).

## Dependencias
-   `axios`
-   `cheerio`
