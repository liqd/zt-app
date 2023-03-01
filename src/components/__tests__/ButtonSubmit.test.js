import React from 'react'
import { fireEvent,render } from '@testing-library/react-native'

import { ButtonSubmit } from '../ButtonSubmit'

test('Test ButtonSubmit', () => {
  const { getByText, toJSON } = render(
    <ButtonSubmit title="TestTitle" disabled={false} />
  )
  expect(toJSON()).toMatchSnapshot()
  expect(getByText('TestTitle')).toBeTruthy()
})

test('Test ButtonSubmit onPress', async () => {
  const onPress = jest.fn(() => {})
  const { getByText } = render(
    <ButtonSubmit title="TestTitle" onPress={onPress} disabled={false} />
  )
  fireEvent(getByText('TestTitle'), 'onPress')
  expect(onPress).toBeCalled()
})

test('Test ButtonSubmit onPress disabled', async () => {
  const onPress = jest.fn(() => {})
  const { getByText } = render(
    <ButtonSubmit title="TestTitle" onPress={onPress} disabled={true} />
  )
  fireEvent(getByText('TestTitle'), 'onPress')
  expect(onPress).not.toBeCalled()
})
