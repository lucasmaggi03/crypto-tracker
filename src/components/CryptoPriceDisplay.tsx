import { useMemo } from "react";
import { useCryptoStore } from "../store";
import Spinner from "./Spinner";

export default function () {
  const result = useCryptoStore((state) => state.result);
  const loading = useCryptoStore((state) => state.loading);
  const hasResult = useMemo(
    () => !Object.values(result).includes(""),
    [result]
  );

  return (
    <div className="result-wrapper">
      {loading ? <Spinner/> : hasResult && (
        <>
          <h2>Cotización</h2>
          <div className="result">
            <img src={`https://cryptocompare.com/${result.IMAGEURL}`} alt="Imagen crypto" />
            <div className="">
              <p>
                El precio es de : <span>{result.PRICE}</span>
              </p>
              <p>
                Precio mas alto del día : <span>{result.HIGHDAY}</span>
              </p>
              <p>
                Precio mas bajo del día : <span>{result.LOWDAY}</span>
              </p>
              <p>
                Variación ultimas 24hs : <span>{result.CHANGE24HOUR}</span>
              </p>
              <p>
                Última actualización : <span>{result.LASTUPDATE}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
