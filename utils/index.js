export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + "..." + str.slice(-4) : str;
