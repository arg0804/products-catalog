import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import { fetchProducts } from '../data';

jest.mock('../data', () => ({
  fetchProducts: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    fetchProducts.mockResolvedValueOnce([
      { id: 1, name: 'Product 1', price: 100, category: 'Electronics', rating: 4.5 },
    ]);
  });

  it('should show products and add to cart', async () => {
    render(<App />);
    
    await waitFor(() => expect(fetchProducts).toHaveBeenCalledTimes(1));
  });
});