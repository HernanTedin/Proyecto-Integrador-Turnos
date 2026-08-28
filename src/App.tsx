import { useState } from "react";
import { TablaTurnos } from "./componentes/listado/TablaTurnos";
import { FormularioTurno } from "./componentes/formulario/FormularioTurno";
import { VistaTurno } from "./componentes/consulta/VistaTurno";
import { DialogoConfirmacion } from "./componentes/ui/DialogoConfirmacion";
import { AvisoExito } from "./componentes/ui/AvisoExito";
import { useTurnos } from "./hooks/useTurnos";
import type { Turno } from "./types/turno";

function App() {
  const {
    turnos,
    totalFiltrados,
    totalPaginas,
    pagina,
    setPagina,
    tamanioPagina,
    cambiarTamanioPagina,
    textoBusqueda,
    setTextoBusqueda,
    estadosFiltrados,
    alternarFiltroEstado,
    campoOrden,
    direccionOrden,
    ordenarPor,
    agregarTurno,
    modificarTurno,
    darDeBajaTurno,
    cargando,
  } = useTurnos();
  const [turnoAVer, setTurnoAVer] = useState<Turno | null>(null);
  const [turnoAEditar, setTurnoAEditar] = useState<Turno | null>(null);
  const [turnoABajar, setTurnoABajar] = useState<Turno | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const mostrarAviso = (mensaje: string) => {
    setMensajeExito(mensaje);
    setTimeout(() => setMensajeExito(null), 4000);
  };

  const manejarGuardado = (turno: Turno) => {
    if (turnoAEditar) {
      modificarTurno(turno);
      setTurnoAEditar(null);
      mostrarAviso("Turno modificado con éxito");
    } else {
      agregarTurno(turno);
      mostrarAviso("Turno creado con éxito");
    }
  };

  const confirmarBaja = () => {
    if (turnoABajar) {
      darDeBajaTurno(turnoABajar.id);
      setTurnoABajar(null);
      mostrarAviso("Turno dado de baja con éxito");
    }
  };

  return (
    <div>
      <h1>Panel de gestión de turnos</h1>

      <AvisoExito mensaje={mensajeExito} />

      <FormularioTurno
        key={turnoAEditar?.id ?? "nuevo"}
        turnoAEditar={turnoAEditar ?? undefined}
        onGuardar={manejarGuardado}
      />
      <label htmlFor="busqueda">Buscar por paciente o profesional</label>
      <input
        id="busqueda"
        type="search"
        value={textoBusqueda}
        onChange={(e) => setTextoBusqueda(e.target.value)}
      />
      <div role="group" aria-label="Filtrar por estado">
        {(["pendiente", "confirmado", "cancelado", "atendido"] as const).map(
          (estado) => (
            <button
              key={estado}
              onClick={() => alternarFiltroEstado(estado)}
              aria-pressed={estadosFiltrados.includes(estado)}
            >
              {estado}
            </button>
          ),
        )}
      </div>

      <h2>Listado</h2>
      {cargando ? (
        <p role="status" aria-live="polite">
          Cargando turnos...
        </p>
      ) : turnos.length === 0 &&
        totalFiltrados === 0 &&
        textoBusqueda === "" &&
        estadosFiltrados.length === 0 ? (
        <p>No hay turnos registrados todavía.</p>
      ) : totalFiltrados === 0 ? (
        <p>
          No se encontraron turnos que coincidan con la búsqueda o los filtros
          aplicados.
        </p>
      ) : (
        <>
          <TablaTurnos
            turnos={turnos}
            campoOrden={campoOrden}
            direccionOrden={direccionOrden}
            onOrdenarPor={ordenarPor}
            onVer={setTurnoAVer}
            onEditar={setTurnoAEditar}
            onDarDeBaja={setTurnoABajar}
          />

          <div>
            <span>
              {`${(pagina - 1) * tamanioPagina + 1}–${Math.min(pagina * tamanioPagina, totalFiltrados)} de ${totalFiltrados}`}
            </span>
            <button
              onClick={() => setPagina((p) => p - 1)}
              disabled={pagina <= 1}
            >
              Anterior
            </button>
            <span>
              Página {pagina} de {totalPaginas}
            </span>
            <button
              onClick={() => setPagina((p) => p + 1)}
              disabled={pagina >= totalPaginas}
            >
              Siguiente
            </button>
            <label htmlFor="tamanioPagina">Por página</label>
            <select
              id="tamanioPagina"
              value={tamanioPagina}
              onChange={(e) => cambiarTamanioPagina(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </>
      )}

      {turnoAVer && (
        <div>
          <h2>Detalle del turno</h2>
          <VistaTurno turno={turnoAVer} />
          <button onClick={() => setTurnoAVer(null)}>Cerrar</button>
        </div>
      )}

      <DialogoConfirmacion
        abierto={turnoABajar !== null}
        titulo="Dar de baja turno"
        mensaje={
          turnoABajar
            ? `¿Confirmás dar de baja el turno de ${turnoABajar.paciente} del ${turnoABajar.fechaHora}?`
            : ""
        }
        onConfirmar={confirmarBaja}
        onCancelar={() => setTurnoABajar(null)}
      />
    </div>
  );
}

export default App;
