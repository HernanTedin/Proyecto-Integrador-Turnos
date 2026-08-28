import { useState, useMemo, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useDebounce } from "./useDebounce";
import { turnosSeed } from "../data/turnos.seed";
import type { Turno, EstadoTurno } from "../types/turno";
import { esListaDeTurnos } from "../lib/esTurno";
type CampoOrden = "paciente" | "fechaHora";
type DireccionOrden = "asc" | "desc";

export function useTurnos() {
  const [turnos, setTurnos] = useLocalStorage<Turno[]>(
    "turnos",
    turnosSeed,
    esListaDeTurnos,
  );
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const textoBusquedaConRetraso = useDebounce(textoBusqueda, 300);
  const [estadosFiltrados, setEstadosFiltrados] = useState<EstadoTurno[]>([]);
  const [campoOrden, setCampoOrden] = useState<CampoOrden>("fechaHora");
  const [direccionOrden, setDireccionOrden] = useState<DireccionOrden>("asc");
  const [pagina, setPagina] = useState(1);
  const [tamanioPagina, setTamanioPagina] = useState(10);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setCargando(false);
    }, 600);

    return () => {
      clearTimeout(temporizador);
    };
  }, []);

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

  const alternarFiltroEstado = (estado: EstadoTurno) => {
    setPagina(1);
    setEstadosFiltrados((prev) =>
      prev.includes(estado)
        ? prev.filter((e) => e !== estado)
        : [...prev, estado],
    );
  };

  const cambiarTextoBusqueda = (texto: string) => {
    setPagina(1);
    setTextoBusqueda(texto);
  };

  const ordenarPor = (campo: CampoOrden) => {
    if (campo === campoOrden) {
      setDireccionOrden((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setCampoOrden(campo);
      setDireccionOrden("asc");
    }
  };

  const cambiarTamanioPagina = (tamanio: number) => {
    setTamanioPagina(tamanio);
    setPagina(1);
  };

  const turnosFiltradosOrdenados = useMemo(() => {
    let resultado = turnos;

    if (textoBusquedaConRetraso.trim()) {
      const texto = textoBusquedaConRetraso.toLowerCase();
      resultado = resultado.filter(
        (turno) =>
          turno.paciente.toLowerCase().includes(texto) ||
          turno.profesional.toLowerCase().includes(texto),
      );
    }

    if (estadosFiltrados.length > 0) {
      resultado = resultado.filter((turno) =>
        estadosFiltrados.includes(turno.estado),
      );
    }

    const factor = direccionOrden === "asc" ? 1 : -1;
    resultado = [...resultado].sort((a, b) => {
      if (campoOrden === "paciente") {
        return a.paciente.localeCompare(b.paciente) * factor;
      }
      return (
        (new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime()) *
        factor
      );
    });

    return resultado;
  }, [
    turnos,
    textoBusquedaConRetraso,
    estadosFiltrados,
    campoOrden,
    direccionOrden,
  ]);

  const totalFiltrados = turnosFiltradosOrdenados.length;
  const totalPaginas = Math.max(1, Math.ceil(totalFiltrados / tamanioPagina));
  const paginaSegura = Math.min(pagina, totalPaginas);

  const turnosPaginados = useMemo(() => {
    const inicio = (paginaSegura - 1) * tamanioPagina;
    return turnosFiltradosOrdenados.slice(inicio, inicio + tamanioPagina);
  }, [turnosFiltradosOrdenados, paginaSegura, tamanioPagina]);
  const contadores = useMemo(() => {
    return {
      total: turnos.length,
      pendiente: turnos.filter((t) => t.estado === "pendiente").length,
      confirmado: turnos.filter((t) => t.estado === "confirmado").length,
      cancelado: turnos.filter((t) => t.estado === "cancelado").length,
      atendido: turnos.filter((t) => t.estado === "atendido").length,
    };
  }, [turnos]);
  return {
    turnos: turnosPaginados,
    contadores,
    cargando,
    totalFiltrados,
    totalPaginas,
    pagina: paginaSegura,
    setPagina,
    tamanioPagina,
    cambiarTamanioPagina,
    textoBusqueda,
    setTextoBusqueda: cambiarTextoBusqueda,
    estadosFiltrados,
    alternarFiltroEstado,
    campoOrden,
    direccionOrden,
    ordenarPor,
    agregarTurno,
    modificarTurno,
    darDeBajaTurno,
  };
}
