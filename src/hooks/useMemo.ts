/**
 * Return a cached version of the provided function
 *
 * @param f
 * @returns
 */
const useMemo = <T = any>(f: (...params: any) => T) => {
  const cacheMap: { [key: string]: T } = {};

  const cachedFunction = (...params: any): T => {
    const key = params.map((p: any) => (typeof p === 'object' ? Array.from(p).join(',') : p)).join('_');
    if (Object.keys(cacheMap).indexOf(key) === -1) {
      cacheMap[key] = f(...params);
    } else {
    }
    return cacheMap[key];
  };

  return cachedFunction;
};

export default useMemo;
