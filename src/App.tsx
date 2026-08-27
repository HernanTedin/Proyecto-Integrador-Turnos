import { TablaTurnos } from "./componentes/listado/TablaTurnos";
import { FormularioTurno } from "./componentes/formulario/FormularioTurno";
import { useTurnos } from "./hooks/useTurnos";

function App() {
  const { turnos, agregarTurno } = useTurnos();

  return (
    <div>
      <h1>Panel de gestión de turnos</h1>

      <h2>Nuevo turno</h2>
      <FormularioTurno onGuardar={agregarTurno} />

      <h2>Listado</h2>
      <TablaTurnos turnos={turnos} />
    </div>
  );
}

export default App;
