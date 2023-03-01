import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'

import { ButtonAvatar } from '../ButtonAvatar'

test('Test ButtonAvatar Snapshot', () => {
  const { toJSON } = render(<ButtonAvatar />)
  expect(toJSON()).toMatchSnapshot()
})

test('Test ButtonAvatar onPress', () => {
  const onPressMock = jest.fn()
  const { getByRole } = render(<ButtonAvatar onPress={onPressMock} disabled={false} />)
  const button = getByRole('button')
  fireEvent.press(button)
  expect(onPressMock).toHaveBeenCalled()
})

test('Test ButtonAvatar onPress disabled', () => {
  const onPressMock = jest.fn()
  const { getByRole } = render(<ButtonAvatar onPress={onPressMock} disabled={true} />)
  const button = getByRole('button')
  fireEvent.press(button)
  expect(onPressMock).not.toHaveBeenCalled()
})
