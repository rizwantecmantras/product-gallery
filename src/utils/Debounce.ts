export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay = 500
) => {
  let timer: NodeJS.Timeout | null;
  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, delay);
  };
};
