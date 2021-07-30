import { VIDEO, IMAGE } from "../constrants/index";

export function getCloudinaryURL(path = "") {
  return `${process.env.CLOUDINARY_URL || "http://localhost:1337"}${path}`;
}

export function getCloudinaryUploadURL(type) {
  switch (type) {
    case VIDEO:
      break;
    case IMAGE:
      break;
    default:
      return new Error();
  }
  return `https://api.cloudinary.com/v1_1/joking-on/upload`;
}
