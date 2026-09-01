# Panel de Gestión de Turnos

Trabajo Práctico Integrador — Arquitectura y Diseño de Interfaces
Tecnicatura Superior en Desarrollo de Software

## Dominio elegido

Turnos de consultorio. Cada turno tiene: paciente, profesional, especialidad,
fecha y hora, duración en minutos, y estado (pendiente, confirmado, cancelado,
atendido).

## Cómo instalar y ejecutar

\`\`\`bash
pnpm install
pnpm dev       # levanta el servidor de desarrollo
pnpm build     # build de producción + chequeo de tipos
pnpm lint      # linter
\`\`\`

## Estructura de carpetas

\`\`\`
src/
├─ types/         modelo de dominio (Turno, EstadoTurno)
├─ data/          datos semilla (28 turnos)
├─ lib/           validación, type guard
├─ hooks/         useLocalStorage (genérico), useDebounce (genérico),
│                 useTurnos (de dominio, construido sobre los anteriores)
└─ components/
   ├─ listado/     tabla con orden, búsqueda y paginación
   ├─ formulario/  alta y modificación (mismo componente, dos modos)
   ├─ consulta/    vista de solo lectura
   └─ ui/          diálogo de confirmación, aviso de éxito
\`\`\`

## Decisiones de diseño
Para guardar los turnos usé localStorage, así no se pierden si recargo
  la página. Si por algún motivo lo que hay guardado está roto o alguien
  lo edita a mano, la app no explota: valida los datos antes de usarlos
  y si algo no cierra, vuelve a los datos de ejemplo con los que arranca
  el proyecto.

   Armé dos hooks separados: uno genérico (useLocalStorage) que no sabe
  nada de turnos, solo guarda y lee cosas del navegador. Y otro
  (useTurnos) que sí conoce el dominio y usa el primero por debajo.
  Los separé así para que useLocalStorage se pueda reusar para
  cualquier otra cosa en el futuro, sin depender de turnos.

 

 ## Limitaciones conocidas 
 Cuando editás un turno desde la tabla, hay que
  scrollear manualmente hacia arriba para ver los datos cargados

## Uso de asistentes de IA

Usé Claude como asistente durante el desarrollo, principalmente para:
explicar conceptos de React que no conocía como debounce y type guards",revisar la
implementación de accesibilidad, resolver errores puntuales.
