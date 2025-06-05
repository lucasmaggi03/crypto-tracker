import { create } from "zustand";
import axios from 'axios'
import { CryptoCurrenciesResponseSchema } from "./schema/crypto-schema";
import type { CryptoCurrency } from "./types";

type CryptoStore = {
    cryptoCurrencies : CryptoCurrency[],
    fetchCryptos: () => Promise<void>
}
async function getCrypto() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    const {data: {Data}} = await axios(url)
    const result = CryptoCurrenciesResponseSchema.safeParse(Data)
    if(result.success){
        return result.data
    }
}

export const useCryptoStore = create<CryptoStore>((set)=>({
    cryptoCurrencies: [],
    fetchCryptos: async () => {
        const cryptoCurrencies = await getCrypto()
        set(() => ({
            cryptoCurrencies
        }))
    }
}))
