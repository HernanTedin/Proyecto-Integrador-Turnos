import type { Turno } from "../types/turno";

const ESTADOS_VALIDOS = ["pendiente", "confirmado", "cancelado", "atendido"];

export function esTurno(valor: unknown): valor is Turno {
  if (typeof valor !== "object" || valor === null) return false;

  const t = valor as Record<string, unknown>;

  return (
    typeof t.id === "string" &&
    typeof t.paciente === "string" &&
    typeof t.profesional === "string" &&
    typeof t.especialidad === "string" &&
    typeof t.fechaHora === "string" &&
    typeof t.duracionMinutos === "number" &&
    typeof t.estado === "string" &&
    ESTADOS_VALIDOS.includes(t.estado)
  );
}

export function esListaDeTurnos(valor: unknown): valor is Turno[] {
  return Array.isArray(valor) && valor.every(esTurno);
}
