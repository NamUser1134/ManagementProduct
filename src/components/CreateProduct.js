import React, { useState } from 'react';
import { createProduct } from '../services/productService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProduct = ({ refreshProducts }) => {
  const [productData, setProductData] = useState({
    brand: '',
    category_id: '',
    description: '',
    image_url: '',
    name: '',
    price: '',
    stock: '',
  });
  const [isComingSoon, setIsComingSoon] = useState(null);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (value) => {
    setIsComingSoon(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = { ...productData };

    if (isComingSoon !== null) {
      dataToSubmit.is_coming_soon = isComingSoon;
    }
    try {
      await createProduct(dataToSubmit);
      toast.success('Product updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { backgroundColor: '#4CAF50' }, // Green color for success
      });

      // Reset the form
      setProductData({
        brand: '',
        category_id: '',
        description: '',
        image_url: '',
        name: '',
        price: '',
        stock: '',
      });
      setIsComingSoon(null);

      // Refresh the product list
      refreshProducts();
    } catch (error) {
      console.error('Failed to create product:', error);
      toast.error('Không thể tạo sản phẩm. Vui lòng thử lại.');
    }
  };

  return (
    <div className="create-product-form">
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" required />
        <input type="text" name="brand" value={productData.brand} onChange={handleChange} placeholder="Brand" required />
        <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Price" required />
        <input type="number" name="category_id" value={productData.category_id} onChange={handleChange} placeholder="Category ID" required />
        <input type="number" name="stock" value={productData.stock} onChange={handleChange} placeholder="Stock" required />
        <input type="text" name="description" value={productData.description} onChange={handleChange} placeholder="Description" />
        <input type="text" name="image_url" value={productData.image_url} onChange={handleChange} placeholder="Image URL" />

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isComingSoon === true}
              onChange={() => handleCheckboxChange(true)}
            />
            Coming Soon
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isComingSoon === false}
              onChange={() => handleCheckboxChange(false)}
            />
            Latest Product
          </label>
        </div>

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;