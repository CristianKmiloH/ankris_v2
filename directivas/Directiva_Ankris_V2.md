# DIRECTIVA: Ankris – Anki Moderno con Esteroides

> **ID:** Ankris-2026-01-25  
> **Documentos Asociados:** Ankris_Master_Spec.md, Ankris_Architecture.md  
> **Última Actualización:** 25 de enero de 2026  
> **Estado:** ACTIVO  
> **Versión:** 1.0  
> **Propietario:** [Tu nombre / Equipo]

---

## 1. Objetivos y Alcance

### Objetivo Principal

Construir **Ankris**: una versión moderna, modular y extensible de Anki que replica todas las funcionalidades de la versión actual, integra innovaciones impulsadas por IA (generación automática de tarjetas desde PDFs, asistente de revisión, refinamiento inteligente), mantiene una arquitectura escalable, y presenta una interfaz de usuario limpia, fluida y visualmente atractiva (oscura por defecto, sin aspecto "Windows 98").

### Visión

- **Funcionalidad:** Clon 1:1 de Anki con todas sus características (SRS, scheduler, tipos de nota, plantillas, browser, estadísticas, sincronización).
- **Innovación:** Integración de IA generativa para acelerar la creación de mazos, mejorar retención y simplificar el flujo de aprendizaje.
- **Experiencia:** UI/UX moderna, responsive, accesible, con microinteracciones fluidas y diseño intencional.
- **Arquitectura:** Modular, escalable, agnóstica a framework (migración futura entre tecnologías sin re-escritura masiva).

### Criterios de Éxito

1. **MVP v0 (Clon mínimo):** Decks, notas, cards, scheduler SRS básico, reviewer, editor, browser, estadísticas, todas funcionales sin IA.
2. **MVP v1 (IA + Modern UI):** Generación PDF→deck vía IA, UI moderna y theming, búsqueda avanzada en browser, asistente de revisión con IA, estadísticas mejoradas.
3. **Calidad de código:** Cobertura >80% en tests unitarios, arquitectura por capas clara, tipos estáticos (TypeScript o similar).
4. **Rendimiento:** Sesiones de repaso <100ms por tarjeta, carga de browser <500ms incluso con 10k+ tarjetas.
5. **UX:** Encuestas de usuario: >4.5/5 en "facilidad de uso", >4/5 en "diseño visual".

---

## 2. Especificaciones de Entrada/Salida (I/O)

### 2.1 Entradas (Inputs)

#### Argumentos y Parámetros Requeridos

- **Datos de usuario:**
  - `userId` (UUID/String): Identificador único del usuario.
  - `email` (String): Correo del usuario para sincronización y recuperación.
  - `preferredLanguage` (String): Idioma de la UI ("es", "en", "fr", etc.).
  - `colorScheme` (String: "dark" | "light"): Tema preferido de la interfaz.

- **Operaciones de estudio:**
  - `deckId` (UUID): ID del mazo a estudiar.
  - `maxNew` (Int): Límite de tarjetas nuevas por día.
  - `maxReviews` (Int): Límite de repasos por día.
  - `sessionDuration` (Int): Duración máxima en minutos (opcional, para "session planner").

- **Operaciones de IA:**
  - `documentPath` (String): Ruta del PDF/Markdown/HTML a procesar.
  - `noteTypeTemplate` (String: "basic" | "cloze" | "reverse" | "custom"): Tipo de nota para IA.
  - `cardDensity` (Float: 0.5–1.0): Densidad de tarjetas generadas (0.5 = pocas, 1.0 = muchas).
  - `targetDifficulty` (String: "beginner" | "intermediate" | "advanced"): Nivel de dificultad deseado.

#### Variables de Entorno (.env)

```
# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/Ankris_db
DB_ENV=development|staging|production

# Autenticación y sincronización
JWT_SECRET=[larga_cadena_criptográfica]
ANKIWEB_API_KEY=[token_para_sincronización_opcional]

# Servicios de IA
OPENAI_API_KEY=[clave_de_OpenAI_o_compatibles]
AI_MODEL=gpt-4|gpt-3.5-turbo|claude-3|local_model
AI_BASE_URL=[endpoint_si_self_hosted]
MAX_AI_CALLS_PER_MONTH=1000
AI_TIMEOUT_SECONDS=30

# Almacenamiento de media
MEDIA_STORAGE=local|aws_s3|gcs
S3_BUCKET=[bucket_name_si_aplica]
MAX_MEDIA_SIZE_MB=100

# Notificaciones y correo
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=[tu_correo]
SMTP_PASSWORD=[app_password]

# Sentry / Error Tracking (opcional)
SENTRY_DSN=[url_sentry_si_aplica]

# Logging
LOG_LEVEL=info|debug|warn|error
```

#### Archivos Fuente

- **Documentos de entrada:**
  - `.pdf`, `.docx`, `.markdown`, `.html`: Contenido a procesar con IA para generar tarjetas.
  - `.apkg` (Anki export): Paquetes de mazo para importar.
  - `.csv` (flat): Importación rápida de notas en formato tabular.

- **Configuración:**
  - `config.json`: Preferencias de la aplicación (temas, atajos de teclado, opciones de scheduler).
  - `note_types.json`: Definiciones personalizadas de tipos de nota (campos, plantillas HTML/CSS).

- **Bases de datos:**
  - PostgreSQL (para persistencia relacional de usuarios, decks, notas, cards, logs).
  - Redis (opcional, para caché de scheduler y sesiones activas).
  - MongoDB (alternativa documental, si se prefiere flexibilidad en campos de nota).

### 2.2 Salidas (Outputs)

#### Artefactos Generados

- **Bases de datos:**
  - `Ankris_db` (PostgreSQL): Contiene usuarios, decks, notas, cards, review_logs, tags, media_links, sync_state, ai_generations.

- **Archivos de media:**
  - `/media/[user_id]/[note_id]/`: Carpeta con imágenes, audio, archivos asociados a notas.

- **Exportaciones:**
  - `.apkg` (Anki package): Descarga de un mazo en formato estándar Anki.
  - `.json`: Export de colección completa (para respaldo o portabilidad).
  - `.csv`: Export de notas en formato tabular.

- **Reportes y estadísticas:**
  - `/exports/user_[id]_stats_[date].json`: Snapshot de estadísticas personales (tasas de retención, gráficos).
  - `/logs/scheduler_[date].log`: Log de decisiones del scheduler para auditoría.

#### Retorno de APIs / Consola

```json
{
  "status": "success|error",
  "data": {
    "resource": "deck|note|card|aiGeneration",
    "action": "created|updated|deleted|reviewed",
    "resourceId": "[UUID]",
    "timestamp": "[ISO8601]"
  },
  "errors": [
    { "code": "VALIDATION_ERROR", "message": "..." }
  ]
}
```

---

## 3. Flujo Lógico: Mapa de Procesos Nucleares

### 3.1 Flujo de Importación de Documento y Generación IA

1. **Descarga y validación de documento**
   - Usuario sube archivo (PDF, Markdown, HTML, DOCX).
   - Sistema valida: formato, tamaño (<100MB), encoding.
   - Si es inválido, rechazar con mensaje de error claro.

2. **Segmentación (Chunking)**
   - Parser específico por formato (pdfplumber para PDF, markdownify para HTML, python-docx para DOCX).
   - Divide contenido en chunks lógicos (párrafos, secciones, límite ~1000 tokens).
   - Limpieza: eliminar boilerplate, normalizar espacios, sanitizar caracteres especiales.

3. **Generación de tarjetas con IA**
   - Para cada chunk, usar LLM (OpenAI GPT-4, Claude 3, o local) para generar:
     - Preguntas-respuestas (si `noteType = "basic"`).
     - Cloze deletions (si `noteType = "cloze"`).
     - Pares pregunta/respuesta reversibles (si `noteType = "reverse"`).
   - Prompt parametrizable por `cardDensity` (cuántas tarjetas por chunk) y `targetDifficulty`.
   - Validar sintaxis, evitar duplicados contra colección existente.

