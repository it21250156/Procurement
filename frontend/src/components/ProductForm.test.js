import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SupplierContext } from '../context/SupplierContext';
import ProductForm from './ProductForm'; // Adjust the import path as needed

const mockSupplier = {
  _id: 'supplier123',
};

const mockContextValue = {
  supplier: mockSupplier,
};

const mockFetchResponse = (status, data) => {
  return Promise.resolve({
    status,
    json: () => Promise.resolve(data),
  });
};

beforeEach(() => {
  jest.spyOn(window, 'fetch');
  window.fetch.mockResolvedValue(
    mockFetchResponse(200, { _id: 'newProductId' })
  );
});

afterEach(() => {
  window.fetch.mockRestore();
});

test('renders ProductForm component correctly', () => {
  render(
    <SupplierContext.Provider value={mockContextValue}>
      <ProductForm />
    </SupplierContext.Provider>
  );

  expect(screen.getByLabelText('Product Name:')).toBeInTheDocument();
  expect(
    screen.getByLabelText('Product Unit (e.g., pieces, liters, kilograms):')
  ).toBeInTheDocument();
  expect(screen.getByLabelText('Product Quantity:')).toBeInTheDocument();
  expect(screen.getByLabelText('Product Price(per Unit):')).toBeInTheDocument();
  expect(screen.getByText('Add Product')).toBeInTheDocument();
});

test('handles form submission', async () => {
  render(
    <SupplierContext.Provider value={mockContextValue}>
      <ProductForm />
    </SupplierContext.Provider>
  );

  const productNameInput = screen.getByLabelText('Product Name:');
  const productUnitInput = screen.getByLabelText(
    'Product Unit (e.g., pieces, liters, kilograms):'
  );
  const productQtyInput = screen.getByLabelText('Product Quantity:');
  const productPriceInput = screen.getByLabelText('Product Price(per Unit):');
  const addButton = screen.getByText('Add Product');

  fireEvent.change(productNameInput, { target: { value: 'Sample Product' } });
  fireEvent.change(productUnitInput, { target: { value: 'unit' } });
  fireEvent.change(productQtyInput, { target: { value: '5' } });
  fireEvent.change(productPriceInput, { target: { value: '10' } });

  fireEvent.click(addButton);

  expect(window.fetch).toHaveBeenCalledWith('/api/products', {
    method: 'POST',
    body: JSON.stringify({
      pName: 'Sample Product',
      pUnit: 'unit',
      pQty: '5',
      pPrice: '10',
      supplier: 'supplier123',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add assertions for success message, clearing inputs, etc.
});
