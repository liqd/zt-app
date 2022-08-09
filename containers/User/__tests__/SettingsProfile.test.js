import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react-native'

import '@testing-library/jest-native/extend-expect'

import API from '../../../BaseApi'
import { testUser } from '../../../tests/TestData'
import { SettingsProfile } from '../SettingsProfile.js'

test('Test SettingsOverview Snapshot no user image', () => {
  const route = { params: { userId: testUser.pk, userName: testUser.username, userImage: null } }
  const { toJSON } = render(<SettingsProfile route={route} />)
  expect(toJSON()).toMatchSnapshot()
})

test('Test SettingsOverview, update username', async () => {
  API.editUser = jest.fn(() => Promise.resolve({
    statusCode: 200,
    data: { token: 'test-token' }
  }))
  const route = { params: { userId: testUser.pk, userName: testUser.username, userImage: null } }

  render(<SettingsProfile route={route} />)
  const submitButton = screen.getByText('Save')
  const nameInput = screen.getByLabelText('Username')

  await act(async () => {
    fireEvent.changeText(nameInput, 'newUserName')
    fireEvent.press(submitButton)
  })
  expect(nameInput).toHaveProp('value', 'newUserName')
})

// need to mock FormData? not succeeded so far
// test('Test SettingsOverview, send updated username', async () => {
//   function FormDataMock() {
//     this.append = jest.fn();
//   }
//   global.FormData = FormDataMock
//   API.editUser = jest.fn(() => Promise.resolve({
//     statusCode: 200,
//     data: {
//       token: 'test-token',
//       FormData
//     }
//   }))
//   const route = { params: { userId: testUser.pk, userName: testUser.username, userImage: null } }
//
//   const { getByText, getByLabelText } = render(<SettingsProfile route={route} />)
//   const submitButton = screen.getByText('Save')
//   const nameInput = screen.getByLabelText('Username')
//
//   await act(async () => {
//     fireEvent.changeText(nameInput, 'newUserName')
//     fireEvent.press(submitButton)
//   })
//   expect(nameInput).toHaveProp('value', 'newUserName')
//   await waitFor(() => expect(API.editUser).toHaveBeenCalledWith({name: 'username', value: 'newUserName'}))
// })
