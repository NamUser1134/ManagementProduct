import React, { useState, useEffect } from 'react';
import { updateProduct } from '../services/productService';
import './CSS/UpdateProduct.css';
import { toast } from 'react-toastify';

const UpdateProduct = ({ product, refreshProducts, onClose }) => {
  const [productData, setProductData] = useState({
    brand: '',
    category_id: '',
    description: '',
    image_url: '',
    name: '',
    price: '',
    stock: '',
    is_coming_soon: false,
    is_latest_product: false,
  });

  useEffect(() => {
    if (product) {
      setProductData({
        brand: product.brand,
        category_id: product.category_id,
        description: product.description,
        image_url: product.image_url,
        name: product.name,
        price: product.price,
        stock: product.stock,
        is_coming_soon: product.is_coming_soon || false,
        is_latest_product: product.is_latest_product || false,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(product._id.$oid, productData);
      toast.success('Product updated successfully!');
      refreshProducts();
      onClose();
    } catch (error) {
      console.error('Failed to update product:', error);
      toast.error('Failed to update product. Please try again.');
    }
  };


























































      return (
        <form onSubmit={handleSubmit} className="update-product-form">
          <h2>Edit Product</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={productData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={productData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="brand">Brand:</label>
            <input type="text" id="brand" name="brand" value={productData.brand} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="category_id">Category:</label>
            <input type="text" id="category_id" name="category_id" value={productData.category_id} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock:</label>
            <input type="number" id="stock" name="stock" value={productData.stock} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={productData.description} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image_url">Image URL:</label>
            <input type="text" id="image_url" name="image_url" value={productData.image_url} onChange={handleChange} />
          </div>
          <div className="form-group checkbox-group">
            <label htmlFor="is_coming_soon">
              <input
                type="checkbox"
                id="is_coming_soon"
                name="is_coming_soon"
                checked={productData.is_coming_soon}
                onChange={handleCheckboxChange}
              />
              Coming Soon
            </label>
          </div>
          <div className="form-group checkbox-group">
            <label htmlFor="is_latest_product">
              <input
                type="checkbox"
                id="is_latest_product"
                name="is_latest_product"
                checked={productData.is_latest_product}
                onChange={handleCheckboxChange}
              />
              Latest Product
            </label>
          </div>
          <div className="button-group">
            <button type="submit" className="update-btn">Update Product</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      );
    };

  export default UpdateProduct;
