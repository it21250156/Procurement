import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SiteManagerForm from './SiteManagerForm';

// Mock the useSiteManagerContext hook to provide a mock dispatch function
jest.mock('../hooks/useSiteManagersContext', () => ({
  useSiteManagerContext: () => ({
    dispatch: jest.fn(),
  }),
}));

test('renders SiteManagerForm component correctly', () => {
  render(<SiteManagerForm />);

  // Ensure that the form elements are present
  expect(screen.getByLabelText('Site Manager Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Username')).toBeInTheDocument();
  expect(screen.getByLabelText('Site Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Site Address')).toBeInTheDocument();
  expect(screen.getByLabelText('Mobile No')).toBeInTheDocument();
  expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();

  expect(screen.getByText('Add Site Manager')).toBeInTheDocument();
});

test('handles form submission and success', async () => {
  render(<SiteManagerForm />);

  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
      ok: true,
    })
  );

  // Mock the SweetAlert2 function
  const Swal = require('sweetalert2');
  Swal.fire = jest.fn(() => Promise.resolve({ isConfirmed: true }));

  // Fill out the form fields
  const nameInput = screen.getByLabelText('Site Manager Name');
  const usernameInput = screen.getByLabelText('Username');
  

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
  

  // Submit the form
  const submitButton = screen.getByText('Add Site Manager');
  fireEvent.click(submitButton);

  // Wait for the form submission and success notification
  await screen.findByText('Site Manager added successfully');

  // Ensure that the SweetAlert2 success notification is displayed
  expect(Swal.fire).toHaveBeenCalledWith({
    title: 'Success!',
    text: 'Site Manager added successfully',
    icon: 'success',
    confirmButtonText: 'OK',
  });

  // Ensure that form fields are cleared
  expect(nameInput.value).toBe('');
  expect(usernameInput.value).toBe('');
 
});
