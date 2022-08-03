import React from 'react'
import { render } from '@testing-library/react-native'

import '@testing-library/jest-native/extend-expect'

import { SettingsProfile } from '../SettingsProfile.js'

test('Test SettingsOverview Snapshot', async () => {
  const { toJSON } = render(<SettingsProfile name="TestUser" />)
  expect(toJSON()).toMatchSnapshot()
})
