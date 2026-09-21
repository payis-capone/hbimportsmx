@AGENTS.md

## Git workflow
- Después de completar cada tarea o fase (no cada archivo), crea un commit con mensaje descriptivo en formato convencional (feat:, fix:, chore:, style:, docs:).
- Haz push a la rama principal al cierre de cada bloque de trabajo, siempre ANTES de cualquier deploy a producción — nunca debe haber código en producción que no esté en GitHub.
- Nunca dejes trabajo sin commitear al terminar una sesión: si quedó algo a medias, commitea con prefijo "wip:".
- No hagas commit de: archivos .env*, carpetas de assets fuente pesados (como Rebranding/), node_modules, ni credenciales de ningún tipo — verifica el .gitignore si tienes duda.
