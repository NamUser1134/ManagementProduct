// src/App.js
import React, { useState } from 'react';
import CreateProduct from './components/CreateProduct';
import ProductList from './components/ProductList';
import './styles.css';  // Import the CSS file

const App = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshProducts = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container">
      <h1>Product Management</h1>
      <CreateProduct refreshProducts={refreshProducts} />
      <ProductList key={refreshTrigger} />
    </div>
  );
};

export default App;
