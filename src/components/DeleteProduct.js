import React from 'react';
import { deleteProduct } from '../services/productService';
import { toast } from 'react-toastify';

const DeleteProduct = ({ productId, refreshProducts }) => {
  const handleDelete = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    
    if (isConfirmed) {
      try {
        await deleteProduct(productId);
        refreshProducts();
        toast.success('Product deleted successfully!');
      } catch (error) {
        console.error('Failed to delete product:', error);
        toast.error('Failed to delete product. Please try again.');
      }
    }
  };

  return (
    <button className="delete-btn" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteProduct;