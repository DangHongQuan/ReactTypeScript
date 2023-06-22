// reducers/cartReducer.ts
const initialState: any[] = [];

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, { ...action.payload, quantity: 1 }];

    case 'REMOVE_FROM_CART':
      return state.filter((product) => product.id !== action.payload);

    case 'UPDATE_FROM_CART':
      return state.map((product) =>
        product.id === action.payload.id ? { ...product, ...action.payload.updatedData } : product
      );

    case 'CLEAR_FROM_CART':
      return [];

    case 'RESTORE_CART':
      return action.payload;

    default:
      return state;
  }
};

export default cartReducer;
