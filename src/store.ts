import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getCrypto, fetchCurrentCryptoPrice } from "./services/CryptoService";
import type { CryptoCurrency, Pair } from "./types";

type CryptoStore = {
  cryptoCurrencies: CryptoCurrency[];
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
  devtools((set) => ({
    cryptoCurrencies: [],
    fetchCryptos: async () => {
      const cryptoCurrencies = await getCrypto();
      set(() => ({
        cryptoCurrencies,
      }));
    },
    fetchData: async (pair) => {
        await fetchCurrentCryptoPrice(pair)
    }
  }))
);
