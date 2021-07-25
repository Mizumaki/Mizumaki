import { useCallback, useMemo, useState } from 'react';
import { getUid } from './uid';

type Response<T> = {
  state: {
    array: T[];
    map: Map<string, T | undefined>;
  };
  addItem: () => void;
  updateItem: (key: string, item: T | undefined) => void;
  deleteItem: (key: string) => void;
};

/**
 * Array state with Map state. To update item, need `key` for the Map
 */
export const useArrayState = <T>(): Response<T> => {
  const [mapState, setMapState] = useState<Map<string, T | undefined>>(new Map());
  const arrayState = useMemo(() => {
    return Array.from(mapState.values()).filter(v => v !== undefined) as T[];
  }, [mapState]);

  const addItem = useCallback(() => {
    const newKey = getUid();
    setMapState(m => {
      const newM = new Map(m);
      newM.set(newKey, undefined);
      return newM;
    });
  }, []);

  const updateItem: (key: string, item: T | undefined) => void = useCallback((key, newItem) => {
    setMapState(m => {
      const newM = new Map(m);
      newM.set(key, newItem);
      return newM;
    });
  }, []);

  const deleteItem: (key: string) => void = useCallback(key => {
    setMapState(m => {
      const newM = new Map(m);
      newM.delete(key);
      return newM;
    });
  }, []);

  return {
    state: {
      array: arrayState,
      map: mapState,
    },
    addItem,
    updateItem,
    deleteItem,
  };
};
