import React from 'react'
import { render } from '@testing-library/react-native'

import { TextSourceSans } from '../TextSourceSans.js'

test('Test TextsourceSans no style in props', () => {
  const { toJSON } = render(<TextSourceSans>{'TestText'}</TextSourceSans>)
  expect(toJSON()).toMatchSnapshot()
})

test('Test TextsourceSans no style in props', () => {
  const { toJSON } = render(
    // eslint-disable-next-line react-native/no-inline-styles
    <TextSourceSans style={{ fontSize: 10 }}>{'TestText'}</TextSourceSans>
  )
  expect(toJSON()).toMatchSnapshot()
})
