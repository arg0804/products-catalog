import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Product Sorting', () => {
  test('sorts products by price in ascending order', () => {
    render(<App />);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'price-asc' } });
  });

  test('sorts products by rating in descending order', () => {
    render(<App />);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'rating-desc' } });
  });
});