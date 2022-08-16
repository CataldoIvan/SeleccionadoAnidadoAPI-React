import { useEffect, useState } from "react";

export const useCustomFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
   
      //creo las variables para cancelar la peticion en caso de no respuesta del servidor
      const abortController = new AbortController();
      //signal va a almacenar si el abort controller se ejecuto o no
      const signal = abortController.signal;
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url);
        if (!response.ok) {
            let err = new Error();
            err.status = response.status || "00";
            err.statusText = response.statusText || "Hubo un error :(";
            throw err;
        } else {
            const data = await response.json();
            

          //si la peticion no fue rechazada
          if (!signal.aborted) {
            setData(data);
            setError(null);
          }
        }
      } catch (error) {
        if (!signal.aborted) {
          setData(null);
          setError(error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };
    fetchData();
    //return en el useeffect funciona como el componentDidCOmponent. Se ejecuta una vez que termina de
    return () => abortController.abort();
  }, [url]);



  return { data, error, loading };
};
