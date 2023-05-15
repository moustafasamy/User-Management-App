import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserDetails from './UserDetails';

const mockUser = {
  id: 1,
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  avatar: 'https://e...content-available-to-author-only...e.com/avatar.png'
};

describe('UserDetails', () => {
  it('should render user details correctly', () => {
    render(<UserDetails user={mockUser} handleUserClick={jest.fn()} />);

    expect(screen.getByText(`${mockUser.first_name} ${mockUser.last_name}`)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockUser.avatar);
    expect(screen.getByLabelText('First Name')).toHaveValue(mockUser.first_name);
    expect(screen.getByLabelText('Last Name')).toHaveValue(mockUser.last_name);
    expect(screen.getByLabelText('Email')).toHaveValue(mockUser.email);
  });

  it('should update user details when input values change', () => {
    const handleUserClickMock = jest.fn();
    render(<UserDetails user={mockUser} handleUserClick={handleUserClickMock} />);

    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');

    const newFirstName = 'Jane';
    const newLastName = 'Doe';
    const newEmail = 'jane.doe@example.com';

    fireEvent.change(firstNameInput, { target: { value: newFirstName } });
    fireEvent.change(lastNameInput, { target: { value: newLastName } });
    fireEvent.change(emailInput, { target: { value: newEmail } });

    expect(firstNameInput).toHaveValue(newFirstName);
    expect(lastNameInput).toHaveValue(newLastName);
    expect(emailInput).toHaveValue(newEmail);
  });

  it('should call handleUserClick when user card is clicked', () => {
    const handleUserClickMock = jest.fn();
    render(<UserDetails user={mockUser} handleUserClick={handleUserClickMock} />);

    fireEvent.click(screen.getByRole('img'));

    expect(handleUserClickMock).toHaveBeenCalledWith(mockUser);
  });
});
