import React from 'react'
import { render } from '@testing-library/react-native'

import '@testing-library/jest-native/extend-expect'

import API from '../../../BaseApi'
import { testUser } from '../../../tests/TestData'
import { ProfileScreen } from '../ProfileScreen.js'

test('Test ProfileScreen Snapshot', async () => {
  API.getUser = jest.fn(() =>
    Promise.resolve({
      statusCode: 200,
      data: { ...testUser }
    })
  )
  const route = { params: { userId: 1 } }
  const { findByText, toJSON } = render(<ProfileScreen route={route} />)
  await findByText(testUser.username)
  expect(toJSON()).toMatchSnapshot()
})
