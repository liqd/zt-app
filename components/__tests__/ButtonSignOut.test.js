import React from 'react'
import { render } from '@testing-library/react-native'

import { ButtonSignOut } from '../ButtonSignOut'

test('Test ButtonSignOut', () => {
  const { toJSON } = render(<ButtonSignOut />)
  expect(toJSON()).toMatchSnapshot()
})
