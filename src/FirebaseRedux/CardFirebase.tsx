  import React, { useEffect, useState } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import { onValue, ref } from "firebase/database";
  import { addToCart, clearFromCart, removeFromCart } from "./redux/cartActions";
  import { database } from "../Firebase";


  const productsRef = ref(database, "product");

  const CardFirebase: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const cartItems = useSelector((state: any) => state);
    const dispatch = useDispatch();



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
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updateFormData, setUpdateFormData] = useState({
      id: "",
      name: "",
      price: "",
    });

 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target;
      setUpdateFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    };


    const handleClearCart = () => {
      dispatch(clearFromCart());
    
    };



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Thực hiện logic cập nhật sản phẩm trong giỏ hàng
      // Sử dụng dispatch để gọi action "UPDATE_FROM_CART"
      dispatch({
        type: 'UPDATE_FROM_CART',
        payload: {
          id: updateFormData.id,
          name: updateFormData.name,
          price: updateFormData.price,

        },
      });

      // Đặt lại state và ẩn form cập nhật
      setUpdateFormData({
        id: "",
        name: "",
        price: "",
      });
      setShowUpdateForm(false);
    };

    // ...
    //




    return (
      <div className="container mt-5">
        <div className="row">
          {/* ... */}
          <div className="col-md-12 mt-5">
            {/* ... */}
            <table className="table">
              <ul className="list-group">
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="list-group-item d-flex align-items-center justify-content-between"
                  >
                    <div>{product.name}</div>
                    <div>{product.price}</div>
                    <div>
                      <button className="btn btn-primary" onClick={() => dispatch(addToCart(product))}>
                        Add to Cart
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </table>
            {/* ... */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-5">
            <h3>Cart</h3>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th> {/* Thêm cột Action */}
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item: any) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>
                        <button className="btn btn-primary" onClick={() => dispatch(removeFromCart(item.id))}>
                          Remove
                        </button>

                      </td>
                    </tr>
                  ))}
                  <button className="btn btn-danger" onClick={handleClearCart}>Clear All</button>
                </tbody>
              </table>
            )}
            {showUpdateForm && (
              <div>
                <h4>Update Item</h4>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      value={updateFormData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="price">Price:</label>
                    <input
                      type="text"
                      id="price"
                      value={updateFormData.price}
                      onChange={handleChange}
                    />
                  </div>
                  <button className="btn btn-secondary" type="submit">Update</button>
                </form>

              </div>

            )}
          </div>
        </div>
      </div>
    );
  };

  export default CardFirebase;
