import React from 'react'
import { render } from '@testing-library/react-native'

import '@testing-library/jest-native/extend-expect'

import { testUser } from '../../../tests/TestData'
import { ProfileScreen } from '../ProfileScreen.js'

const mockUser = testUser

jest.mock('../../../hooks/User', () => ({
  __esModule: true,
  useUser: () => mockUser
}))

test('Test ProfileScreen Snapshot', async () => {
  const route = { params: { userId: 1 } }
  const { findByText, toJSON } = render(<ProfileScreen route={route} />)
  await findByText(testUser.username)
  expect(toJSON()).toMatchSnapshot()
})
