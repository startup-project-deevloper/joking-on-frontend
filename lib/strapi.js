import Strapi from "strapi-sdk-javascript";

export function getStrapiURL(path = "") {
  return `${
    process.env.STRAPI_URL || "https://strapi-joking-on-backend.onrender.com"
  }${path}`;
}

export function getStrapiGraphQLURL() {
  return `${
    process.env.STRAPI_URL || "https://strapi-joking-on-backend.onrender.com"
  }/graphql`;
}

const strapi = new Strapi(getStrapiURL());

export default strapi;
