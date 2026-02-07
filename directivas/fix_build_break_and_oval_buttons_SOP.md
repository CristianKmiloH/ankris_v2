# SOP: Fix Build Break and UI Oval Buttons

## Objetivo
Restaurar la estabilidad del build en Render y asegurar que los botones circulares mantengan su geometría perfecta (sin ovalidos), siguiendo las preferencias del usuario.

## Casos de Error Detectados
1. **Error de Sintaxis en DeckList.tsx**: Falta un `</div>` de cierre dentro del map de `decks`. Esto rompe el parser JSX e impide el despliegue en producción.
2. **Botón de Retroceso Ovalado en AddNote.tsx**: A pesar de los estilos previos, el botón se muestra ovalado en ciertos estados. Probablemente por falta de `flex-shrink: 0`.

## Procedimiento de Arreglo

### 1. DeckList.tsx (Build Fix)
- Localizar el final del mapeo de `decks`.
- Asegurar que el componente raíz dentro de `.map()` esté correctamente cerrado antes del paréntesis de cierre `))`.
- Verificar que el contenedor padre `deckGrid` esté cerrado después del mapeo.

### 2. AddNote.tsx (UI Logic)
- Localizar el estilo `backButton`.
- Añadir `flexShrink: 0` para evitar que el contenedor flex lo comprima.
- Asegurar que `minWidth` sea igual a `width`.

### 3. Verificación
- Ejecutar `npm run build` localmente en `apps/frontend` para confirmar que no hay errores de transpilación.
- Revisar visualmente (si fuera posible) o confirmar con el usuario.

## Restricciones y Advertencias
- **NO** olvidar cerrar los tags JSX. Un solo tag abierto rompe todo el pipeline de CI/CD.
- Mantener los botones como círculos perfectos es una prioridad alta para el usuario (estética "Premium").
