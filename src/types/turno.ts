export type EstadoTurno = "pendiente" | "confirmado" | "cancelado" | "atendido";
export type Turno = {
  id: string;
  paciente: string;
  profesional: string;
  especialidad: string;
  fechaHora: string;
  duracionMinutos: number;
  estado: EstadoTurno;
};
