import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetails from './ProductDetails'; // Adjust the import path as needed

// Mock the useProductsContext hook to provide a mock dispatch function
jest.mock('../hooks/useProductsContext', () => ({
  useProductsContext: () => ({
    dispatch: jest.fn(),
  }),
}));

test('renders ProductDetails component correctly', () => {
  const product = {
    _id: '123',
    pName: 'Sample Product',
    pPrice: 10,
    pQty: 5,
    pUnit: 'unit',
    supplier: 'Supplier1',
    createdAt: new Date(),
  };

  render(<ProductDetails product={product} />);

  // Ensure that the component renders with the product details
  expect(screen.getByText(product.pName)).toBeInTheDocument();
  expect(
    screen.getByText(`product Price(per Unit): ${product.pPrice}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(`product Quantity: ${product.pQty}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(`product Unit: ${product.pUnit}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(`Supplier ID: ${product.supplier}`)
  ).toBeInTheDocument();

  // Ensure that the delete button is present
  expect(screen.getByText('Delete')).toBeInTheDocument();
});

test('handles delete button click', () => {
  const product = {
    _id: '123',
    pName: 'Sample Product',
    pPrice: 10,
    pQty: 5,
    pUnit: 'unit',
    supplier: 'Supplier1',
    createdAt: new Date(),
  };

  render(<ProductDetails product={product} />);

  // Mock the SweetAlert2 function
  const Swal = require('sweetalert2');
  Swal.fire = jest.fn(() => Promise.resolve({ isConfirmed: true }));

  // Find and click the delete button
  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);

  // Ensure that SweetAlert2 is called and handleClick is triggered
  expect(Swal.fire).toHaveBeenCalled();
});
