export interface Currency {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  chainId: number;
  tokenAddress: string;
}
export const currencies: Currency[] = [
  { id: "usdc", name: "USD Coin", symbol: "USDC", icon: "/icons/usdc.svg", chainId: 1, tokenAddress: "0xcobacoba" },
  { id: "usdt", name: "USD Tether", symbol: "USDT", icon: "/icons/usdt.svg", chainId: 1, tokenAddress: "0xcobacoba" },
  { id: "idrx", name: "IDRX", symbol: "IDRX", icon: "/icons/idrx.svg", chainId: 1, tokenAddress: "0xcobacoba" },
  { id: "jpyc", name: "JPY Coin", symbol: "JPYC", icon: "/icons/jpyc.svg", chainId: 1, tokenAddress: "0xcobacoba" },
  { id: "euroc", name: "Euro Coin", symbol: "EUROC", icon: "/icons/euroc.svg", chainId: 1, tokenAddress: "0xcobacoba" },
  { id: "mxnt", name: "Mexican Peso Tether", symbol: "MXNT", icon: "/icons/mxnt.svg", chainId: 1, tokenAddress: "0xcobacoba" },
  { id: "chnt", name: "CHN Tether", symbol: "CHNT", icon: "/icons/chnt.svg", chainId: 1, tokenAddress: "0xcobacoba" },
];
