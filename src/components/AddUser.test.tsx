import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AddUser from './AddUser';

const onUserAddedMock = jest.fn();
const onCloseMock = jest.fn();

describe('AddUser', () => {
  it('renders with the correct title', () => {
    render(<AddUser open onClose={onCloseMock} onUserAdded={onUserAddedMock} />);

    expect(screen.getByText('Add User')).toBeInTheDocument();
  });

  it('closes the dialog when the cancel button is clicked', () => {
    render(<AddUser open onClose={onCloseMock} onUserAdded={onUserAddedMock} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls onUserAdded with the correct values when the add button is clicked', () => {
    render(<AddUser open onClose={onCloseMock} onUserAdded={onUserAddedMock} />);

    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email Address');
    const addButton = screen.getByText('Add');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.click(addButton);

    expect(onUserAddedMock).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    });
    expect(onCloseMock).toHaveBeenCalled();
  });
});
