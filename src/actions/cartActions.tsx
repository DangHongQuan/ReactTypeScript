export const addToCart = (itemId: string) => {
  return {
    type: 'ADD_TO_CART',
    payload: itemId,
  };
};

export const removeFromCart = (itemId: string) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: itemId,
  };
};

export const updateCartItemQuantity = (itemId: string, quantity: number) => {
  return {
    type: 'UPDATE_CART_ITEM_QUANTITY',
    payload: {
      itemId,
      quantity,
    },
  };
};

export const clearCart = () => {
  return {
    type: 'CLEAR_CART',
  };
};
