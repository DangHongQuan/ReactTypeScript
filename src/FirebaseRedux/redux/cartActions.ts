import { onValue, ref } from "firebase/database";
import { database } from "../../Firebase";

// actions/cartActions.ts
export const addToCart = (product: any) => {
  return {
    type: 'ADD_TO_CART',
    payload: product,
  };
};

export const removeFromCart = (productId: string) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: productId,
  };
};

export const clearFromCart = () => {
  return {
    type: 'CLEAR_FROM_CART',
  };
};

// actions/cartActions.ts

// ...

export const loadCartData = () => {
  return (dispatch: any) => {
    const cartRef = ref(database, 'cart');
    onValue(cartRef, (snapshot) => {
      const cartData = snapshot.val();
      dispatch({ type: 'RESTORE_CART', payload: cartData });
    });
  };
};

// ...
