import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter for testing Link components
import OrderRequestDetails from './OrderRequestDetails';

test('renders OrderRequestDetails component correctly', () => {
  const orderRequest = {
    _id: '123',
    site: 'Sample Site',
    sitemanagerid: {
      name: 'Site Manager Name',
    },
    item: 'Sample Item',
    quantity: 10,
  };

  render(
    <MemoryRouter>
      <OrderRequestDetails orderRequest={orderRequest} />
    </MemoryRouter>
  );

  // Ensure that the component renders with the order request details
  expect(screen.getByText(orderRequest.site)).toBeInTheDocument();
  expect(screen.getByText('Site Manager Name :')).toBeInTheDocument();
  expect(screen.getByText(orderRequest.sitemanagerid.name)).toBeInTheDocument();
  expect(screen.getByText('Item :')).toBeInTheDocument();
  expect(screen.getByText(orderRequest.item)).toBeInTheDocument();
  expect(screen.getByText('Quantity :')).toBeInTheDocument();
  expect(
    screen.getByText(orderRequest.quantity.toString())
  ).toBeInTheDocument();

  // Ensure that the "More..." button is present and links to the correct URL
  const moreButton = screen.getByText('More...');
  expect(moreButton).toBeInTheDocument();
  expect(moreButton.closest('a')).toHaveAttribute(
    'href',
    `/orderapprove/${orderRequest._id}`
  );
});
