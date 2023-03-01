import React from 'react'
import { render } from '@testing-library/react-native'

import '@testing-library/jest-native/extend-expect'

import { testUser } from '../../../tests/TestData'
import { SettingsOverview } from '../SettingsOverview.js'

test('Test SettingsOverview Snapshot', async () => {
  const route = { params: { userId: testUser.pk, userName: testUser.username, userImage: null } }
  const { toJSON } = render(<SettingsOverview route={route} />)
  expect(toJSON()).toMatchSnapshot()
})
