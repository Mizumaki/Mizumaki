// TODO: Maybe io-ts works well?

export const isString = (arg: unknown): arg is string => typeof arg === 'string';

export const isOptionalString = (arg: unknown): arg is string | undefined =>
  arg === undefined || typeof arg === 'string';

export const isNumber = (arg: unknown): arg is number => {
  return typeof arg === 'number' && !Number.isNaN(arg);
};

// TODO: Maybe passing validator is nice??
export const isObject = (arg: unknown): arg is Record<string | number | symbol, unknown> =>
  arg !== null && typeof arg === 'object';

export const isOneof = <T extends string>(arg: unknown, strings: T[]): arg is T => {
  return isString(arg) && (strings as string[]).includes(arg);
};

export const isArray = <T>(arg: unknown, validator: (a: unknown) => a is T): arg is T[] => {
  if (!Array.isArray(arg)) {
    return false;
  }
  return !arg.some(v => !validator(v));
};
