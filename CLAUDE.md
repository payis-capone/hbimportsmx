@AGENTS.md

## Git workflow
- **Features nuevas**: SIEMPRE en una rama propia con nombre descriptivo (`feat/nombre-del-feature`). Commits frecuentes dentro de la rama con mensajes convencionales (feat:, fix:, chore:, style:).
- Al terminar la feature (build limpio + verificada): merge a la rama principal y push. Después del merge, elimina la rama.
- Si el proyecto está en Vercel, aprovecha que la rama genera un preview deploy: dame la URL del preview antes del merge cuando el cambio sea visual o afecte algo que genera leads/ventas.
- **Fixes menores, ajustes de contenido y chores**: pueden ir directo a la rama principal.
- Push a la rama principal SIEMPRE antes de cualquier deploy a producción — nunca debe haber código en producción que no esté en GitHub.
- Nunca dejes trabajo sin commitear al cerrar una sesión: si quedó a medias, commit con prefijo "wip:" en su rama.
- Nunca commitees: archivos .env*, assets fuente pesados (ej. Rebranding/), node_modules, ni credenciales. Verifica el .gitignore ante la duda.
