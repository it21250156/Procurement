import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SupplierDetails from './SupplierDetails'; 

// Mock the useSupplierContext hook to provide a mock dispatch function
jest.mock('../hooks/useSuppliersContext', () => ({
  useSupplierContext: () => ({
    dispatch: jest.fn(),
  }),
}));

// Mock the Swal.fire function from SweetAlert2
jest.mock('sweetalert2', () => ({
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
}));

test('renders SupplierDetails component correctly', () => {
  const supplier = {
    _id: '123',
    companyname: 'Sample Supplier',
    email: 'sample@example.com',
    mobileno: '123-456-7890',
  };

  render(<SupplierDetails supplier={supplier} />);

  // Ensure that the component renders with supplier details
  expect(screen.getByText(supplier.companyname)).toBeInTheDocument();
  expect(screen.getByText(`Email : ${supplier.email}`)).toBeInTheDocument();
  expect(
    screen.getByText(`Mobile No : ${supplier.mobileno}`)
  ).toBeInTheDocument();
  expect(screen.getByText('Delete')).toBeInTheDocument();
  expect(screen.getByText('Update')).toBeInTheDocument();
});

test('handles delete button click', async () => {
  const supplier = {
    _id: '123',
    companyname: 'Sample Supplier',
    email: 'sample@example.com',
    mobileno: '123-456-7890',
  };

  render(<SupplierDetails supplier={supplier} />);

  // Find and click the delete button
  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);

  // Ensure that SweetAlert2 is called
  expect(require('sweetalert2').fire).toHaveBeenCalled();

  // Simulate the user confirming the deletion
  await waitFor(() => {
    require('sweetalert2').fire.mockResolvedValue({ isConfirmed: true });
  });

  // Ensure that the delete request is made
  expect(global.fetch).toHaveBeenCalledWith(
    `/api/industry/suppliers/${supplier._id}`,
    {
      method: 'DELETE',
    }
  );

  // Simulate a successful delete response
  global.fetch.mockResolvedValueOnce({
    ok: true,
  });

  // Ensure that dispatch is called with DELETE_SUPPLIER action
  expect(jest.fn()).toHaveBeenCalledWith({
    type: 'DELETE_SUPPLIER',
    payload: supplier,
  });

  // Ensure that the user is redirected after successful deletion
  expect(window.location.href).toBe('/suppliers');
});