4. **Curación manual (opcional pero recomendado)**
   - Sistema propone tarjetas; usuario puede: aprobar, rechazar, editar antes de guardar.
   - Vista preview en tiempo real con estilo de la tarjeta.

5. **Persistencia**
   - Crear notas en base de datos, asociadas a mazo destino.
   - Registrar origen (`source: "ai_from_pdf"`, `source_document_id`, `ai_model_version`).
   - Guardar tokens usados para auditoría de costo IA.

6. **Notificación al usuario**
   - Email: "Se generaron X tarjetas de tu PDF. Revísalas aquí: [link]".
   - UI: notificación in-app con resumen.

### 3.2 Flujo de Sesión de Estudio (Reviewer)

1. **Cálculo de cola diaria (Scheduler)**
   - Leer preferencias del usuario: maxNew, maxReviews, deck-specific options.
   - Consultar DB: tarjetas due hoy, ordenadas por prioridad (due date, ease, lapse count).
   - Aplicar filtros y bury logic (no mostrar múltiples tarjetas de la misma nota).
   - Retornar lista ordenada de Card IDs para la sesión.

2. **Inicialización de sesión**
   - Crear `ReviewSession` (user, deck, list de cards, timestamp inicio).
   - Renderizar primera tarjeta usando plantilla HTML/CSS de su tipo de nota.
   - Mostrar estado: "3 of 20 | ~15 min estimated".

3. **Presentación y respuesta**
   - Mostrar frente de tarjeta.
   - Usuario presiona espacio/tap para revelar respuesta.
   - Usuario selecciona: Again (1) / Hard (2) / Good (3) / Easy (4).
   - Registrar: time_taken, rating, timestamp.

4. **Cálculo SRS (Scheduler)**
   - Aplicar algoritmo SM-2 modificado:
     ```
     ease' = max(1.3, ease + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02)))
     if rating == 1 (Again):
         interval' = 1 day
         new_state = "learning"
     else:
         interval' = previous_interval * ease'
         new_state = "review" si interval > 21 days, else "learning"
     due' = today + interval'
     ```
   - Guardar en DB: card.ease, card.interval, card.due, card.state.
   - Registrar en `ReviewLog` (card_id, user_id, rating, time_taken, ease_before, ease_after, interval_before, interval_after).

5. **Persistencia y sincronización de estado**
   - Commit a DB cada respuesta (o batch each 5 respuestas para optimizar).
   - Si usuario tiene sync habilitado, marcar card para sincronizar en siguiente sync.

6. **Fin de sesión**
   - Mostrar resumen: "Completaste 20 repasos en 12 min. Mañana: 5 nuevas, 18 repasos".
   - Ofrecer: exportar estadísticas, ver gráficos, cambiar opciones del mazo.

### 3.3 Flujo de Edición de Notas (Editor)

1. **Inicialización**
   - Cargar: NoteType (campos y templates), nota existente (si editar) o vacía (si crear).
   - Renderizar formulario: campos de entrada, selector de mazo, tags input con autocompletado.

2. **Edición de campos**
   - Editor de texto enriquecido (negrita, cursiva, listas, código, latex, etc.).
   - Soporte para drag-drop de imágenes y audio.
   - Vista previa live de la tarjeta (lado frontal y posterior).

3. **Detección de duplicados**
   - Mientras tipea en campo "Front", buscar duplicados en DB.
   - Mostrar advertencia si existe otro "Front" idéntico en el mazo.

4. **Validación**
   - Campos requeridos no vacíos.
   - Plantillas renderizadas correctamente.
   - Media adjunta válida (imagen: <10MB, audio: <20MB).

5. **Persistencia**
   - Crear o actualizar nota en DB.
   - Si es nota nueva: generar M tarjetas (una por template en su NoteType).
   - Registrar: created_at, modified_at, user_id, mazo_id.

6. **Cierre**
   - Volver a editor vacío, mostrando mensajeSuccess, o abrir nota en Browser.

### 3.4 Flujo de Sincronización (hacia AnkiWeb-like)

1. **Trigger**: usuario presiona "Sync" o sincronización automática cada 30 min.

2. **Obtener cambios locales**
   - Consultar `SyncState` tabla: notas/tarjetas con `sync_status = "pending"`.
   - Serializar: notas (con todos sus campos), tarjetas (estado SRS), review logs.

3. **Envío al servidor central**
   - POST a `/api/sync` con payload comprimido (gzip).
   - Incluir: user_id, token, colección_id, lista de cambios, checksum.

4. **Reconciliación en servidor**
   - Servidor detecta conflictos: ¿nota fue editada tanto localmente como remotamente?
   - Estrategia: "last-write-wins" o solicitar al usuario.

5. **Descarga de cambios remotos**
   - Si hay cambios en otros dispositivos, descargar y mergear localmente.

6. **Actualización de estado**
   - Marcar tarjetas/notas como `sync_status = "synced"`.
   - Notificar al usuario: "Sincronizado con éxito. 3 notas subidas, 0 descargadas."

---

## 4. Arquitectura de Módulos y Componentes

### 4.1 Backend (Server)

