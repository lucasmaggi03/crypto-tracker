import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getCrypto, fetchCurrentCryptoPrice } from "./services/CryptoService";
import type { CryptoCurrency, Pair, CryptoPrice } from "./types";

type CryptoStore = {
  cryptoCurrencies: CryptoCurrency[];
  result: CryptoPrice;
  loading: boolean;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
  devtools((set) => ({
    cryptoCurrencies: [],
    result: {} as CryptoPrice,
    loading: false,
    fetchCryptos: async () => {
      const cryptoCurrencies = await getCrypto();
      set(() => ({
        cryptoCurrencies,
      }));
    },
    fetchData: async (pair) => {
      set(() => ({
        loading: true,
      }));
      const result = await fetchCurrentCryptoPrice(pair);

      set(() => ({
        result,
        loading: false,
      }));
    },
  }))
);
