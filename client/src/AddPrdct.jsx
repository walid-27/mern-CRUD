import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./index.css";

function AddPrdct() {
  const [active, setActive] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [products, setProducts] = useState([]);

  const [notification, setNotification] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [loading, setLoading] = useState(false);

  // Toggle form visibility
  const btnAddPrdct = () => {
    setActive(prev => !prev);
  };

  // Fetch all products from backend
  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    getProducts();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Handle form submit
  const HanderlerDataProducter = async (e) => {
    e.preventDefault();

    if (!title || !price || !description || !image) {
      setNotification("Please fill all fields and select an image");
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 3000);
      return;
    }

    try {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("price", price);
      formdata.append("description", description);
      formdata.append("image", image);

      await axios.post("http://localhost:8000/app-product", formdata, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setNotification("Product created!");
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 3000);

      // Refresh products list
      await getProducts();

      // Reset form
      setTitle("");
      setPrice("");
      setDescription("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      setNotification("Error creating product!");
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 3000);
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      {showNotif && <div className="notification">{notification}</div>}

      <div className='add'>
        <div className="product_mangement">
          <h3>Add your product</h3>
          <button
            className='btn-add'
            onClick={btnAddPrdct}
            style={{
              transform: active ? "rotate(45deg)" : "rotate(0deg)",
              transition: "0.3s"
            }}
          >
            <span className="material-symbols-rounded">add</span>
          </button>
        </div>
        <hr />

        <form
          className='Form_Add'
          style={{ display: active ? "flex" : "none", transition: "1s ease" }}
          onSubmit={HanderlerDataProducter}
        >
          <label className="drop-zone">
            <input
              type="file"
              name='image'
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
            {!image ? (
              <div className="drop-content">
                <span className="material-symbols-rounded">add</span>
                <p>Drag & drop image here</p>
                <small>or click to browse</small>
              </div>
            ) : (
              <div className="preview-grid">
                <img src={preview} alt="preview" />
              </div>
            )}
          </label>

          <textarea
            className='textarea-Prdct'
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="form-inputs">
            <input
              type="text"
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder='Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button type='submit' disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>

        <div className="Product_stock">
          <h1>Products in Stock</h1>
          <hr />
          <br />
          {[...products].reverse().map((product) => (
            <div className="Product_item" key={product._id}>
              {product.image && (
                <img src={`http://localhost:8000${product.image}`} alt={product.title} />
              )}
              <div className="data_prdct">
                <h2>{product.title}</h2>
                <h4>{product.price} $</h4>
                <p>{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddPrdct;
