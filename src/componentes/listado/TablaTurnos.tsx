import type { Turno } from "../../types/turno";
import { Eye, Pencil, Trash2 } from "lucide-react";

type CampoOrden = "paciente" | "fechaHora";
type DireccionOrden = "asc" | "desc";

type TablaTurnosProps = {
  turnos: Turno[];
  campoOrden: CampoOrden;
  direccionOrden: DireccionOrden;
  onOrdenarPor: (campo: CampoOrden) => void;
  onVer: (turno: Turno) => void;
  onEditar: (turno: Turno) => void;
  onDarDeBaja: (turno: Turno) => void;
};

export const TablaTurnos = ({
  turnos,
  campoOrden,
  direccionOrden,
  onOrdenarPor,
  onVer,
  onEditar,
  onDarDeBaja,
}: TablaTurnosProps) => {
  const ariaSortDe = (campo: CampoOrden) => {
    if (campoOrden !== campo) return "none";
    return direccionOrden === "asc" ? "ascending" : "descending";
  };

  return (
    <table>
      <thead>
        <tr>
          <th aria-sort={ariaSortDe("paciente")}>
            <button onClick={() => onOrdenarPor("paciente")}>
              Paciente{" "}
              {campoOrden === "paciente" &&
                (direccionOrden === "asc" ? "▲" : "▼")}
            </button>
          </th>
          <th>Profesional</th>
          <th>Especialidad</th>
          <th aria-sort={ariaSortDe("fechaHora")}>
            <button onClick={() => onOrdenarPor("fechaHora")}>
              Fecha y hora{" "}
              {campoOrden === "fechaHora" &&
                (direccionOrden === "asc" ? "▲" : "▼")}
            </button>
          </th>
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
            <td>
              <button
                onClick={() => onVer(turno)}
                aria-label={`Ver turno de ${turno.paciente}`}
              >
                <Eye size={16} />
              </button>
              <button
                onClick={() => onEditar(turno)}
                aria-label={`Editar turno de ${turno.paciente}`}
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => onDarDeBaja(turno)}
                aria-label={`Dar de baja turno de ${turno.paciente}`}
                disabled={turno.estado === "cancelado"}
              >
                <Trash2 size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
