import axios from "axios";
import { CryptoCurrenciesResponseSchema } from "../schema/crypto-schema";
import type { Pair } from "../types";

export async function getCrypto() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
  const {
    data: { Data },
  } = await axios(url);
  const result = CryptoCurrenciesResponseSchema.safeParse(Data);
  if (result.success) {
    return result.data;
  }
}

export async function fetchCurrentCryptoPrice(pair: Pair) {
  const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${pair.cryptocurrency}&tsyms=${pair.currency}`;
  const { data } = await axios(url);
  console.log(data);
}
