import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native'

import '@testing-library/jest-native/extend-expect'

import API from '../../../BaseApi'
import { ProfileContext } from '../../../contexts/ProfileContext'
import { testUser } from '../../../tests/TestData'
import { SettingsProfile } from '../SettingsProfile.js'

test('Test SettingsOverview Snapshot no user image', async () => {
  const { toJSON, queryByText } = render(
    <ProfileContext.Provider value={[{
      userId: testUser.pk,
      userName: testUser.username,
      userImage: null
    }]}>
      <SettingsProfile />
    </ProfileContext.Provider>
  )
  await waitFor(() => {
    expect(queryByText(/Username/)).toBeTruthy()
  })
  expect(toJSON()).toMatchSnapshot()
})

test('Test SettingsOverview, change username', async () => {
  render(
    <ProfileContext.Provider value={[{
      userId: testUser.pk,
      userName: testUser.username,
      userImage: null
    }]}>
      <SettingsProfile />
    </ProfileContext.Provider>
  )
  const nameInput = await screen.findByPlaceholderText(testUser.username)

  await act(async () => {
    fireEvent.changeText(nameInput, 'newUserName')
  })
  expect(nameInput).toHaveProp('value', 'newUserName')
})

xtest('Test SettingsOverview, send updated username', async () => {
  const mockAppend = jest.fn()
  function FormDataMock() {
    this.append = mockAppend
  }
  global.FormData = FormDataMock

  API.editUser = jest.fn(() =>
    Promise.resolve({
      statusCode: 200
    })
  )
  render(
    <ProfileContext.Provider value={[{
      userId: testUser.pk,
      userName: testUser.username,
      userImage: null
    }]}>
      <SettingsProfile />
    </ProfileContext.Provider>
  )

  const nameInput = await screen.findByPlaceholderText(testUser.username)
  const submitButton = screen.getByText('Save')
  await act(async () => {
    fireEvent.changeText(nameInput, 'newUserName')
  })
  expect(nameInput).toHaveProp('value', 'newUserName')
  await act(async () => {
    fireEvent.press(submitButton)
  })
  expect(API.editUser).toHaveBeenCalled()
  expect(mockAppend).toHaveBeenCalledWith('username', 'newUserName')
})
