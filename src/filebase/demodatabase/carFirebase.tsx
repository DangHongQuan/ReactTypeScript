import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { database } from "../../Firebase";
import { table } from "console";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartActions";
const productsRef = ref(database, "product");

const CardFirebase: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    onValue(productsRef, (snapshot) => {
      const productsData: any = snapshot.val();
      if (productsData) {
        const productsList = Object.entries(productsData).map(([id, product]: [string, any]) => ({
          id,
          ...product,
        }));
        setProducts(productsList);
      }
    });
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        
        <div className="col-md-12   mt-5">
          {products.length === 0 ? (
            <p>No products found in the database.</p>
          ) : (
            <table className="table">
                <ul className="list-group">
              {products.map((product) => (
                <li key={product.id} className="list-group-item d-flex align-items-center justify-content-between">
             
                 <div>{product.name}</div>
                 <div>{product.price}</div>
                  <div>
                    
                  </div>
                </li>
              ))}
            </ul>
            </table>
          )}
        </div>
      </div>

     
    </div>
  );
};

export default CardFirebase;




