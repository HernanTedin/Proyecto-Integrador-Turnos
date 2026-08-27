import { useState } from "react";
import type { Turno, EstadoTurno } from "../../types/turno";

type FormularioTurnoProps = {
  onGuardar: (turno: Turno) => void;
};

export const FormularioTurno = ({ onGuardar }: FormularioTurnoProps) => {
  const [paciente, setPaciente] = useState("");
  const [profesional, setProfesional] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [fechaHora, setFechaHora] = useState("");
  const [duracionMinutos, setDuracionMinutos] = useState(30);
  const [estado, setEstado] = useState<EstadoTurno>("pendiente");

  const manejarEnvio = (evento: React.FormEvent) => {
    evento.preventDefault();

    const nuevoTurno: Turno = {
      id: crypto.randomUUID(),
      paciente,
      profesional,
      especialidad,
      fechaHora,
      duracionMinutos,
      estado,
    };

    onGuardar(nuevoTurno);
  };

  return (
    <form onSubmit={manejarEnvio}>
      <label>
        Paciente
        <input
          type="text"
          value={paciente}
          onChange={(e) => setPaciente(e.target.value)}
        />
      </label>

      <label>
        Profesional
        <input
          type="text"
          value={profesional}
          onChange={(e) => setProfesional(e.target.value)}
        />
      </label>

      <label>
        Especialidad
        <input
          type="text"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
        />
      </label>

      <label>
        Fecha y hora
        <input
          type="datetime-local"
          value={fechaHora}
          onChange={(e) => setFechaHora(e.target.value)}
        />
      </label>

      <label>
        Duración (minutos)
        <input
          type="number"
          value={duracionMinutos}
          onChange={(e) => setDuracionMinutos(Number(e.target.value))}
        />
      </label>

      <label>
        Estado
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value as EstadoTurno)}
        >
          <option value="pendiente">Pendiente</option>
          <option value="confirmado">Confirmado</option>
          <option value="cancelado">Cancelado</option>
          <option value="atendido">Atendido</option>
        </select>
      </label>

      <button type="submit">Guardar turno</button>
    </form>
  );
};
