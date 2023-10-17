import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SupplierForm from './SupplierForm'; 

// Mock the useSupplierContext hook to provide a mock dispatch function
jest.mock('../hooks/useSuppliersContext', () => ({
  useSupplierContext: () => ({
    dispatch: jest.fn(),
  }),
}));

// Mock the fetch function
global.fetch = jest.fn();

beforeEach(() => {
  render(<SupplierForm />);
});

test('renders SupplierForm component correctly', () => {
  // Ensure that the component renders with form fields
  expect(screen.getByText('Company Name')).toBeInTheDocument();
  expect(screen.getByText('Company Address')).toBeInTheDocument();
  expect(screen.getByText('Mobile No')).toBeInTheDocument();
  expect(screen.getByText('Email Address')).toBeInTheDocument();
  expect(screen.getByText('Password')).toBeInTheDocument();
  expect(screen.getByText('Add Supplier')).toBeInTheDocument();
});

test('handles form submission and dispatches create action', async () => {
  // Fill in form fields
  fireEvent.change(screen.getByLabelText('Company Name'), {
    target: { value: 'Supplier Company' },
  });
  fireEvent.change(screen.getByLabelText('Company Address'), {
    target: { value: '123 Supplier St' },
  });
  fireEvent.change(screen.getByLabelText('Mobile No'), {
    target: { value: '1234567890' },
  });
  fireEvent.change(screen.getByLabelText('Email Address'), {
    target: { value: 'supplier@example.com' },
  });
  fireEvent.change(screen.getByLabelText('Password'), {
    target: { value: 'password123' },
  });

  // Mock the fetch function to simulate a successful response
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => ({ _id: '123', companyname: 'Supplier Company' }),
  });

  // Submit the form
  await act(async () => {
    fireEvent.click(screen.getByText('Add Supplier'));
  });

  // Ensure that the form fields are cleared
  expect(screen.getByLabelText('Company Name')).toHaveValue('');
  expect(screen.getByLabelText('Company Address')).toHaveValue('');
  expect(screen.getByLabelText('Mobile No')).toHaveValue('');
  expect(screen.getByLabelText('Email Address')).toHaveValue('');
  expect(screen.getByLabelText('Password')).toHaveValue('');

  // Ensure that the dispatch function is called with the create action
  expect(jest.fn()).toHaveBeenCalledWith({
    type: 'CREATE_SUPPLIER',
    payload: { _id: '123', companyname: 'Supplier Company' },
  });
});

test('handles form submission with missing fields', async () => {
  // Submit the form without filling in any fields
  await act(async () => {
    fireEvent.click(screen.getByText('Add Supplier'));
  });

  // Ensure that the error message is displayed
  expect(screen.getByText('All fields are required')).toBeInTheDocument();

  // Ensure that the dispatch function is not called
  expect(jest.fn()).not.toHaveBeenCalled();
});

test('handles form submission with a server error', async () => {
  // Mock the fetch function to simulate a server error response
  global.fetch.mockResolvedValue({
    ok: false,
    json: async () => ({ error: 'Server Error' }),
  });

  // Fill in form fields
  fireEvent.change(screen.getByLabelText('Company Name'), {
    target: { value: 'Supplier Company' },
  });
  fireEvent.change(screen.getByLabelText('Company Address'), {
    target: { value: '123 Supplier St' },
  });
  fireEvent.change(screen.getByLabelText('Mobile No'), {
    target: { value: '1234567890' },
  });
  fireEvent.change(screen.getByLabelText('Email Address'), {
    target: { value: 'supplier@example.com' },
  });
  fireEvent.change(screen.getByLabelText('Password'), {
    target: { value: 'password123' },
  });

  // Submit the form
  await act(async () => {
    fireEvent.click(screen.getByText('Add Supplier'));
  });

  // Ensure that the error message from the server is displayed
  expect(screen.getByText('Server Error')).toBeInTheDocument();
});
