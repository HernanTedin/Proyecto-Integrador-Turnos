import type { Turno } from "../../types/turno";

type TablaTurnosProps = {
  turnos: Turno[];
};

export const TablaTurnos = ({ turnos }: TablaTurnosProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Paciente</th>
          <th>Profesional</th>
          <th>Especialidad</th>
          <th>Fecha y hora</th>
          <th>Duración</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {turnos.map((turno) => (
          <tr key={turno.id}>
            <td>{turno.paciente}</td>
            <td>{turno.profesional}</td>
            <td>{turno.especialidad}</td>
            <td>{turno.fechaHora}</td>
            <td>{turno.duracionMinutos} min</td>
            <td>{turno.estado}</td>
            <td>-- acciones --</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
