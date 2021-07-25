import { Dispatch, SetStateAction, useMemo, useState } from 'react';

// ref: https://stackoverflow.com/questions/53899692/typescript-how-to-extract-only-the-optional-keys-from-a-type
type AllRequiredKeys<T extends Record<string, unknown>> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? K : never;
  }[keyof T],
  undefined
>;

/**
 * Object state with the flag which check all required parameters exist or not
 */
export const useObjectState = <O extends Record<string, unknown>, K extends AllRequiredKeys<O>>({
  requiredParameters,
  initialValue = {},
}: {
  requiredParameters: K[];
  initialValue?: Partial<O>;
}):
  | { state: Partial<O>; setState: Dispatch<SetStateAction<Partial<O>>>; hasAllValues: false }
  | {
      state: Required<Pick<O, K>> & Partial<Omit<O, K>>;
      setState: Dispatch<SetStateAction<Partial<O>>>;
      hasAllValues: true;
    } => {
  const [state, setState] = useState<Partial<O>>(initialValue);

  const hasAllValues = useMemo(() => {
    return requiredParameters.every(requiredParam => {
      return state[requiredParam] !== undefined;
    });
  }, [state]);

  // To avoid unwanted object update, use memo for response
  const res = useMemo(() => {
    return {
      state,
      setState,
      hasAllValues,
    };
  }, [state, setState, hasAllValues]);

  // `as` is danger, but `hasAllValues` confirms it so here is affordable
  if (res.hasAllValues) {
    return res as {
      state: Required<Pick<O, K>> & Partial<Omit<O, K>>;
      setState: Dispatch<SetStateAction<Partial<O>>>;
      hasAllValues: true;
    };
  }

  return res as { state: Partial<O>; setState: Dispatch<SetStateAction<Partial<O>>>; hasAllValues: false };
};

// TODO: Want to write React Hook Test
// if (process.env.NODE_ENV === 'test') {
//   test('Without Initial Value', () => {
//     const res = useObjectState<{ hello: string; world: number; hell?: string }>({
//       requiredParameters: ['hello', 'world'],
//     });

//     expect(res.state).toBe({});

//     res.setState({ hello: 'world', hell: 'yeah' });
//     expect(res.state).toBe({ hello: 'world', hell: 'yeah' });
//     expect(res.hasAllValues).toBe(false);

//     res.setState({ hello: 'world', world: 0 });
//     expect(res.state).toBe({ hello: 'world', world: 0 });
//     expect(res.hasAllValues).toBe(true);
//   });
//   test('With initial value')
// }
