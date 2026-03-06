const SECRET_KEY = "Gd:maC!qW@3(RIG0"

export const encodePassword = (password) => {
  // Combine SECRET_KEY + password and convert to Base64
  return btoa(SECRET_KEY + password);
};

export const decodePassword = (encoded) => {
  // Decode Base64 and remove SECRET_KEY prefix
  const decoded = atob(encoded);
  return decoded.slice(SECRET_KEY.length);
};
