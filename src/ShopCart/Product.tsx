import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductProps {
  product: Product;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product.id));
  };

  return (
    <li className='list-unstyled text-danger mt-2' key={product.id}>
      {product.name} - {product.price}
      <button className='ms-5 btn btn-primary' onClick={handleAddToCart}>Add to Cart</button>
    </li>
  );
};

export default Product