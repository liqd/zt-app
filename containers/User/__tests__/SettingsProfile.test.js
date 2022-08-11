import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native'

import '@testing-library/jest-native/extend-expect'

import API from '../../../BaseApi'
import { testToken, testUser } from '../../../tests/TestData'
import { SettingsProfile } from '../SettingsProfile.js'

global.FormData = require('FormData')

test('Test SettingsOverview Snapshot no user image', async () => {
  const route = { params: { userId: testUser.pk, userName: testUser.username, userImage: null } }
  const { toJSON, queryByText } = render(<SettingsProfile route={route} />)
  await waitFor(() => {
    expect(queryByText(/Username/)).toBeTruthy()
  })
  expect(toJSON()).toMatchSnapshot()
})

test('Test SettingsOverview, change username', async () => {
  const route = { params: { userId: testUser.pk, userName: testUser.username, userImage: null } }

  render(<SettingsProfile route={route} />)
  const nameInput = await screen.findByPlaceholderText(testUser.username)

  await act(async () => {
    fireEvent.changeText(nameInput, 'newUserName')
  })
  expect(nameInput).toHaveProp('value', 'newUserName')
})

test('Test SettingsOverview, send updated username', async () => {
  const formData = new FormData()
  formData.append('username', 'newUserName')
  API.editUser = jest.fn(() =>
    Promise.resolve({
      statusCode: 200
    })
  )
  const route = { params: { userId: testUser.pk, userName: testUser.username, userImage: null } }

  render(<SettingsProfile route={route} />)
  const nameInput = await screen.findByPlaceholderText(testUser.username)
  const submitButton = screen.getByText('Save')
  await act(async () => {
    fireEvent.changeText(nameInput, 'newUserName')
  })
  expect(nameInput).toHaveProp('value', 'newUserName')
  await act(async () => {
    fireEvent.press(submitButton)
  })
  expect(API.editUser).toHaveBeenCalledWith(formData, testToken)
})
