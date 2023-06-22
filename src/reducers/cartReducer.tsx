import { combineReducers } from 'redux';

// Type definitions for cart actions
interface AddToCartAction {
  type: 'ADD_TO_CART';
  payload: string;
}

interface RemoveFromCartAction {
  type: 'REMOVE_FROM_CART';
  payload: string;
}

interface UpdateCartItemQuantityAction {
  type: 'UPDATE_CART_ITEM_QUANTITY';
  payload: {
    itemId: string;
    quantity: number;
  };
}

interface ClearCartAction {
  type: 'CLEAR_CART';
}

// Define the action types
type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateCartItemQuantityAction
  | ClearCartAction;

// Define the cart item type
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define the cart state type
interface CartState {
  items: CartItem[];
}

// Define the initial cart state
const initialCartState: CartState = {
  items: [],
};


// Define the cart reducer
const cartReducer = (state = initialCartState, action: CartActionTypes) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem: CartItem = {
        id: action.payload,
        name: 'Item',
        price: 10,
        quantity: 1,
      };
      return {
        ...state,
        items: [...state.items, newItem],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'UPDATE_CART_ITEM_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.itemId ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

// Combine the reducers
const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
