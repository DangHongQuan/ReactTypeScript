import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { database } from "../../Firebase";
import { table } from "console";
import { addToCart } from "../../actions/cartActions";

const productsRef = ref(database, "product");

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");




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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name && price) {
      const newProduct = { name, price };
      push(productsRef, newProduct);
      setName("");
      setPrice("");
    }
  };

  const handleDelete = (id: string) => {
    remove(ref(database, `product/${id}`));
  };

  const handleUpdate = (product: any) => {
    setSelectedProduct(product);
    setUpdateName(product.name);  
    setUpdatePrice(product.price);
    setShowUpdatePopup(true);
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (updateName && updatePrice && selectedProduct) {
      const updatedProduct = { ...selectedProduct, name: updateName, price: updatePrice };
      set(ref(database, `product/${selectedProduct.id}`), updatedProduct);
      setName("");
      setPrice("");
      setSelectedProduct(null);
      setShowUpdatePopup(false);
    }
  };

  const handleCancelUpdate = () => {
    setName("");
    setPrice("");
    setUpdateName("");
    setUpdatePrice("");
    setSelectedProduct(null);
    setShowUpdatePopup(false);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">Product Price</label>
              <input
                type="text"
                className="form-control"
                id="productPrice"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
        </div>
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
                    <button className="btn btn-danger mx-2" onClick={() => handleDelete(product.id)}>Delete</button>
                    <button className="btn btn-primary" onClick={() => handleUpdate(product)}>Update</button>
                  </div>
                </li>
              ))}
            </ul>
            </table>
          )}
        </div>
      </div>

      {showUpdatePopup && selectedProduct && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Update Product</h3>
                <button type="button" className="btn-close" onClick={handleCancelUpdate}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdateSubmit}>
                  <div className="mb-3">
                    <label htmlFor="updateProductName" className="form-label">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="updateProductName"
                      placeholder="Product Name"
                      value={updateName}
                      onChange={(e) => setUpdateName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="updateProductPrice" className="form-label">Product Price</label>
                    <input
                      type="text"
                      className="form-control"
                      id="updateProductPrice"
                      placeholder="Product Price"
                      value={updatePrice}
                      onChange={(e) => setUpdatePrice(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Update</button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancelUpdate}>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;




