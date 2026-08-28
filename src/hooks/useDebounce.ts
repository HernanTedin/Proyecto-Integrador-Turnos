import { useState, useEffect } from "react";

export function useDebounce<T>(valor: T, retrasoMs: number): T {
  const [valorConRetraso, setValorConRetraso] = useState(valor);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setValorConRetraso(valor);
    }, retrasoMs);

    return () => {
      clearTimeout(temporizador);
    };
  }, [valor, retrasoMs]);

  return valorConRetraso;
}
