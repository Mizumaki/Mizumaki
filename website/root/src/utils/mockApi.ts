/**
 * Debug code for mocking API
 */
export const mockApi = <T>(res: T, options?: { timeout?: number }): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(res), options?.timeout ?? 100);
  });
};
