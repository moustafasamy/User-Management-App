import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Main from './Main';
import { jest } from '@jest/globals';

jest.mock('axios');

describe('Main component', () => {
  it('renders the user management title', async () => {
    render(<Main />);
    const titleElement = await screen.findByText(/User Management/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders a list of users', async () => {
    const mockUsers = {
      data: [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          avatar: 'https://r...content-available-to-author-only...s.in/img/faces/1-image.jpg',
        },
        {
          id: 2,
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane.doe@example.com',
          avatar: 'https://r...content-available-to-author-only...s.in/img/faces/2-image.jpg',
        },
      ],
    };
    (axios.get as jest.Mock).mockResolvedValue(mockUsers);

    render(<Main />);

    const userElements = await screen.findAllByRole('button', { name: /John Doe|Jane Doe/i });
    expect(userElements).toHaveLength(2);
  });

  it('displays user details when a user is clicked', async () => {
    const mockUser = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      avatar: 'https://r...content-available-to-author-only...s.in/img/faces/1-image.jpg',
    };
    (axios.get as jest.Mock).mockResolvedValue(mockUser);
    render(<Main />);

    const userElement = await screen.findByRole('button', { name: /John Doe/i });
    fireEvent.click(userElement);

    const userDetailsElement = await screen.findByText(/john.doe@example.com/i);
    expect(userDetailsElement).toBeInTheDocument();
  });

  it('displays the Add User form when the Add User button is clicked', async () => {
    render(<Main />);

    const addUserButtonElement = await screen.findByRole('button', { name: /Add User/i });
    fireEvent.click(addUserButtonElement);

    const addUserFormElement = await screen.findByRole('form', { name: /Add User/i });
    expect(addUserFormElement).toBeInTheDocument();
  });
});
