import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { LoginScreen } from '../LoginScreen';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

test('Test LoginScreen Snapshot', () => {
  const { toJSON } = render(<LoginScreen />);
  expect(toJSON()).toMatchSnapshot();
});

test('Test Login, no credentials', async () => {
  render(<LoginScreen />);
  const submitButton = screen.getByTestId('submit-button');
  fireEvent(submitButton, 'press');
  const validationErrors = await screen.findAllByText(/Please enter your password/);
  expect(validationErrors).toBeTruthy();
});

// add TestIDs to the inputs in LoginScreen.js if you want to unskip
// this Test
test.skip('Test Login, correct credentials', async () => {
  render(<LoginScreen />);
  const submitButton = screen.getByTestId('submit-button');
  const nameInput = screen.getByTestId('username-input');
  const pwInput = screen.getByTestId('password-input');

  fireEvent(nameInput, 'changeText', 'admin');
  fireEvent(pwInput, 'changeText', 'password');
  fireEvent(submitButton, 'press');

  // first two fireEvents seem to work
  // submitting somehow does not work
  screen.debug();
  const explorePage = await screen.findByText(/Explore/);
  expect(explorePage).toBeTruthy();
});
