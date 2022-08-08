import React from 'react'
import { fireEvent,render, screen, waitFor } from '@testing-library/react-native'

import '@testing-library/jest-native/extend-expect'

import { testIdeaAdmin } from '../../../tests/TestData'
import { ReportCreateMessage } from '../ReportCreateMessage'

test('Test ReportCreateMessage Snapshot', () => {
  const route = { params: {
    content_type: testIdeaAdmin.content_type,
    object_pk: testIdeaAdmin.pk
  }}
  const { toJSON } = render(<ReportCreateMessage />)
  expect(toJSON()).toMatchSnapshot()
})

test('Send report, too many chars', async () => {
  render(<ReportCreateMessage />)
  const submitButton = screen.getByRole('button')
  fireEvent(submitButton, 'press')
  const validationErrors = await screen.findAllByText(/Message must be no longer then 1024 characters/)
  expect(validationErrors).toBeTruthy()
})
