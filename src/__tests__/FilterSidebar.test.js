import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterSidebar from '../components/FilterSidebar';

describe('FilterSidebar Component', () => {
  const mockOnFilterChange = jest.fn();

  const filters = {
    category: {
      Electronics: false,
      Footwear: false,
      Clothing: false,
    },
    price: 300,
    rating: 4,
  };

  test('renders category checkboxes and price/rating sliders', () => {
    render(<FilterSidebar filters={filters} onFilterChange={mockOnFilterChange} />);

    expect(screen.getByLabelText('Electronics')).toBeInTheDocument();
    expect(screen.getByLabelText('Footwear')).toBeInTheDocument();
    expect(screen.getByLabelText('Clothing')).toBeInTheDocument();

    const priceSlider = screen.getByLabelText('Price Slider');
    expect(priceSlider).toHaveValue(`${filters.price}`);
    expect(screen.getByText('$300')).toBeInTheDocument();

    const ratingSlider = screen.getByLabelText('Rating Slider');
    expect(ratingSlider).toHaveValue(`${filters.rating}`);
    expect(screen.getByText('4 stars')).toBeInTheDocument();
  });

  test('updates filters when checkboxes or sliders are changed', () => {
    render(<FilterSidebar filters={filters} onFilterChange={mockOnFilterChange} />);

    fireEvent.click(screen.getByLabelText('Electronics'));
    expect(mockOnFilterChange).toHaveBeenCalledWith({ category: 'Electronics', checked: true });

    fireEvent.change(screen.getByLabelText('Rating Slider'), { target: { value: 3.5 } });
  });
});