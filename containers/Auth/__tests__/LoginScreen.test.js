import React from 'react';
import '@testing-library/jest-native/extend-expect';
import { render, waitFor, screen, fireEvent } from '@testing-library/react-native';
import { LoginScreen } from '../LoginScreen';
import API from '../../../BaseApi';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

test('Test LoginScreen Snapshot', () => {
  const { toJSON } = render(<LoginScreen />);
  expect(toJSON()).toMatchSnapshot();
});

test('Test Login, no credentials', async () => {
  render(<LoginScreen />);
  const submitButton = screen.getByRole('button');
  fireEvent(submitButton, 'press');
  const validationErrors = await screen.findAllByText(/Please enter your password/);
  expect(validationErrors).toBeTruthy();
});

test('Test Login, correct credentials', async () => {
  API.postLogin = jest.fn(() => Promise.resolve({
    statusCode: 200,
    data: { token: 'test-token'}
  }));

  render(<LoginScreen />);
  const submitButton = screen.getByRole('button');
  const nameInput = screen.getByTestId('username-input');
  const pwInput = screen.getByTestId('password-input');
  const username = 'testuser';
  const password = 'testPassword';

  fireEvent(nameInput, 'changeText', username);
  expect(nameInput).toHaveProp('value', username);
  fireEvent(pwInput, 'changeText', password);
  expect(pwInput).toHaveProp('value', password);
  fireEvent.press(submitButton);
  await waitFor(() => expect(API.postLogin).toHaveBeenCalledWith({password: password, username: username}));
});
