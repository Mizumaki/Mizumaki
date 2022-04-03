export class SimpleCache<Cache extends { [Key in string]: unknown }> {
  /**
   * Map
   *  - key: Cache key
   *  - value: [Cached Value, Expired Unix Time]
   */
  cache: Map<keyof Cache, [Cache[keyof Cache], number]>;

  constructor() {
    this.cache = new Map<keyof Cache, [Cache[keyof Cache], number]>();
  }

  get<T extends keyof Cache>(key: T) {
    const v = this.cache.get(key);
    if (v === undefined) return undefined;

    const [value, expiresAt] = v;
    if (expiresAt <= Date.now()) {
      return undefined;
    }
    return value;
  }

  set<T extends keyof Cache>(key: T, value: Cache[T], maxAgeMS: number) {
    const expires = Date.now() + maxAgeMS;
    this.cache.set(key, [value, expires]);
  }
}

if (process.env.NODE_ENV === 'test') {
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  describe('SimpleCache works well', () => {
    test('Cached value is returned before expire', async () => {
      const testCache = new SimpleCache<{ test1: string; test2: number }>();
      testCache.set('test1', 'test1-value', 1000);
      testCache.set('test2', 9999, 1000);
      await wait(900);
      expect(testCache.get('test1')).toBe('test1-value');
      expect(testCache.get('test2')).toBe(9999);
    });

    test('value is not returned after expire', async () => {
      const testCache = new SimpleCache<{ test1: string; test2: number }>();
      testCache.set('test1', 'test1-value', 1000);
      testCache.set('test2', 9999, 1100);
      await wait(1000);
      expect(testCache.get('test1')).toBeUndefined();
      expect(testCache.get('test2')).toBe(9999);
    });

    test('Expired time is correctly overwritten', async () => {
      const testCache = new SimpleCache<{ test1: string }>();
      testCache.set('test1', 'test1-value', 500);
      testCache.set('test1', 'test1-value-2', 1000);
      await wait(500);
      expect(testCache.get('test1')).toBe('test1-value-2');
    });

    test('undefined is returned when not set key', () => {
      const testCache = new SimpleCache<{ test1: string; test2: number }>();
      testCache.set('test1', 'hello', 10000);
      expect(testCache.get('test2')).toBeUndefined();
    });
  });
}
