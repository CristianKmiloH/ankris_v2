# Sistema de Desarrollo Autónomo - Ankris_V2

## Filosofía del Sistema
Este proyecto opera bajo un sistema de 3 componentes diseñado para construir herramientas deterministas y confiables, manteniendo una **memoria viva documentada** de cómo usarlas correctamente.

## Estructura del Proyecto

```
.
├── .tmp/                      # Espacio temporal para datos (pueden borrarse)
├── directivas/                # SOPs en Markdown - La Fuente de la Verdad
│   ├── directiva_ejemplo.md   # Plantilla base para nuevas directivas
│   └── ...                    # Directivas específicas de tareas
├── scripts/                   # Scripts de Python deterministas
│   └── ...                    # Implementaciones ejecutables
├── requirements.txt           # Dependencias del proyecto
├── .env                       # Variables de entorno (NO en git)
├── .env.example               # Plantilla de variables de entorno
└── .gitignore                 # Exclusiones de Git
```

## El Bucle Central (Orden Estricto de Operaciones)

1. **📋 Consultar/Crear Directiva**
   - Nunca escribas código sin un plan
   - Revisa `directivas/` para la tarea
   - Si es nueva, crea primero una directiva `.md`

2. **⚙️ Ejecución de Código**
   - Genera scripts de Python en `scripts/`
   - Basa el código *estrictamente* en la directiva
   - Usa `.env` para secretos/configuración

3. **🔍 Observación y Aprendizaje**
   - Si la ejecución falla, arregla el código
   - **CRÍTICO:** Actualiza la directiva con lo aprendido
   - Documenta restricciones y casos borde

## Protocolo de Auto-Corrección

Cuando un script falla o produce resultados inesperados:

1. **Diagnosticar:** Lee el error, identifica la causa raíz
2. **Parchear Código:** Corrige el script en `scripts/`
3. **Parchear Directiva (El Paso de Memoria):**
   - Abre el `.md` correspondiente
   - Actualiza sección "Restricciones/Casos Borde"
   - Documenta explícitamente: *"No hacer X, porque causa Y. En su lugar, hacer Z."*
4. **Verificar:** Re-ejecuta para confirmar el arreglo

## Inicio Rápido

1. **Configuración inicial:**
   ```bash
   # Copia el archivo de ejemplo y configura tus variables
   cp .env.example .env
   # Edita .env con tus API keys
   
   # Instala dependencias
   pip install -r requirements.txt
   ```

2. **Para una nueva tarea:**
   - Consulta `directivas/directiva_ejemplo.md`
   - Crea tu directiva siguiendo la plantilla
   - Implementa el script basándote en la directiva
   - Actualiza la directiva con lo aprendido

## Principios Clave

- 🎯 **Directiva = Fuente de Verdad:** Todo comienza y termina con la directiva
- 🔄 **Aprendizaje Continuo:** Cada error mejora la memoria del sistema
- 🤖 **Determinismo:** Scripts robustos e idempotentes
- 📝 **Documentación Viva:** Las directivas evolucionan con el conocimiento

## Contribuir

Al añadir nuevas funcionalidades:
1. Crea/actualiza la directiva primero
2. Implementa el script
3. Documenta restricciones descubiertas
4. Actualiza `requirements.txt` si añades dependencias

---

**Versión:** 1.0  
**Última actualización:** 2026-01-24
