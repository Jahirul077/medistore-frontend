export const getSessionStorage = (key) => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(key);
  }
  return null;
};

export const setSessionStorage = (key, value) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, value);
  }
};

export const removeSessionStorage = (key) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};
