import Strapi from "strapi-sdk-javascript";

export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "https://strapi.jokingon.com"
  }/${path}`;
}

export function getStrapiGraphQLURL() {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "https://strapi.jokingon.com"
  }/graphql`;
}

const strapi = new Strapi(getStrapiURL());

export default strapi;
