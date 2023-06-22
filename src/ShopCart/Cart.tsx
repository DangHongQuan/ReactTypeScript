import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateCartItemQuantity, clearCart } from '../actions/cartActions';
import { RootState } from '../store';
import Product from '../ShopCart/Product';
import SampleData from '../ShopCart/SampleData';

const CartStore: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cart.items);

  const handleAddToCart = (productId: string) => {
    dispatch(addToCart(productId));
    calculateTotalPrice(); // Cập nhật tổng tiền sau khi thêm sản phẩm vào giỏ hàng
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(productId);
    } else {
      dispatch(updateCartItemQuantity(productId, quantity));
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    const remainingItems = cartItems.filter((item) => item.id !== productId);
    dispatch(removeFromCart(productId));
    remainingItems.forEach((item) => {
      dispatch(updateCartItemQuantity(item.id, item.quantity));
    });
    calculateTotalPrice(); // Cập nhật tổng tiền sau khi xóa sản phẩm khỏi giỏ hàng
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    calculateTotalPrice(); // Cập nhật tổng tiền sau khi xóa tất cả sản phẩm trong giỏ hàng
  };

  const products = SampleData.slice(0, 5);

  // Tính tổng tiền
  const [totalPrice, setTotalPrice] = useState(0);
  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const product = SampleData.find((p) => p.id === item.id);
      if (product) {
        total += product.price * item.quantity;
      }
    });
    setTotalPrice(total);
  };

  // Cập nhật tổng tiền khi cartItems thay đổi
  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  return (
    <div className="container mt-5">
      <ul>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
      <button className="btn btn-danger mb-3" onClick={handleClearCart}>
        Clear Cart
      </button>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p className="h4">Your cart is empty.</p>
      ) : (
        <ul className="list-group">
          {cartItems.map((item) => {
            const product = SampleData.find((p) => p.id === item.id);
            if (product) {
              return (
                <li className="list-group-item" key={item.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span>{product.name}</span> - Price: {product.price * item.quantity + '$'} - Quantity:{' '}
                      {item.quantity}
                    </div>
                    <div>
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </li>
              );
            }
            return null;
          })}
        </ul>
      )}
      <h1>Total Price: {totalPrice}$</h1>
    </div>
  );
};

export default CartStore;
