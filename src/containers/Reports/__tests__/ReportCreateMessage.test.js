import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react-native'

import '@testing-library/jest-native/extend-expect'

import { testIdeaAdmin, testText } from '../../../tests/TestData'
import { ReportCreateMessage } from '../ReportCreateMessage'

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

test('Test ReportCreateMessage Snapshot', async () => {
  const route = {
    params: {
      content_type: testIdeaAdmin.content_type,
      object_pk: testIdeaAdmin.pk
    }
  }
  const { toJSON } = render(<ReportCreateMessage route={route} />)
  await screen.findByPlaceholderText(/Add message/)
  expect(toJSON()).toMatchSnapshot()
})

test('Test ReportCreateMessage, no charactures error message', async () => {
  const route = {
    params: {
      content_type: testIdeaAdmin.content_type,
      object_pk: testIdeaAdmin.pk
    }
  }
  render(<ReportCreateMessage route={route} />)
  const submitButton = screen.getByLabelText('Submit')
  fireEvent.press(submitButton)
  const validationErrors = await screen.findByText(
    /Please add a few words explaining why you are reporting this content/
  )
  expect(validationErrors).toBeTruthy()
  expect(submitButton).toBeDisabled()
})

test('Test ReportCreateMessage, too many charectures error message', async () => {
  const route = {
    params: {
      content_type: testIdeaAdmin.content_type,
      object_pk: testIdeaAdmin.pk
    }
  }
  render(<ReportCreateMessage route={route} />)
  const messageInput = await screen.findByPlaceholderText(/Add message/)
  const submitButton = screen.getByLabelText('Submit')
  await act(async () => {
    fireEvent.changeText(messageInput, testText.Lorum1039)
  })
  expect(messageInput).toHaveProp('error', 'Message must be no longer then 1024 characters')
  expect(submitButton).toBeDisabled()
})
