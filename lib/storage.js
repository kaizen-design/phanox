const APP_KEY = 'phanox';

export const getStorageItem = (key) => {
  if ( typeof window === 'undefined' ) return;
  const data = window.localStorage.getItem(`${APP_KEY}_${key}`);
  try {
    return JSON.parse(data);
  } catch(e) {
    throw new Error(`Failed to parse data from ${APP_KEY}_${key}`);
  }
}

export const setStorageItem = (key, value) => {
  if ( typeof window === 'undefined' ) return;
  const data = JSON.stringify(value);
  return window.localStorage.setItem(`${APP_KEY}_${key}`, data);
}