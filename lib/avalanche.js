
export function getPolkadotRPCURL() {
  process.env.NEXT_PUBLIC_POLKADOT_MODE === "production"
    ? process.env.NEXT_PUBLIC_POLKADOT_URL
    : "https://api.avax-test.network/ext/bc/C/rpc";
}