export class LogicError extends Error {
  readonly raw: unknown;

  constructor(message: string, rawError?: unknown) {
    super(message);
    this.raw = rawError;
  }
}
export type LogicRes<R> = [err: LogicError, res?: undefined] | [err: undefined, res: R];
