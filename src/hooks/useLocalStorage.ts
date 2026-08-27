import { useState } from "react";

export function useLocalStorage<T>(clave: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const guardado = localStorage.getItem(clave);
      return guardado ? (JSON.parse(guardado) as T) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  const guardarValor = (nuevoValor: T | ((prev: T) => T)) => {
    setValor((prev) => {
      const resultado =
        nuevoValor instanceof Function ? nuevoValor(prev) : nuevoValor;
      try {
        localStorage.setItem(clave, JSON.stringify(resultado));
      } catch {
        // si falla el guardado, no rompemos la app
      }
      return resultado;
    });
  };

  return [valor, guardarValor] as const;
}
