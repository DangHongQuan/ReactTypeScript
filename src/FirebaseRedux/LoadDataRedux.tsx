// yourComponent.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCartData } from './redux/cartActions';
import { onValue, ref } from 'firebase/database';
import { database } from '../Firebase';


const productsRef = ref(database, "product");
const YourComponent = () => {
  const dispatch = useDispatch();
//  const cartData = useSelector(state => state.cartData);
  const cartData = useSelector((state: any) => state);
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    onValue(productsRef, (snapshot) => {
      const productsData: any = snapshot.val();
      if (productsData) {
        const productsList = Object.entries(productsData).map(([id, item]: [string, any]) => ({
          id,
          ...item,
        }));
        setProducts(productsList);
      }
    });
  }, []);
  return (
    <div>
      {/* Hiển thị dữ liệu đã được load từ Firebase */}
      {cartData.map((item: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <span>{item.price}</span>
        </div>
      ))}
      {/* Rest of your component code */}
    </div>
  );
};

export default YourComponent;
