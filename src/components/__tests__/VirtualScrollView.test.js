import React from 'react'
import { render } from '@testing-library/react-native'

import { TextSourceSans } from '../TextSourceSans'
import { VirtualScrollView } from '../VirtualScrollView'

describe('VirtualScrollView', () => {
  it('should render the children as ListHeaderComponent', () => {
    const { getByText } = render(
      <VirtualScrollView>
        <TextSourceSans>This is a title</TextSourceSans>
      </VirtualScrollView>,
    )

    expect(getByText('This is a title')).toBeTruthy()
  })
})