```
backend/
├── auth/
│   ├── services/
│   │   ├── AuthService.ts          # JWT, registro, login
│   │   └── TokenService.ts         # Generación y validación tokens
│   ├── controllers/
│   │   └── AuthController.ts       # Endpoints: /auth/register, /auth/login
│   └── middleware/
│       └── authMiddleware.ts       # Validación de JWT en requests
│
├── deck/
│   ├── services/
│   │   ├── DeckService.ts          # CRUD, jerarquía, opciones
│   │   └── DeckOptionService.ts    # Gestión de perfiles de estudio
│   ├── controllers/
│   │   └── DeckController.ts       # Endpoints: /decks, /decks/{id}, etc.
│   ├── models/
│   │   ├── Deck.ts                 # Entity: name, parent_id, options, created_at
│   │   └── DeckOption.ts           # Entity: maxNew, maxReviews, steps, ease_min, etc.
│   └── repositories/
│       └── DeckRepository.ts       # Queries DB
│
├── note/
│   ├── services/
│   │   ├── NoteService.ts          # CRUD, búsqueda, detección duplicados
│   │   ├── NoteTypeService.ts      # Gestión de tipos de nota y plantillas
│   │   └── FieldService.ts         # Validación y transformación de campos
│   ├── controllers/
│   │   └── NoteController.ts       # Endpoints: /notes, /notes/{id}, etc.
│   ├── models/
│   │   ├── Note.ts                 # Entity: note_type_id, fields{}, tags[], deck_id
│   │   ├── NoteType.ts             # Entity: name, fields[], templates[], styling
│   │   └── Field.ts                # Entity: name, type (text|image|audio)
│   └── repositories/
│       └── NoteRepository.ts
│
├── card/
│   ├── services/
│   │   ├── CardService.ts          # CRUD, estado
│   │   ├── SchedulerService.ts     # SM-2 algorithm, queue generation
│   │   └── ReviewService.ts        # Registra respuestas, calcula ease/interval
│   ├── controllers/
│   │   └── CardController.ts       # Endpoints: /cards/{id}/review
│   ├── models/
│   │   ├── Card.ts                 # Entity: note_id, due, ease, interval, state, lapses
│   │   └── ReviewLog.ts            # Entity: card_id, user_id, rating, time_taken, ease_after, interval_after
│   └── repositories/
│       └── CardRepository.ts
│
├── ai/
│   ├── services/
│   │   ├── DocumentIngestionService.ts    # Parseo PDF/Markdown/HTML/DOCX
│   │   ├── CardGenerationService.ts       # LLM: prompt + llamadas a OpenAI/Claude
│   │   ├── CardRefinementService.ts       # Simplificar, traducir, expandir tarjetas
│   │   └── ReviewAssistantService.ts      # Explicaciones y feedback durante repaso
│   ├── controllers/
│   │   └── AIController.ts                # Endpoints: /ai/generate-deck, /ai/refine-card
│   ├── models/
│   │   └── AIGeneration.ts                # Entity: document_id, model_version, cards_generated, tokens_used, cost
│   ├── repositories/
│   │   └── AIGenerationRepository.ts
│   └── prompts/
│       ├── generateBasicCards.prompt      # Prompt para generar Q&A
│       ├── generateClozeCards.prompt      # Prompt para cloze deletion
│       └── refineCard.prompt              # Prompt para mejoras
│
├── stats/
│   ├── services/
│   │   ├── StatsService.ts                # Agrega ReviewLog + Card para métricas
│   │   └── ReportService.ts               # Genera gráficos y reports JSON
│   ├── controllers/
│   │   └── StatsController.ts             # Endpoints: /stats/user, /stats/deck, etc.
│   └── models/
│       └── Statistic.ts                   # Entity o computed: daily_load, retention, ease_dist
│
├── sync/
│   ├── services/
│   │   ├── SyncService.ts                 # Orquesta sincronización
│   │   ├── ConflictResolutionService.ts   # Maneja conflictos merge
│   │   └── CompressionService.ts          # Serializa y comprime payloads
│   ├── controllers/
│   │   └── SyncController.ts              # Endpoint: POST /api/sync
│   └── models/
│       └── SyncState.ts                   # Entity: resource_id, resource_type, status, last_sync
│
├── media/
│   ├── services/
│   │   ├── MediaUploadService.ts          # Valida, redimensiona, almacena
│   │   └── MediaStorageService.ts         # Abstracción: local | S3 | GCS
│   ├── controllers/
│   │   └── MediaController.ts             # Endpoints: /media/upload, /media/{id}
│   └── models/
│       └── Media.ts                       # Entity: file_path, mime_type, size, note_id
│
├── search/
│   ├── services/
│   │   ├── SearchService.ts               # Parser de sintaxis Anki (deck:, tag:, is:)
│   │   └── IndexService.ts                # Índices para búsqueda rápida (Elasticsearch optional)
│   ├── controllers/
│   │   └── SearchController.ts            # Endpoint: GET /search?query=...
│   └── models/
│       └── SearchQuery.ts                 # DTO para parsing de búsqueda
│
├── browse/
│   ├── services/
│   │   └── BrowseService.ts               # Combina search + aggregations
│   ├── controllers/
│   │   └── BrowseController.ts            # Endpoint: GET /browse?filters=...&sort=...
│   └── models/
│       └── BrowseResult.ts                # DTO: notas, tarjetas, metadatos
│
├── config/
│   ├── database.ts                        # Conexión PostgreSQL
│   ├── redis.ts                           # Caché y sesiones
│   ├── logger.ts                          # Winston o Pino
│   └── env.ts                             # Validación de vars de entorno
│
├── middleware/
│   ├── errorHandler.ts                    # Manejo global de errores
│   ├── requestLogger.ts                   # Logging de requests
│   ├── rateLimiter.ts                     # Rate limiting por usuario
│   └── cors.ts                            # CORS config
│
├── types/
│   ├── entities.ts                        # Tipos TypeScript compartidos
│   └── dtos.ts                            # DTOs para requests/responses
│
└── app.ts                                  # Punto de entrada Express/Fastify
```

### 4.2 Frontend (Client)

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Tabs.tsx
│   │   │   └── Badge.tsx
│   │   │
│   │   ├── deck/
│   │   │   ├── DeckCard.tsx               # Card visual de mazo con progreso
│   │   │   ├── DeckList.tsx               # Lista de mazos
│   │   │   ├── DeckOptions.tsx            # Panel de opciones del mazo
│   │   │   └── DeckBrowser.tsx            # Árbol jerárquico de mazos
│   │   │
│   │   ├── reviewer/
│   │   │   ├── Card.tsx                   # Renderización de tarjeta (HTML templated)
│   │   │   ├── ReviewButtons.tsx          # Again/Hard/Good/Easy
│   │   │   ├── SessionProgress.tsx        # Barra de progreso y estado
│   │   │   ├── SessionSummary.tsx         # Resumen al finalizar
│   │   │   └── Reviewer.tsx               # Orquestador principal
│   │   │
│   │   ├── editor/
│   │   │   ├── NoteTypeSelector.tsx       # Dropdown para elegir tipo de nota
│   │   │   ├── FieldEditor.tsx            # Editor de campo (texto enriquecido)
│   │   │   ├── MediaUpload.tsx            # Drag-drop y upload de media
│   │   │   ├── CardPreview.tsx            # Preview live de tarjeta
│   │   │   ├── TagInput.tsx               # Input de tags con autocompletado
│   │   │   └── NoteEditor.tsx             # Componente principal
│   │   │
│   │   ├── browser/
│   │   │   ├── SearchBar.tsx              # Input de búsqueda con syntax hint
│   │   │   ├── FilterPanel.tsx            # Filtros por deck, tipo, estado, etc.
│   │   │   ├── NotesTable.tsx             # Tabla de notas con columnas configurables
│   │   │   ├── NotePreview.tsx            # Vista previa de nota en panel inferior
│   │   │   ├── BulkActions.tsx            # Cambiar mazo, tags, suspender, etc.
│   │   │   ├── GridView.tsx               # Alternativa: vista grid de tarjetas
│   │   │   └── Browser.tsx                # Orquestador principal
│   │   │
│   │   ├── stats/
│   │   │   ├── DailyLoadChart.tsx         # Gráfico barras carga diaria
│   │   │   ├── RetentionChart.tsx         # Gráfico líneas retención
│   │   │   ├── IntervalDistribution.tsx   # Histograma de intervalos
│   │   │   ├── ProgressRing.tsx           # Anillo circular de progreso
│   │   │   ├── StatsOverview.tsx          # Resumen de métricas clave
│   │   │   └── StatsPage.tsx              # Página principal de estadísticas
│   │   │
│   │   ├── ai/
│   │   │   ├── DocumentUpload.tsx         # Drop zone para PDFs
│   │   │   ├── GenerationSettings.tsx     # Card density, target difficulty, note type
│   │   │   ├── GeneratedCardsList.tsx     # Lista de tarjetas para curación
│   │   │   ├── CardCuration.tsx           # Preview + approve/reject
│   │   │   └── AIGenerationFlow.tsx       # Orquestador end-to-end
│   │   │
│   │   ├── settings/
│   │   │   ├── GeneralSettings.tsx        # Idioma, tema, comportamientos
│   │   │   ├── SyncSettings.tsx           # AnkiWeb config, frecuencia auto-sync
│   │   │   ├── SchedulerSettings.tsx      # SM-2 params globales
│   │   │   └── SettingsPage.tsx           # Orquestador
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx                 # Top bar con logo, user menu, sync status
│   │   │   ├── Sidebar.tsx                # Navigation principal (Home, Browse, Stats, Settings)
│   │   │   ├── MainLayout.tsx             # Wrapper general (sidebar + content)
│   │   │   └── AuthLayout.tsx             # Layout para login/register
│   │   │
│   │   └── auth/
│   │       ├── LoginForm.tsx
│   │       ├── RegisterForm.tsx
│   │       └── ProtectedRoute.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx                       # Pantalla principal (lista de mazos)
│   │   ├── Study.tsx                      # Pantalla de repaso (reviewer)
│   │   ├── Browse.tsx                     # Pantalla de navegación
│   │   ├── Stats.tsx                      # Pantalla de estadísticas
│   │   ├── Settings.tsx                   # Pantalla de configuración
│   │   ├── AI.tsx                         # Pantalla de generación IA
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── NotFound.tsx
│   │
│   ├── services/
│   │   ├── api.ts                         # Cliente HTTP (fetch/axios)
│   │   ├── deckService.ts                 # Llamadas a endpoints /decks
│   │   ├── cardService.ts                 # Llamadas a endpoints /cards
│   │   ├── aiService.ts                   # Llamadas a endpoints /ai
│   │   ├── syncService.ts                 # Lógica de sincronización
│   │   ├── storageService.ts              # IndexedDB o localStorage local
│   │   └── notificationService.ts         # Toasts, modales, alertas
│   │
│   ├── state/
│   │   ├── store.ts                       # Redux/Zustand/Jotai setup
│   │   ├── slices/
│   │   │   ├── authSlice.ts               # Usuario, token, estado login
│   │   │   ├── deckSlice.ts               # Estado de mazos
│   │   │   ├── reviewSlice.ts             # Estado sesión en progreso
│   │   │   ├── editorSlice.ts             # Estado editor de nota
│   │   │   ├── browserSlice.ts            # Filtros, columnas, selecciones
│   │   │   ├── settingsSlice.ts           # Preferencias usuario
│   │   │   └── uiSlice.ts                 # Tema, idioma, notificaciones
│   │   └── hooks/
│   │       ├── useDecks.ts
│   │       ├── useReview.ts
│   │       ├── useNote.ts
│   │       └── useAuth.ts
│   │
│   ├── hooks/
│   │   ├── useAsync.ts                    # Manejo genérico de promesas
│   │   ├── usePagination.ts               # Paginación para grandes listas
│   │   └── useKeyboard.ts                 # Atajos de teclado
│   │
│   ├── styles/
│   │   ├── design-system.css              # Variables CSS, colores, tipografía
│   │   ├── animations.css                 # Transiciones suaves
│   │   ├── responsive.css                 # Media queries
│   │   ├── dark-theme.css                 # Tema oscuro (por defecto)
│   │   └── light-theme.css                # Tema claro (alternativa)
│   │
│   ├── utils/
│   │   ├── constants.ts                   # Enums, config constantes
│   │   ├── validators.ts                  # Validación de email, campos, etc.
│   │   ├── formatters.ts                  # Formato de fechas, números, etc.
│   │   ├── htmlRenderer.ts                # Renderización segura de HTML de plantillas
│   │   └── searchParser.ts                # Parser de sintaxis de búsqueda
│   │
│   └── types/
│       └── index.ts                       # TypeScript types compartidos
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── package.json
└── vite.config.ts (o webpack.config.js)
```

### 4.3 Base de Datos (Schema PostgreSQL)

```sql
-- Tabla: users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(100),
    preferred_language VARCHAR(5) DEFAULT 'es',
    color_scheme VARCHAR(10) DEFAULT 'dark',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Tabla: decks
