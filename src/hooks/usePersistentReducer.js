import { useEffect, useReducer } from 'react';

// Vlastiti hook: isto kao useReducer, ali stanje se sprema u localStorage
// pa podaci prežive osvježavanje stranice.
export function usePersistentReducer(reducer, storageKey, getInitialState) {
  const [state, dispatch] = useReducer(reducer, null, () => {
    // Treći argument useReducer-a (init funkcija) izvršava se samo jednom, pri prvom renderu.
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : getInitialState();
    } catch {
      return getInitialState();
    }
  });

  // Svaki put kad se stanje promijeni, spremi ga.
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  return [state, dispatch];
}
