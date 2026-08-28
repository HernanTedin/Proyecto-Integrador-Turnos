import { useState } from "react";

export function useLocalStorage<T>(
  clave: string,
  valorInicial: T,
  esValido?: (valor: unknown) => valor is T,
) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const guardado = localStorage.getItem(clave);
      if (!guardado) return valorInicial;

      const parseado: unknown = JSON.parse(guardado);

      if (esValido && !esValido(parseado)) {
        return valorInicial;
      }

      return parseado as T;
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
