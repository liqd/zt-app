import React from 'react'
import { render } from '@testing-library/react-native'

import '@testing-library/jest-native/extend-expect'

import { SettingsOverview } from '../SettingsOverview.js'

test('Test SettingsOverview Snapshot', async () => {
  const { toJSON } = render(<SettingsOverview />)
  expect(toJSON()).toMatchSnapshot()
})