CREATE TABLE decks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    parent_deck_id UUID REFERENCES decks(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    position INT DEFAULT 0
);
CREATE INDEX idx_decks_user_id ON decks(user_id);
CREATE INDEX idx_decks_parent_id ON decks(parent_deck_id);

-- Tabla: deck_options
CREATE TABLE deck_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
    max_new_per_day INT DEFAULT 20,
    max_reviews_per_day INT DEFAULT 200,
    learning_steps VARCHAR(50) DEFAULT '1m 10m',
    relearning_steps VARCHAR(50) DEFAULT '10m',
    new_interval FLOAT DEFAULT 0.0,
    easy_interval INT DEFAULT 4,
    hard_interval FLOAT DEFAULT 1.2,
    lapse_multiplier FLOAT DEFAULT 0.5,
    min_ease FLOAT DEFAULT 1.3,
    starting_ease FLOAT DEFAULT 2.5,
    max_ease FLOAT DEFAULT 36500,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: note_types
CREATE TABLE note_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    is_builtin BOOLEAN DEFAULT false,
    fields JSONB NOT NULL, -- [{ name, type (text|image|audio) }, ...]
    card_templates JSONB NOT NULL, -- [{ name, front, back }, ...]
    styling TEXT NOT NULL, -- CSS
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, name)
);

-- Tabla: notes
CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
    note_type_id UUID NOT NULL REFERENCES note_types(id),
    fields JSONB NOT NULL, -- { field_name: value, ... }
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source_type VARCHAR(50), -- 'manual' | 'ai_from_pdf' | 'ai_from_url' | 'imported'
    source_document_id UUID -- Referencia a documento IA si aplica
);
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_deck_id ON notes(deck_id);
CREATE INDEX idx_notes_tags ON notes USING GIN(tags);

-- Tabla: cards
CREATE TABLE cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    note_id UUID NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
    template_index INT NOT NULL,
    due DATE NOT NULL DEFAULT CURRENT_DATE,
    ease FLOAT NOT NULL DEFAULT 2.5,
    interval INT NOT NULL DEFAULT 0, -- en días
    reps INT NOT NULL DEFAULT 0,
    lapses INT NOT NULL DEFAULT 0,
    state VARCHAR(20) NOT NULL DEFAULT 'new', -- new | learning | review | suspended | buried
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_cards_user_id_due ON cards(user_id, due);
CREATE INDEX idx_cards_note_id ON cards(note_id);
CREATE INDEX idx_cards_state ON cards(state);

-- Tabla: review_logs
CREATE TABLE review_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INT NOT NULL, -- 1 (Again) | 2 (Hard) | 3 (Good) | 4 (Easy)
    time_taken_ms INT NOT NULL,
    ease_before FLOAT NOT NULL,
    ease_after FLOAT NOT NULL,
    interval_before INT NOT NULL,
    interval_after INT NOT NULL,
    due_before DATE NOT NULL,
    due_after DATE NOT NULL,
    review_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_review_logs_card_id ON review_logs(card_id);
CREATE INDEX idx_review_logs_user_id_timestamp ON review_logs(user_id, review_timestamp);

-- Tabla: ai_generations
CREATE TABLE ai_generations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    document_id VARCHAR(255) NOT NULL,
    document_name VARCHAR(255),
    document_type VARCHAR(50), -- pdf | markdown | html | docx
    note_type_id UUID REFERENCES note_types(id),
    cards_generated INT NOT NULL,
    cards_approved INT DEFAULT 0,
    model_version VARCHAR(50), -- gpt-4, claude-3, etc.
    tokens_used INT,
    cost_usd DECIMAL(10,4),
    settings JSONB, -- card_density, target_difficulty, etc.
    status VARCHAR(20) DEFAULT 'pending', -- pending | completed | failed
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Tabla: media
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    note_id UUID REFERENCES notes(id) ON DELETE SET NULL,
    file_path VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100),
    file_size INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_media_user_id ON media(user_id);
CREATE INDEX idx_media_note_id ON media(note_id);

