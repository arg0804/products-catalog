import React from 'react';
import '../styles/productList.css';

const ProductList = ({ products, onBuy }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>{product.category}</p>
          <p className='price'>${product.price.toFixed(2)}</p>
          <p className='rating'>Rating: {product.rating}</p>
          <button onClick={() => onBuy(product)} className='buy'>Buy</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;