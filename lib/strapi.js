import Strapi from "strapi-sdk-javascript";

export function getStrapiURL(path = "/") {
  return `${process.env.NEXT_PUBLIC_STRAPI_URL || "localhost:1337"}${path}`;
}

export function getStrapiGraphQLURL() {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "localhost:1337"
  }/graphql`;
}

const strapi = new Strapi(getStrapiURL());

export default strapi;
