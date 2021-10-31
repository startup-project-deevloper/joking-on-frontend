
export function getPolkadotRPCURL() {
  process.env.NEXT_PUBLIC_POLKADOT_MODE === "production"
    ? process.env.NEXT_PUBLIC_POLKADOT_URL
    : "http://localhost:9933";
}