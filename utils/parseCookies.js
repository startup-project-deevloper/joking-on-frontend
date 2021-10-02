import { useCookie } from "next-cookie";
function parseCookies(array, context) {
  const cookie = useCookie(context);
  for (let string of array) {
    const arr = string.split(";");
    const options = {};
    const key = arr[0].split("=")[0];
    const value = arr[0].split("=")[1];
    arr.shift();
    for (let option of arr) {
      let key = option.split("=")[0].slice(1);
      let value = option.split("=")[1];
      if (key === "Path") key = "path";
      else if (key === "Expires") key = "expires";
      else if (key === "HttpOnly") (key = "httpOnly"), (value = true);
      options[key] = value;
    }
    if (value !== "") cookie.set(key, value, options);
    else cookie.remove(key);
  }
}
export default parseCookies;
