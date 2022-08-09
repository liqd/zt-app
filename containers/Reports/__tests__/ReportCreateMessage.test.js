import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native'

import '@testing-library/jest-native/extend-expect'

import { testIdeaAdmin, testText } from '../../../tests/TestData'
import { ReportCreateMessage } from '../ReportCreateMessage'

test('Test ReportCreateMessage Snapshot', () => {
  const route = { params: {
    content_type: testIdeaAdmin.content_type,
    object_pk: testIdeaAdmin.pk
  }}
  const { toJSON } = render(<ReportCreateMessage route={route}/>)
  expect(toJSON()).toMatchSnapshot()
})

test('Test ReportCreateMessage, no charactures error message', async () => {
  const route = { params: {
    content_type: testIdeaAdmin.content_type,
    object_pk: testIdeaAdmin.pk
  }}
  const description = ''
  render(<ReportCreateMessage route={route} description={description}/>)
  const submitButton = screen.getByLabelText('Submit')
  fireEvent(submitButton, 'press')
  const validationErrors = await screen.findAllByText(
    /Please add a few words explaining why you are reporting this content/
  )
  expect(validationErrors).toBeTruthy()
})

test('Test ReportCreateMessage, too many charectures error message', async () => {
  const route = { params: {
    content_type: testIdeaAdmin.content_type,
    object_pk: testIdeaAdmin.pk
  }}
  const description = testText.Lorum1039
  render(<ReportCreateMessage route={route} description={description}/>)
  const submitButton = screen.getByLabelText('Submit')
  fireEvent(submitButton, 'press')
  const validationErrors = await screen.queryAllByText(
    /Message must be no longer then 1024 characters/
  )
  expect(validationErrors).toBeTruthy()
})

// button not disabled
// test('Test ReportCreateMessage, no charactures button disabled', async () => {
//   const route = { params: {
//     content_type: testIdeaAdmin.content_type,
//     object_pk: testIdeaAdmin.pk
//   }}
//   const description = ''
//   render(<ReportCreateMessage route={route} description={description}/>)
//   const submitButton = screen.getByLabelText('Submit')
//   console.log(submitButton);
//
//   expect(submitButton).toBeDisabled()
// })

// test('Test ReportCreateMessage, too many charactures button disabled', async () => {
//   const route = { params: {
//     content_type: testIdeaAdmin.content_type,
//     object_pk: testIdeaAdmin.pk
//   }}
//   const description = testText.Lorum1039
//   render(<ReportCreateMessage route={route} description={description}/>)
//   const submitButton = screen.getByLabelText('Submit')
//   expect(submitButton).toBeDisabled()
// })