-- Tabla: sync_state
CREATE TABLE sync_state (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    resource_type VARCHAR(50), -- deck | note | card | media
    resource_id UUID NOT NULL,
    sync_status VARCHAR(20) DEFAULT 'pending', -- pending | synced | conflict
    last_sync_timestamp TIMESTAMP,
    last_local_change TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_sync_state_user_id_status ON sync_state(user_id, sync_status);
```

---

## 5. Especificaciones de UI/UX (Diseño Visual y Comportamiento)

### 5.1 Sistema de Diseño

#### Colores y Tema

- **Modo Oscuro (Defecto):**
  - Background principal: `#050509` o `#121212`
  - Superficies (cards, panels): `#181818` – `#222222`
  - Texto primario: `#F5F5F5` – `#E0E0E0`
  - Texto secundario: `#A7A9A9` (gris)
  - Acento principal: `#32B8C6` (cyan/turquoise eléctrico)
  - Acento secundario: `#2178B8` (azul)
  - Acento peligro: `#FF5459` (rojo)
  - Acento éxito: `#21808D` (verde teal)
  - Acento advertencia: `#A8752F` (naranja)

- **Modo Claro (Alternativa):**
  - Background: `#FCFCF9` (casi blanco)
  - Superficies: `#FFFFFF`
  - Texto primario: `#134252` (casi negro)
  - Texto secundario: `#627C7D` (gris oscuro)
  - Acentos: mismos que modo oscuro, con ajustes de saturación.

#### Tipografía

- **Font stack:** Inter, SF Pro Display, Segoe UI, sans-serif
- **Tamaños:**
  - H1: 30px, weight 700
  - H2: 24px, weight 600
  - H3: 20px, weight 600
  - Body: 14px, weight 400, line-height 1.5
  - Caption: 12px, weight 400
- **Monospace (para código, latex):** Fira Code, Consolas

#### Espaciado y Layout

- **Unidad base:** 4px
- **Spacing scale:** 4, 8, 12, 16, 20, 24, 32, 40px
- **Bordes redondeados:** 6px (buttons), 8px (cards), 12px (modales)
- **Sombras:**
  - Sutil: `0 1px 3px rgba(0,0,0,0.12)`
  - Media: `0 4px 8px rgba(0,0,0,0.15)`
  - Elevada: `0 8px 16px rgba(0,0,0,0.20)`

### 5.2 Pantallas Principales (Wireframes Textuales)

#### Home (Deck List)

```
┌─────────────────────────────────────────────────┐
│ Ankris                   🔔  👤  ⚙️           │  <- Header
├─────────────────────────────────────────────────┤
│ 📚 My Decks                      [+ New]   [🔍] │  <- Title + CTA
│                                                  │
│ ┌───────────────────┐  ┌───────────────────┐   │
│ │ Biology           │  │ Spanish Vocab     │   │  <- Deck Cards
│ │ ━━━━━━━━━━━━ 60%│  │ ━━━ 30%            │   │
│ │ 10 new           │  │ 5 new              │   │
│ │ 24 reviews       │  │ 15 reviews         │   │
│ │ ~15 min          │  │ ~8 min             │   │
│ └───────────────────┘  └───────────────────┘   │
│                                                  │
│ ┌───────────────────┐  ┌───────────────────┐   │
│ │ Math             │  │ History           │   │
│ │ ━━━━━━ 45%       │  │ 0%                 │   │
│ │ 8 new            │  │ 0 new              │   │
│ │ 18 reviews       │  │ 0 reviews          │   │
│ │ ~12 min          │  │ Ready!             │   │
│ └───────────────────┘  └───────────────────┘   │
│                                                  │
│ 📊 Study Summary (Today)                        │
│ • Estimated time: 45 minutes                   │
│ • Total new cards: 23                          │
│ • Total reviews: 57                            │
│                                                  │
└─────────────────────────────────────────────────┘
```

Elementos:
- Cards de mazo con: ícono, nombre, barra de progreso circular, contadores (new, reviews), tiempo estimado.
- Botones de acción: "Add Deck", búsqueda rápida.
- Resumen diario visible.
- Clic en mazo → inicia sesión de repaso o abre opciones.

#### Reviewer (Pantalla de Estudio)

```
┌─────────────────────────────────────────────────┐
│ Biology Deck  • 5 of 20    ⏱ 12:34  📊 15%    │  <- Estado
├─────────────────────────────────────────────────┤
│                                                  │
│  ◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯ 60%                           │  <- Barra progreso (anillo)
│                                                  │
│ ┌───────────────────────────────────────────┐  │
│ │                                           │  │
│ │        [FRONT OF CARD - HTML Rendered]   │  │
│ │                                           │  │
│ │        ¿Cuál es la función del              │
│ │        ribosoma?                           │  │
│ │                                           │  │
│ └───────────────────────────────────────────┘  │
│                                                  │
│            [Presiona ESPACIO para responder]    │  <- Hint
│                                                  │
│ ┌──────┬────────┬────────┬──────────────────┐  │
│ │ ←    │   ☰    │  🔊    │   Home           │  │  <- Bottom nav (móvil)
│ └──────┴────────┴────────┴──────────────────┘  │
│                                                  │
└─────────────────────────────────────────────────┘

[Después de presionar espacio / tap]

┌─────────────────────────────────────────────────┐
│ Biology Deck  • 5 of 20    ⏱ 12:34  📊 15%    │
├─────────────────────────────────────────────────┤
│                                                  │
│  ◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯ 60%                           │
│                                                  │
│ ┌───────────────────────────────────────────┐  │
│ │                                           │  │
│ │        [BACK OF CARD - HTML Rendered]    │  │
│ │                                           │  │
│ │        El ribosoma es el organelo donde  │  │
│ │        se sintetizan las proteínas a     │  │
│ │        partir de mRNA...                  │  │
│ │                                           │  │
│ └───────────────────────────────────────────┘  │
│                                                  │
│        [Cómo de fácil fue?]                     │  <- Pregunta
│                                                  │
│ ┌────────┬─────────┬──────────┬──────────┐    │
│ │ Again  │  Hard   │   Good   │   Easy   │    │  <- Botones calificación
│ │  (1)   │   (2)   │   (3)    │   (4)    │    │
│ └────────┴─────────┴──────────┴──────────┘    │
│ Tomorrow  2d ago   3d tomorrow  5d tomorrow    │  <- Tiempos estimados
│                                                  │
└─────────────────────────────────────────────────┘
```

Elementos:
- Barra de estado: mazo, posición actual, duración sesión, % completado.
- Tarjeta renderizada con CSS y HTML de plantilla.
- Flip animation suave.
- Botones de calificación con tiempos estimados.
- Atajos de teclado (1–4 o directamente los números).

#### Editor (Add/Edit Note)

```
┌─────────────────────────────────────────────────┐
│ Add Note                                 [✕]    │  <- Modal o página
├─────────────────────────────────────────────────┤
│ Note Type: [▼ Basic]                            │
│                                                  │
│ Deck: [▼ Biology]                               │
│                                                  │
│ ┌──────────────────────┬──────────────────────┐ │
│ │ FRONT FIELD          │ PREVIEW              │ │
│ │                      │                      │ │
│ │ [Texto enriquecido]  │ ┌────────────────┐  │ │
│ │ Bold Italic Underline│ │  ¿Qué es X?    │  │ │
│ │ [=] /Math  [🎨]      │ │                │  │ │
│ │ [🖼️] [🎤]            │ │ (preview live) │  │ │
│ │                      │ │                │  │ │
│ │ ________________     │ └────────────────┘  │ │
│ │                      │                      │ │
│ └──────────────────────┴──────────────────────┘ │
│                                                  │
│ BACK FIELD                                      │
│ ┌──────────────────────────────────────────┐   │
│ │ [Texto enriquecido]                      │   │
│ │ ________________________________________ │   │
│ │ ________________________________________ │   │
│ │                                          │   │
│ └──────────────────────────────────────────┘   │
│                                                  │
│ Tags: [tag1] [tag2] [+ Add]                    │
│                                                  │
│ ┌────────────────────┬────────────────────┐   │
│ │ Add another card   │ Save               │   │  <- Acciones
│ └────────────────────┴────────────────────┘   │
│                                                  │
└─────────────────────────────────────────────────┘
```

Elementos:
- Selector de tipo de nota (con vista de plantilla).
- Campos editables con editor de texto enriquecido.
- Preview live de tarjeta a la derecha (desktop).
- Upload de media via drag-drop.
- Tags input con autocompletado.

#### Browser (Navegación)

```
┌─────────────────────────────────────────────────┐
│ Browse                                    [🔍]  │  <- Header
├─────────────────────────────────────────────────┤
│ Decks  ▼  │  Tags  ▼  │  Type  ▼  │  State  ▼  │  <- Filtros rápidos
│                                                  │
│ [Búsqueda avanzada: deck:Biology is:due...]    │
│                                                  │
│ ┌──────┬─────────┬─────────┬────┬────────┬───┐ │
│ │ ✓    │ Front   │ Deck    │Due │ Ease   │▼  │ │  <- Tabla
│ ├──────┼─────────┼─────────┼────┼────────┼───┤ │
│ │ [ ]  │ Bio 101 │ Biology │ 1d │ 2.50   │   │ │
│ │ [ ]  │ ¿Qué... │ Biology │ 3d │ 2.80   │   │ │
│ │ [ ]  │ ATP...  │ Biology │ 0d │ 1.80   │   │ │
│ │ [✓]  │ Cell... │ Biology │ 5d │ 3.20   │   │ │
│ │ [ ]  │ Miosis  │ Biology │ 2d │ 2.50   │   │ │
│ │ [ ]  │ Meiosis │ Biology │ 7d │ 2.90   │   │ │
│ └──────┴─────────┴─────────┴────┴────────┴───┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ Preview:                                    │ │
│ │                                             │ │
│ │ Front: "¿Qué es ATP?"                      │ │
│ │ Back: "Adenosín trifosfato, molécula..."   │ │
│ │ Tags: [biología] [energía]                 │ │
│ │                                             │ │
│ │ [Edit] [Delete] [Suspend] [bury] [Move]   │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
└─────────────────────────────────────────────────┘
```

Elementos:
- Filtros rápidos por deck, tags, tipo, estado.
- Búsqueda avanzada con sintaxis Anki (deck:, tag:, is:, etc.).
- Tabla con columnas configurables (drag-drop para reordenar).
- Selección múltiple (checkboxes).
- Panel de vista previa con acciones bulks.
- Opciones: cambiar mazo, editar, suspender, enterrar, mover.

#### Stats (Estadísticas)

```
┌─────────────────────────────────────────────────┐
│ Statistics                                      │
├─────────────────────────────────────────────────┤
│ Period: [Last 30 days ▼]    [Export]           │
│                                                  │
│ ┌───────────────────────────────────────────┐  │
│ │ Card Maturity Overview                    │  │
│ │                                           │  │
│ │  New: 150       Learning: 45    Review: 800 │
│ │  ████░░░░       ███░░░░░░░░░░   █████░░░░  │  <- Mini barras
│ │                                           │  │
│ └───────────────────────────────────────────┘  │
│                                                  │
│ ┌───────────────────┐ ┌─────────────────────┐  │
│ │ Daily Load        │ │ Retention Rate      │  │
│ │                   │ │                     │  │
│ │  50 ┃            │ │  90% ───────────┐   │  │
│ │  40 ┃  ┃       ┃ │ │  80% ─────╱─────   │  │
│ │  30 ┃  ┃   ┃   ┃ │ │  70% ────╱────╱──  │  │
│ │  20 ┃  ┃   ┃   ┃ │ │                   │  │
│ │  10 ┃  ┃   ┃   ┃ │ │  50%             │  │
│ │   0 └───┴───┴───┴ │ │                   │  │
│ │   Mo Tu We Th Fr  │ │  30 days ago -> now│  │
│ └───────────────────┘ └─────────────────────┘  │
│                                                  │
│ ┌───────────────────────────────────────────┐  │
│ │ Ease Distribution                         │  │
│ │                                           │  │
│ │  1.8: ██  2.0: ████  2.5: ██████████      │  │
│ │  3.0: ████████  3.5: ███  4.0: █          │  │
│ │                                           │  │
│ └───────────────────────────────────────────┘  │
│                                                  │
└─────────────────────────────────────────────────┘
```

Elementos:
- Resumen de madurez de tarjetas (new, learning, review).
- Gráficos: carga diaria, retención, distribución ease.
- Opciones de período (últimos 30 días, 90 días, año, todo).
- Exportar datos en JSON/CSV.

#### AI Generation (Generar tarjetas desde PDF)

```
┌─────────────────────────────────────────────────┐
│ AI Card Generator                               │
├─────────────────────────────────────────────────┤
│                                                  │
│ ┌───────────────────────────────────────────┐  │
│ │ 📄 Drop PDF here or [Browse]              │  │  <- Drop zone
│ │                                           │  │
│ │ (Max 100MB, formato: PDF, DOCX, Markdown)│  │
│ └───────────────────────────────────────────┘  │
│                                                  │
│ Deck: [▼ Biology]                               │
│ Note Type: [▼ Basic]                            │
│                                                  │
│ Card Density:  [====○─────] Moderate (0.7)     │
│ Target Difficulty: [Beginner ▼]                │
│                                                  │
│ ┌────────────────────┬────────────────────┐   │
│ │ Preview             │ Advanced Settings   │   │
│ └────────────────────┴────────────────────┘   │
│                                                  │
│ [Generate Cards] [Cancel]                       │
│                                                  │
└─────────────────────────────────────────────────┘

[Después de generar]

┌─────────────────────────────────────────────────┐
│ Generated Cards (23 created)                    │
├─────────────────────────────────────────────────┤
│                                                  │
│ ✓ [ ] Q: ¿Cuál es la función de la...        │
│       A: El ribosoma sintetiza...             │
│                                                  │
│ ✓ [ ] Q: Define "ATP"                         │
│       A: Adenosín trifosfato...                │
│                                                  │
│ ✓ [ ] Q: ¿Qué diferencia el DNA del RNA?     │
│       A: El DNA es doble hélice...             │
│                                                  │
│ [Approve All] [Reject All] [Selective] [Save]  │
│                                                  │
└─────────────────────────────────────────────────┘
```

Elementos:
- Drop zone para PDF con validación.
- Selección de deck y tipo de nota.
- Sliders para densidad y dificultad.
- Generación con progreso.
- Vista previa de tarjetas generadas.
- Curación manual: aprobar/rechazar antes de guardar.

### 5.3 Atajos de Teclado (Desktop)

| Tecla | Acción |
|-------|--------|
| `1` | Calificar como "Again" en revisor |
| `2` | Calificar como "Hard" |
| `3` | Calificar como "Good" |
| `4` | Calificar como "Easy" |
| `SPACE` | Mostrar respuesta en revisor |
| `Ctrl+N` | Nueva nota |
| `Ctrl+B` | Abrir Browser |
| `Ctrl+,` | Abrir Settings |
| `Ctrl+Shift+S` | Sincronizar |
| `/` | Buscar rápido |
| `Esc` | Cerrar modal/popup |

---

## 6. Herramientas, Librerías y Stack Tecnológico

### Backend

- **Runtime:** Node.js 18+ (TypeScript)
- **Framework:** Express.js o Fastify (para API REST)
- **ORM/Query:** TypeORM o Prisma (para abstracción DB)
- **Base de datos:** PostgreSQL 14+
- **Caché:** Redis 7+ (sesiones, queue)
- **IA/LLMs:** OpenAI SDK, Anthropic SDK, LangChain (para orquestación)
- **Documentos:** pdfplumber (Python microservice) o pdfkit (Node)
- **Storage:** S3 SDK (AWS) o GCS (Google Cloud)
- **Testing:** Jest, Supertest
- **Logging:** Winston o Pino
- **Validación:** Zod, joi
- **Autenticación:** jsonwebtoken, bcryptjs

### Frontend

- **Framework:** React 18+ (con TypeScript) o Vue 3+ (alternativa)
- **Build tool:** Vite
- **State management:** Redux Toolkit, Zustand, o Jotai
- **Routing:** React Router v6
- **UI components base:** Shadcn/ui, Headless UI, o componentes custom
- **Styles:** Tailwind CSS + CSS custom properties para theming
- **Editor de texto enriquecido:** TipTap (prosemirror-based)
- **Gráficos:** Recharts o Chart.js
- **Formularios:** React Hook Form + Zod validation
- **HTTP client:** Axios o fetch con wrapper
- **Testing:** Vitest, React Testing Library
- **Notificaciones:** React Toastify o Sonner
- **Date handling:** date-fns o Day.js
- **Atajos de teclado:** Hotkeys-js

### DevOps y Deployment

- **CI/CD:** GitHub Actions, GitLab CI, o Jenkins
- **Containerización:** Docker, Docker Compose
- **Orquestación:** Kubernetes (para producción escalable)
- **Monitoreo:** Sentry, DataDog, o Prometheus + Grafana
- **Hosting (opciones):**
  - Backend: AWS EC2, Heroku, Railway, Render
  - Frontend: Vercel, Netlify, AWS S3 + CloudFront
  - DB: AWS RDS, Supabase, PlanetScale

---

## 7. Restricciones, Limitaciones y Edge Cases

### Limitaciones Conocidas

| Limitación | Descripción | Solución |
|-----------|-------------|----------|
| **Rate limiting IA** | API de OpenAI/Claude tiene límites de llamadas/minuto | Implementar queue con Bull/BullMQ, caché de generaciones, modo offline local |
| **Tamaño de PDF** | PDFs muy grandes (>100MB) pueden desbordar memoria | Procesar en chunks, usar workers (Worker Threads en Node), limitar a 100MB |
| **Simultaneidad de sync** | Si usuario sincroniza desde 2 dispositivos a la vez, conflictos | Estrategia last-write-wins, o pedir confirmación al usuario |
| **Búsqueda de >100k notas** | Query de browse puede ser lenta sin índices | Usar índices JSONB en PG, considerar Elasticsearch para búsqueda full-text |
| **Rendering HTML plantillas** | XSS si usuario inyecta HTML maligno en plantillas | Sanitizar con DOMPurify en frontend, validar backend con xss library |

### Errores Comunes y Prevención

| Error | Causa | Prevención |
|-------|-------|-----------|
| **Duplicados en IA** | LLM genera tarjetas idénticas o muy similares a existentes | Pre-buscar en DB antes de generar, usar embedding similarity, curación manual |
| **Scheduler falla** | Card sin deck_id o user_id, referencia rota | Validar integridad FK, cascade deletes, tests unitarios de scheduler |
| **Media no sincroniza** | Archivo grande o corrupto, timeout de upload | Limitar tamaño, reintentos exponenciales, validar MIME type |
| **Sesión de estudio pierde progreso** | Usuario cierra pestaña sin guardar | Auto-save cada respuesta, uso de localStorage as fallback |
| **Token IA agotado** | Usuario alcanza límite mensual | Alertar al usuario, ofrecer upgrade, usar modelo más barato como fallback |

### Validaciones Requeridas

- **Entrada de usuario:**
  - Email: validación RFC 5322.
  - Contraseña: mín 8 caracteres, mayús, minús, número, especial (configurable).
  - Campos de nota: no vacíos (si requeridos), tamaño <10000 caracteres.
  - Tags: sin caracteres especiales, máx 50 tags/nota.

- **Media:**
  - Imágenes: JPEG, PNG, WebP; máx 10MB; redimensionar a 1200px ancho.
  - Audio: MP3, OGG; máx 20MB.

- **Operaciones críticas:**
  - Sync: checksum de colección antes/después.
  - Scheduler: validar que tarjeta tenga mazo_id, user_id, due válida.
  - IA: validar documento antes de procesar, límite de tokens.

---

## 8. Protocolo de Errores y Aprendizajes (Memoria Viva)

*(Esta sección se actualiza a medida que encontres bugs o edge cases durante desarrollo)*

| Fecha | Error/Problema | Causa Raíz | Solución Aplicada | Prevención |
|-------|-----------------|-----------|-------------------|-----------|
| 2026-01-25 | [Placeholder] | [Causa] | [Arreglado así] | [Regla para el futuro] |
| | | | | |

### Notas de Implementación

> **Protocolo:** Si encuentras un bug:
> 1. **Reproduce** el error de forma aislada.
> 2. **Documenta** en esta tabla: qué pasó, por qué, cómo lo arreglaste.
> 3. **Actualiza** el código con comentarios si es caso edge.
> 4. **Prevención:** Añade test unitario o integración para evitar regresión.

---

## 9. Ejemplos de Uso y Flujos Operacionales

### 9.1 Flujo de Creación: Nuevo Usuario

```bash
1. Usuario llena /register
   POST /api/auth/register
   {
     "email": "user@example.com",
     "password": "SecurePass123!",
     "username": "learner1",
     "preferred_language": "es"
   }

2. Backend valida, hashea password, crea user en DB
   RESPONSE 201
   {
     "status": "success",
     "data": {
       "userId": "uuid-1234",
       "email": "user@example.com",
       "token": "eyJhbGc..."
     }
   }

3. Frontend guarda token en localStorage, redirige a /home

4. En /home, llamar:
   GET /api/decks
   Response: { "decks": [] } (vacío para usuario nuevo)

5. Usuario presiona "+ Add Deck"
   POST /api/decks
   {
     "name": "Spanish Vocab",
     "description": "Common words",
     "user_id": "uuid-1234"
   }

6. Backend crea deck, retorna:
   RESPONSE 201
   {
     "id": "deck-uuid-1",
     "name": "Spanish Vocab",
     "deck_options": { "max_new_per_day": 20, ... }
   }
```

### 9.2 Flujo de Estudio Completo

```bash
1. Usuario abre /study?deck=deck-uuid-1

2. Frontend llama:
   GET /api/decks/{deckId}/queue?user={userId}
   
   Backend (Scheduler):
   - Obtiene todas las cards de ese deck del usuario
   - Filtra por due <= today
   - Aplica límites (max_new, max_reviews)
   - Retorna lista ordenada: [card_id_1, card_id_2, ...]

3. Frontend obtiene tarjeta 1:
   GET /api/cards/{card_id}/render
   
   Backend:
   - Obtiene Card + Note + NoteType
   - Renderiza front HTML usando template
   - Retorna HTML + CSS + front content

4. Usuario ve front, presiona ESPACIO
   Frontend oculta front, renderiza back:
   GET /api/cards/{card_id}/render?side=back
   
   Backend retorna back HTML

5. Usuario presiona botón "Good" (3)
   POST /api/cards/{card_id}/review
   {
     "rating": 3,
     "time_taken_ms": 5200
   }
   
   Backend:
   - Valida card existe
   - Aplica SM-2: calcula ease', interval', due'
   - Guarda en DB: card.ease, card.interval, card.due, card.state
   - Registra en review_log
   - Retorna próxima card info

6. Repite pasos 3-5 hasta completar sesión

7. Usuario termina sesión (o timeout)
   GET /api/sessions/{sessionId}/summary
   
   Backend retorna: tarjetas vistas, accuracy, tiempo total, próximo mazo recomendado
```

### 9.3 Flujo de IA: PDF → Tarjetas

```bash
1. Usuario sube PDF en /ai-generator
   POST /api/ai/upload-document
   Content-Type: multipart/form-data
   - file: [binary PDF]
   - deck_id: "deck-uuid-1"
   - note_type: "basic"
   - card_density: 0.7
   - target_difficulty: "intermediate"
   
   Backend:
   - Valida PDF (tamaño, formato)
   - Guarda temporalmente en /tmp/
   - Retorna document_id, inicia procesamiento async

2. Backend procesa async (job queue con Bull):
   - Parse PDF con pdfplumber: extrae texto, estructura
   - Chunking: divide en párrafos ~1000 tokens
   - Para cada chunk:
     - Llamar OpenAI con prompt:
       ```
       Extract {card_density} flashcards from this text.
       Format: JSON { "cards": [{ "front": "...", "back": "..." }, ...] }
       Difficulty: {target_difficulty}
       ```
     - LLM retorna tarjetas
     - Validar sintaxis JSON
     - Buscar duplicados en DB (select * from notes where fields->>'front' = ...)
     - Agregar a lista si es nueva

3. Frontend poll:
   GET /api/ai/generations/{doc_id}/status
   Response: { "status": "pending|completed|failed", "progress": 60, "cards": [...] }

4. Cuando completa:
   GET /api/ai/generations/{doc_id}/preview
   Response: lista de 23 tarjetas generadas con opción de edit

5. Usuario curador:
   POST /api/ai/generations/{doc_id}/approve
   {
     "approved_card_ids": ["gen-1", "gen-2", ...],
     "rejected_card_ids": ["gen-5"],
     "edited_cards": [{ "id": "gen-3", "front": "...", "back": "..." }]
   }

6. Backend:
   - Crea notas en DB para tarjetas aprobadas
   - Asocia source_type: "ai_from_pdf", source_document_id
   - Calcula tokens usados, costo USD
   - Retorna: "23 tarjetas guardadas en Biology deck"

7. Frontend redirige a /study o muestra notificación
```

---

## 10. Checklist de Pre y Post-Desarrollo

### Pre-Desarrollo (MVP v0)

- [ ] Stack tecnológico confirmado (Node + Express? Python + FastAPI? Etc.)
- [ ] Base de datos PostgreSQL creada y migraciones iniciales
- [ ] Proyecto git con rama develop y main
- [ ] Estructura de carpetas backend y frontend creadas
- [ ] Auth básico (login/register) implementado
- [ ] Tests unitarios configurados (Jest / Vitest)
- [ ] Linter y formatter configurados (ESLint, Prettier)
- [ ] Documentación de API (Swagger/OpenAPI) scaffolded
- [ ] Ambiente de desarrollo local (Docker Compose) funcionando
- [ ] Variables de entorno (.env.example) listadas

### Durante Desarrollo (Hitos por Feature)

- [ ] Feature: Deck CRUD
  - [ ] Backend: POST/GET/PUT/DELETE /api/decks
  - [ ] Frontend: DeckList, DeckCard, DeckOptions components
  - [ ] Tests: ≥80% cobertura
  - [ ] Documentado en Swagger

- [ ] Feature: Note/Card CRUD
  - [ ] Backend: CRUD completo + tipos de nota
  - [ ] Frontend: NoteEditor, CardPreview
  - [ ] Tests: validación de campos, detección duplicados

- [ ] Feature: Scheduler + Reviewer
  - [ ] Backend: SM-2 implementado, getNextCard()
  - [ ] Frontend: Reviewer UI, botones calificación, atajos teclado
  - [ ] Tests: algoritmo SRS verificado contra casos conocidos

- [ ] Feature: Browser
  - [ ] Backend: búsqueda avanzada, syntax parser
  - [ ] Frontend: tabla, filtros, vista previa
  - [ ] Tests: búsquedas complejas

- [ ] Feature: IA (PDF → tarjetas)
  - [ ] Backend: DocumentIngestion, CardGeneration, integración OpenAI
  - [ ] Frontend: Upload, settings, preview, curation
  - [ ] Tests: mockear LLM, validar formato respuesta

- [ ] Feature: Sync
  - [ ] Backend: SyncService, endpoint POST /api/sync
  - [ ] Frontend: SyncService, auto-sync cada 30 min
  - [ ] Tests: conflictos, último-gana, integridad datos

- [ ] Feature: Estadísticas
  - [ ] Backend: StatsService, agregaciones, gráficos JSON
  - [ ] Frontend: Charts con Recharts, periodo selector
  - [ ] Tests: agregaciones correctas

### Post-Desarrollo (QA y Deploy)

- [ ] Code review completo
- [ ] Cobertura de tests ≥85%
- [ ] Documentación actualizada (README, API docs, user guide)
- [ ] Performance testing (load test con 10k+ tarjetas)
- [ ] Seguridad: OWASP top 10 reviewed
- [ ] Accesibilidad: WCAG 2.1 AA mínimo
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Responsividad en móvil testada
- [ ] E2E tests críticos con Playwright/Cypress
- [ ] Sentry/error tracking configurado
- [ ] Backups de DB automatizados
- [ ] CI/CD pipeline testado
- [ ] Deploy a staging environment
- [ ] Smoke tests en staging
- [ ] Deploy a producción con rollback plan

---

## 11. Roadmap de Desarrollo (Versiones)

### v0.1 (MVP Mínimo - 4-6 semanas)

- [x] Auth (login/register)
- [x] Deck CRUD + jerarquía
- [x] Note/Card CRUD
- [x] Scheduler SRS básico (SM-2)
- [x] Reviewer UI con botones
- [x] Editor de notas
- [x] Browser básico (lista, búsqueda simple)
- [x] Persistencia en PG
- [x] API REST documentada
- [x] Frontend moderno (React + Tailwind)
- [ ] **NO IA, NO sync, NO stats complejas**

### v0.2 (Modern UI + Tipo de Nota - 2-3 semanas)

- [ ] Diseño UI final: tema oscuro, animaciones, responsive
- [ ] Tipos de nota personalizados (campos dinámicos, templates)
- [ ] Cloze deletion soporte
- [ ] Editor texto enriquecido (TipTap)
- [ ] Media (imágenes, audio) basic
- [ ] Stats básicas (contadores, gráficos simples)

### v0.3 (IA Core - 3-4 semanas)

- [ ] DocumentIngestion (PDF parsing)
- [ ] CardGeneration vía OpenAI
- [ ] CardRefinement (simplificar, traducir)
- [ ] Curation UI
- [ ] Cost tracking + alertas

### v0.4 (Sync + Advanced Browser - 2-3 semanas)

- [ ] SyncService backend
- [ ] Sincronización frontend
- [ ] Conflicto resolution
- [ ] Advanced search (sintaxis Anki)
- [ ] Bulk actions en Browser
- [ ] Smart filters + saved searches

### v0.5+ (Polish + Community)

- [ ] Gamificación (streaks, badges)
- [ ] Temas comunitarios
- [ ] Mobile app (React Native / Flutter)
- [ ] Shared decks / colaboración
- [ ] Marketplace de templates
- [ ] Exportar a Anki .apkg

---

## 12. Notas Adicionales y Decisiones Arquitectónicas

### Por qué PostrreSQL (no MongoDB)

- **Razón:** Datos altamente estructurados (notas, tarjetas, review logs) y muchas relaciones (user → deck → note → card → review_log).
- **Ventaja:** ACID, integridad referencial, queries complejas, índices potentes.
- **MongoDB:** Útil solo si quieres flexibilidad en estructura de notas (campos dinámicos). Pero con JSONB en PG, obtienes ambos mundos.

### Por qué React (no Vue)

- **Razón:** Ecosistema más grande, más librerías UI, comunidad masiva.
- **Alternativa:** Vue 3 es perfectamente viable (más pequeño, más rápido para aprender).
- **Decisión:** Escoge según team skills. Si el equipo tiene Vue experience, úsala.

### Por qué TypeScript

- **Razón:** Prevenir bugs, IDE autocomplete, documentación en código, refactoring seguro.
- **Trade-off:** Más verbose, mayor curva aprendizaje.
- **Recomendación:** Obligatorio para backend, recomendado para frontend.

### Escalabilidad Futura

- **10k usuarios:** PostgreSQL + Redis es suficiente.
- **100k+ usuarios:** Considerar:
  - Elasticsearch para búsqueda full-text (Browser).
  - Microservicios: AIService en proceso separado (para no bloquear requests).
  - Cache layer (Redis) agresivo para scheduler.
  - CDN para media.
  - Replicación read-only de DB para estadísticas.

### Monetización (Opcional)

- **Freemium:** Free tier = 3 mazos, 100 tarjetas, IA 10 documents/mes.
- **Pro:** $5-9/mes = infinito, mejor IA models, prioridad sync.
- **Team:** $20-30/mes = shared decks, colaboración en vivo.

---

## 13. Referencias y Documentación Externa

- **Anki Manual:** https://docs.ankiweb.net/ (especialmente: intro, scheduler, templates)
- **AnkiWeb:** https://ankiweb.net/ (servicio de sincronización)
- **SM-2 Algorithm:** https://super-memory.com/articles/spaced-repetition-algorithm (original paper)
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/
- **React Docs:** https://react.dev/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **OpenAI API:** https://platform.openai.com/docs/
- **Accessibility (WCAG):** https://www.w3.org/WAI/WCAG21/quickref/

---

## 14. Contacto y Mantenimiento

- **Propietario del Proyecto:** [Tu nombre / Equipo]
- **Última Actualización:** 25 de enero de 2026
- **Próxima Revisión:** 25 de marzo de 2026 (post-MVP v0)
- **Repositorio:** [GitHub/GitLab URL]
- **Documentación Viva:** [Link a wiki o docs site]

---

**Fin de la Directiva Ankris**

*Este documento es un living document. Actualízalo conforme avances en el desarrollo, especialmente la sección "Protocolo de Errores y Aprendizajes" para capturar todo conocimiento acumulado.*

*Éxito en tu proyecto. 🚀*
