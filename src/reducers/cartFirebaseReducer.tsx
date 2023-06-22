import { combineReducers } from 'redux';

// Reducer giỏ hàng
const cartReducerfirebase = (state = [], action: any) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const existingItem = state.find((item: any) => item.id === action.payload.id);
      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
        return state.map((item: any) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng với số lượng là 1
        return [...state, { ...action.payload, quantity: 1 }];
      }
    default:
      return state;
  }
};

// Combine các reducer
const rootReducerfirebase = combineReducers({
  cart: cartReducerfirebase,
});

export default rootReducerfirebase;
