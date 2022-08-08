import React from 'react'
import { render, act } from '@testing-library/react-native'

import '@testing-library/jest-native/extend-expect'

import { testUser } from '../../../tests/TestData'
import { SettingsProfile } from '../SettingsProfile.js'

test('Test SettingsOverview Snapshot', async () => {
  const route = { params: { userId: testUser.pk, userName: testUser.username, userImage: null } }
  const { toJSON } = act(() =>{
    render(<SettingsProfile route={route} />)
  })
  expect(toJSON()).toMatchSnapshot()
})
