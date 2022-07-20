import React from 'react'
import { render } from '@testing-library/react-native'
import { Label } from '../Label'

test('Test Label', () => {
  const { toJSON } = render(<Label title="TestTitle" />)
  expect(toJSON()).toMatchSnapshot()
})
