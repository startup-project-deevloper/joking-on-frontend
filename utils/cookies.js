import { serialize } from 'cookie';
const cookie = (res, name, value, options) => {
  if (!options) options = {};
  options.path = '/';
  const stringValue = (typeof value === Object)
      ? 'j:' + JSON.stringify(value) 
      : String(value)
if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  };
  if (!value) {
    options.expires = new Date(Date.now() - 1000);
  };
// if we pass a value, it sets the cookie
  if (value) {
    res.cookieArray.push(serialize(name, String(stringValue), options))
// if we do not pass an empty string as a value, it deletes the cookie
  } else {
    res.cookieArray.push(serialize(name, '', options))
  };
}
export default cookie;