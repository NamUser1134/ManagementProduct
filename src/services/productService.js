import axios from 'axios';

// Sử dụng các biến môi trường từ file .env
const API_URL = process.env.REACT_APP_API_URL;
const API_URL_GETDATA = process.env.REACT_APP_API_URL_GETDATA;
const API_URL_GETDATA_LOCAL = process.env.REACT_APP_API_URL_GETDATA_LOCAL; // Để test local
// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL_GETDATA);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
