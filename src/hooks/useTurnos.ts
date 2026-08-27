import { useLocalStorage } from "./useLocalStorage";
import { turnosSeed } from "../data/turnos.seed";
import type { Turno } from "../types/turno";

export function useTurnos() {
  const [turnos, setTurnos] = useLocalStorage<Turno[]>("turnos", turnosSeed);

  const agregarTurno = (nuevoTurno: Turno) => {
    setTurnos((prev) => [...prev, nuevoTurno]);
  };

  const modificarTurno = (turnoEditado: Turno) => {
    setTurnos((prev) =>
      prev.map((turno) =>
        turno.id === turnoEditado.id ? turnoEditado : turno,
      ),
    );
  };

  const darDeBajaTurno = (id: string) => {
    setTurnos((prev) =>
      prev.map((turno) =>
        turno.id === id ? { ...turno, estado: "cancelado" as const } : turno,
      ),
    );
  };

  return { turnos, agregarTurno, modificarTurno, darDeBajaTurno };
}
