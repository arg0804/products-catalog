import headphones from './assets/wirelessHeadphones.jpg';
import speaker from './assets/bluetoothSpeaker.jpg';
import shoes from './assets/runningShoes.jpg';
import smartphone from './assets/smartphone.jpg';
import jacket from './assets/leatherJacket.jpg';

export const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      brand: "Brand A",
      price: 99.99,
      rating: 4.5,
      imageUrl: headphones,
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      category: "Electronics",
      brand: "Brand B",
      price: 49.99,
      rating: 4.0,
      imageUrl: speaker,
    },
    {
      id: 3,
      name: "Running Shoes",
      category: "Footwear",
      brand: "Brand C",
      price: 59.99,
      rating: 4.2,
      imageUrl: shoes,
    },
    {
      id: 4,
      name: "Smartphone",
      category: "Electronics",
      brand: "Brand D",
      price: 499.99,
      rating: 4.8,
      imageUrl: smartphone,
    },
    {
      id: 5,
      name: "Leather Jacket",
      category: "Clothing",
      brand: "Brand E",
      price: 199.99,
      rating: 4.7,
      imageUrl: jacket,
    },
  ];
  

  export const fetchProducts = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 1000);
  });
};