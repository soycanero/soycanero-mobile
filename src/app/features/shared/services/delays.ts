export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const delayWithError = (ms: number, errorMessage?: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (errorMessage) {
        reject(new Error(errorMessage));
      } else {
        resolve(true);
      }
    }, ms);
  });
};

export const delayWithValue = <T>(ms: number, value: T) => {
  return new Promise<T>(resolve => setTimeout(() => resolve(value), ms));
};
