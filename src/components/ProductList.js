// src/components/ProductList.js
import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { fetchProducts } from '../services/productService';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import './CSS/ProductList.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      toast.success('Product list updated');
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products. Please try again.');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: 'name', header: 'Name', size: 150 },
      { accessorKey: 'price', header: 'Price', Cell: ({ cell }) => `${cell.getValue()}`, size: 100 },
      { accessorKey: 'brand', header: 'Brand', size: 110 },
      { accessorKey: 'category_id', header: 'Category ID', size: 90 },
      { accessorKey: 'stock', header: 'Stock', size: 90 },
      { 
        accessorKey: 'is_coming_soon', 
        header: 'Coming Soon',
        Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
        size: 110
      },
      { 
        accessorKey: 'is_latest_product', 
        header: 'Latest Product',
        Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
        size: 110
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <>
            <button className="edit-btn" onClick={() => setEditingProduct(row.original)}>Edit</button>
            <DeleteProduct productId={row.original._id.$oid} refreshProducts={loadProducts} />
          </>
        ),
        size: 200
      },
    ],
    []
  );  return (
    <div className="product-list">
      <h1>Product List</h1>
      <MaterialReactTable
        columns={columns}
        data={products}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={true}
        enableSorting={true}
        enableBottomToolbar={true}
        enableTopToolbar={true}
        muiTableBodyRowProps={{ hover: true }}
        muiTableProps={{
          sx: {
            tableLayout: 'fixed',
          },
        }}
        muiTablePaperProps={{
          sx: {
            width: '100%',
          },
        }}
      />
      {editingProduct && (        <div className="modal">
          <div className="modal-content">
            <UpdateProduct
              product={editingProduct}
              refreshProducts={loadProducts}
              onClose={() => setEditingProduct(null)}
            />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductList;

const CustomHeader = ({ column }) => (
  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
    {column.columnDef.header}
  </div>
);
