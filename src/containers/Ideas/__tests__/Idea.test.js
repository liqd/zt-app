import React from 'react'
import { act, fireEvent, render, waitFor } from '@testing-library/react-native'

import '@testing-library/jest-native/extend-expect'

import API from '../../../BaseApi'
import { testComment as mockComment, testIdeaAdmin, testModule } from '../../../tests/TestData'
import { Idea } from '../Idea'

jest.mock('../../../BaseApi', () => ({
  __esModule: true,
  default: { getComments: jest.fn(() => Promise.resolve({ statusCode: 200, data: {results: [mockComment] }})) }
}))

test('Test Idea Snapshot', async () => {
  const route = { params: { idea: testIdeaAdmin, module: testModule } }
  const { toJSON, queryByText } = render(<Idea route={route} />)
  await waitFor(() => {
    expect(queryByText(/Lorem ipsum/)).toBeTruthy()
  })
  expect(toJSON()).toMatchSnapshot()
})

test('Test Idea Comment Menu No Permissions', async () => {
  const route = { params: { idea: testIdeaAdmin, module: testModule } }
  const { getByTestId, queryByText } = render(<Idea route={route} />)
  await waitFor(() => {
    expect(queryByText(/Lorem ipsum/)).toBeTruthy()
  })
  const menuButton = getByTestId('options_button_' + mockComment.id)
  fireEvent.press(menuButton)
  expect(queryByText('Edit')).toBeFalsy()
  expect(queryByText('Report')).toBeTruthy()
  expect(queryByText('Delete')).toBeFalsy()
})

test('Test Idea Comment Menu Edit Permissions', async () => {
  API.getComments = jest.fn(() => Promise.resolve({
    statusCode: 200,
    data: {
      results: [{
        ...mockComment,
        user_info: { ...mockComment.user_info, has_changing_permission: true }
      }]
    }
  }))
  const route = { params: { idea: testIdeaAdmin, module: testModule } }
  const { getByTestId, queryByText } = render(<Idea route={route} />)
  await waitFor(() => {
    expect(queryByText(/Lorem ipsum/)).toBeTruthy()
  })
  const menuButton = getByTestId('options_button_' + mockComment.id)
  fireEvent.press(menuButton)
  expect(queryByText('Edit')).toBeTruthy()
  expect(queryByText('Report')).toBeTruthy()
  expect(queryByText('Delete')).toBeFalsy()
})

test('Test Idea Comment Edit', async () => {
  API.getComments = jest.fn(() => Promise.resolve({
    statusCode: 200,
    data: {
      results: [{
        ...mockComment,
        user_info: { ...mockComment.user_info, has_changing_permission: true }
      }]
    }
  }))
  const route = { params: { idea: testIdeaAdmin, module: testModule } }
  const {
    findByText,
    getByPlaceholderText,
    getByTestId,
    getByText,
    queryByText
  } = render(<Idea route={route} />)
  // wait till hooks finished
  const comment = await findByText(/Lorem ipsum/)
  expect(comment).toBeTruthy()
  const commentFormInput = getByPlaceholderText('Enter your comment')
  // text input empty
  expect(commentFormInput).toHaveProp('value', '')
  const menuButton = getByTestId('options_button_' + mockComment.id)
  fireEvent.press(menuButton)
  // menu should be visible
  expect(queryByText('Edit')).toBeTruthy()
  const editButton = getByText('Edit')
  fireEvent.press(editButton)
  // menu should be gone
  expect(queryByText('Edit')).toBeFalsy()
  // text input filled with comment
  expect(commentFormInput).toHaveProp('value', mockComment.comment)
  await act(async () => {
    fireEvent.changeText(commentFormInput, 'This is an edited comment')
  })
  expect(commentFormInput).toHaveProp('value', 'This is an edited comment')
})
