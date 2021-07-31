import Strapi from "strapi-sdk-javascript";

export function getStrapiURL(path = "") {
  console.log("getStrapiURL", process.env.STRAPI_URL);
  return `${
    process.env.STRAPI_URL || "https://strapi-joking-on-backend.onrender.com"
  }${path}`;
}

export function getStrapiGraphQLURL() {
  console.log(
    "getStrapiGraphQLURL",
    `${
      process.env.STRAPI_URL || "https://strapi-joking-on-backend.onrender.com"
    }/graphql`
  );
  return `${
    process.env.STRAPI_URL || "https://strapi-joking-on-backend.onrender.com"
  }/graphql`;
}

const strapi = new Strapi(getStrapiURL());

export default strapi;
