export function getNextURL(path = "") {
    return `${
      process.env.NEXT_PUBLIC_MODE === "production"
        ? "https://app.jokingon.com"
        : "https://localhost:3000"
    }/${path}`;
}