// Reducer = čista funkcija (stanje, akcija) => novo stanje.
// Nikad ne mutiramo staro stanje, uvijek vraćamo nove objekte/polja
// (spread operator, map, filter). React tako zna da se nešto promijenilo.

export const ACTIONS = {
  ADD_MACHINE: 'ADD_MACHINE',
  UPDATE_MACHINE: 'UPDATE_MACHINE',
  DELETE_MACHINE: 'DELETE_MACHINE',
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
};

// Pomoćna funkcija: primijeni izmjenu samo na jedan aparat
const updateMachine = (state, machineId, change) =>
  state.map((m) => (m.id === machineId ? change(m) : m));

export function machinesReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_MACHINE:
      return [...state, { ...action.machine, products: [] }];

    case ACTIONS.UPDATE_MACHINE:
      return updateMachine(state, action.machineId, (m) => ({ ...m, ...action.changes }));

    case ACTIONS.DELETE_MACHINE:
      return state.filter((m) => m.id !== action.machineId);

    case ACTIONS.ADD_PRODUCT:
      return updateMachine(state, action.machineId, (m) => ({
        ...m,
        products: [...m.products, action.product],
      }));

    case ACTIONS.UPDATE_PRODUCT:
      return updateMachine(state, action.machineId, (m) => ({
        ...m,
        products: m.products.map((p) =>
          p.id === action.product.id ? action.product : p
        ),
      }));

    case ACTIONS.DELETE_PRODUCT:
      return updateMachine(state, action.machineId, (m) => ({
        ...m,
        products: m.products.filter((p) => p.id !== action.productId),
      }));

    default:
      throw new Error(`Nepoznata akcija: ${action.type}`);
  }
}
