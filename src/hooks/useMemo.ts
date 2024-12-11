/**
 * Return a cached version of the provided function
 *
 * @param f
 * @returns
 */
const useMemo = <T = any>(f: (...params: any) => T) => {
  const cacheMap: { [key: string]: T } = {};

  const cachedFunction = (...params: any): T => {
    const key = params.join('_');

    if (!cacheMap[key]) {
      cacheMap[key] = f(...params);
    }
    return cacheMap[key];
  };

  return cachedFunction;
};

export default useMemo;
