export function getChainId() {
    process.env.NEXT_PUBLIC_AVALANCHE_MODE === "production" ? 43114 : 43113;
}

export function getAvaxRPCURL() {
    process.env.NEXT_PUBLIC_AVALANCHE_MODE === "production"
      ? process.env.NEXT_PUBLIC_POCKET_URL
      : "https://api.avax-test.network/ext/bc/C/rpc";
}