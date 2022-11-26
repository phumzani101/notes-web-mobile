export const getFromLocalStorage = (key) => {
  const auth = localStorage.getItem(key);

  if (auth) {
    return JSON.parse(auth);
  }
  return null;
};

export const saveInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromLocalStorage = () => {
  const auth = localStorage.getItem("auth");

  if (auth) {
    localStorage.removeItem("auth");
    return null;
  }
};
