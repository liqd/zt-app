import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'

import { ListLink } from '../List'

test('Test ListLink Snapshot', () => {
  const { toJSON } = render(<ListLink />)
  expect(toJSON()).toMatchSnapshot()
})

test('Test ListLink onPress', () => {
  const onPressMock = jest.fn()
  const { getByRole } = render(<ListLink onPress={onPressMock} disabled={false} />)
  const button = getByRole('button')
  fireEvent.press(button)
  expect(onPressMock).toHaveBeenCalled()
})

test('Test ListLink onPress disabled', () => {
  const onPressMock = jest.fn()
  const { getByRole } = render(<ListLink onPress={onPressMock} disabled={true} />)
  const button = getByRole('button')
  fireEvent.press(button)
  expect(onPressMock).not.toHaveBeenCalled()
})
