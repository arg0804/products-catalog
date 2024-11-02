import React, { useEffect, useState } from 'react';
import { fetchProducts } from './data';
import ProductList from './components/ProductList';
import FilterSidebar from './components/FilterSidebar';
import Loader from './components/Loader';
import NoProducts from './components/NoProducts';
import useDebounce from './hooks/useDebounce';
import CartModal from './components/CartModal';
import icon from './assets/cart-icon.jpg';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [filterOptions, setFilterOptions] = useState(() => {
    const savedFilters = localStorage.getItem('filterOptions');
    return savedFilters ? JSON.parse(savedFilters) : {
      category: {
        Electronics: false,
        Footwear: false,
        Clothing: false,
      },
      price: 500,
      rating: 5,
    };
  });
  const [sortOption, setSortOption] = useState(() => {
    const savedSort = localStorage.getItem('sortOption');
    return savedSort || '';
  });
  const [loading, setLoading] = useState(true);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const debouncedPrice = useDebounce(filterOptions.price, 300);
  const debouncedRating = useDebounce(filterOptions.rating, 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('filterOptions', JSON.stringify(filterOptions));
  }, [filterOptions]);

  useEffect(() => {
    localStorage.setItem('sortOption', sortOption);
  }, [sortOption]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = products
    .filter((product) => {
      const categoryFilters = Object.entries(filterOptions.category)
        .filter(([, checked]) => checked)
        .map(([category]) => category);

      const categoryMatch =
        categoryFilters.length === 0 || categoryFilters.includes(product.category);
      const priceMatch = product.price <= debouncedPrice;
      const ratingMatch = product.rating >= debouncedRating;

      return categoryMatch && priceMatch && ratingMatch;
    })
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating-desc') return b.rating - a.rating;
      return 0;
    });

  const handleFilterChange = (newFilters) => {
    setFilterOptions((prev) => {
      const updatedOptions = {
        ...prev,
        category: {
          ...prev.category,
          ...(newFilters.category !== undefined ? { [newFilters.category]: newFilters.checked } : {}),
        },
        price: newFilters.price !== undefined ? newFilters.price : prev.price,
        rating: newFilters.rating !== undefined ? newFilters.rating : prev.rating,
      };
      return updatedOptions;
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
        const existingItem = prev.find(item => item.product.id === product.id);
        if (existingItem) {
            return prev.map(item => 
                item.product.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            );
        } else {
            return [...prev, { product, quantity: 1 }];
        }
    });
  };

  const handleRemoveAllFromCart = () => {
    setCart([]);
  };

  return (
    <div className="app">
      <h1>Product Catalog</h1>
      <div 
        className="cart-icon" 
        onClick={() => setIsCartModalOpen(true)}>
        <img src={icon} alt="Shopping Cart" />
        {cart.length > 0 && <span className="item-count">{cart.length}</span>}
      </div>
      <div className="container">
        <FilterSidebar
          filters={filterOptions}
          onFilterChange={handleFilterChange}
        />
        <select className="sort-select" onChange={handleSortChange} value={sortOption}>
          <option value="">Sort By</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="rating-desc">Rating (High to Low)</option>
        </select>
        {loading ? (
          <Loader />
        ) : filteredProducts.length > 0 ? (
          <ProductList products={filteredProducts} onBuy={handleAddToCart} />
        ) : (
          <NoProducts />
        )}
      </div>
      {isCartModalOpen && (
        <CartModal 
          cartItems={cart} 
          onClose={() => setIsCartModalOpen(false)} 
          onRemoveAll={handleRemoveAllFromCart} 
        />
      )}
    </div>
  );
};

export default App;