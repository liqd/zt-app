import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { Comment } from '../Comment'
import { testComment } from '../../../tests/TestData'

test('Test Comment Snapshot', () => {
  const { toJSON } = render(<Comment comment={testComment} />)
  expect(toJSON()).toMatchSnapshot()
})

test('Test Comment Toggle Menu', () => {
  let menuItems = null
  const toggleMenu = jest.fn()
  const setDeleteModalItems = jest.fn()
  const setMenuItems = jest.fn((m) => {
    menuItems = m
  })
  const { getByTestId } = render(
    <Comment
      comment={testComment}
      toggleMenu={toggleMenu}
      setMenuItems={setMenuItems}
      setDeleteModalItems={setDeleteModalItems}
    />)
  const menuButton = getByTestId('options_button_' + testComment.id)
  fireEvent.press(menuButton)
  expect(setDeleteModalItems).toBeCalledTimes(1)
  expect(setMenuItems).toBeCalledTimes(1)
  expect(menuItems).toHaveLength(4)
  expect(menuItems[0].title).toEqual('Edit')
  expect(menuItems[0].isAllowed).toBeFalsy()
  expect(menuItems[1].title).toEqual('Delete')
  expect(menuItems[1].isAllowed).toBeFalsy()
  expect(menuItems[2].title).toEqual('Report')
  expect(menuItems[2].isAllowed).toBeTruthy()
  expect(menuItems[2].isLast).toBeTruthy()
  expect(menuItems[3].title).toEqual('Cancel')
  expect(menuItems[3].isAllowed).toBeTruthy()
  expect(menuItems[3].isCancel).toBeTruthy()
  expect(toggleMenu).toBeCalledTimes(1)
})

test('Test Comment Toggle Menu has_changing_permission', () => {
  const canChangeComment = {
    ...testComment,
    user_info: { ...testComment.user_info, has_changing_permission: true }
  }
  let menuItems = null
  const toggleMenu = jest.fn()
  const setDeleteModalItems = jest.fn()
  const setMenuItems = jest.fn((m) => {
    menuItems = m
  })
  const { getByTestId } = render(
    <Comment
      comment={canChangeComment}
      toggleMenu={toggleMenu}
      setMenuItems={setMenuItems}
      setDeleteModalItems={setDeleteModalItems}
    />)
  const menuButton = getByTestId('options_button_' + testComment.id)
  fireEvent.press(menuButton)
  expect(setDeleteModalItems).toBeCalledTimes(1)
  expect(setMenuItems).toBeCalledTimes(1)
  expect(menuItems).toHaveLength(4)
  expect(menuItems[0].title).toEqual('Edit')
  expect(menuItems[0].isAllowed).toBeTruthy()
  expect(menuItems[1].title).toEqual('Delete')
  expect(menuItems[1].isAllowed).toBeFalsy()
  expect(menuItems[2].title).toEqual('Report')
  expect(menuItems[2].isAllowed).toBeTruthy()
  expect(menuItems[2].isLast).toBeTruthy()
  expect(menuItems[3].title).toEqual('Cancel')
  expect(menuItems[3].isAllowed).toBeTruthy()
  expect(menuItems[3].isCancel).toBeTruthy()
  expect(toggleMenu).toBeCalledTimes(1)
})

test('Test Comment Deleted', () => {
  const deletedComment = { ...testComment, is_deleted: true, is_removed: true }
  const { getByText, queryByText } = render(<Comment comment={deletedComment} />)
  expect(getByText(/Deleted by creator on/)).toBeTruthy()
  expect(queryByText(/January 1, 2022/)).toBeFalsy()
})

test('Test Comment Censored', () => {
  const censoredComment = { ...testComment, is_blocked: true, is_censored: true }
  const { getByText, queryByText } = render(<Comment comment={censoredComment} />)
  expect(getByText(/Deleted by moderation on/)).toBeTruthy()
  expect(queryByText(/January 1, 2022/)).toBeFalsy()
})
