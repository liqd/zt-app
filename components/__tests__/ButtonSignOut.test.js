import React from 'react'
import { ButtonSignOut } from '../ButtonSignOut'
import { render } from '@testing-library/react-native'

test('Test ButtonSignOut', () => {
  const { toJSON } = render(<ButtonSignOut />)
  expect(toJSON()).toMatchSnapshot()
})
