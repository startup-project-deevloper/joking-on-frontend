import Strapi from "strapi-sdk-javascript";

export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_MODE === "production"
      ? process.env.NEXT_PUBLIC_STRAPI_URL
      : "https://localhost:1337"
  }/${path}`;
}

const strapi = new Strapi(getStrapiURL());

export default strapi;
