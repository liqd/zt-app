import React from 'react'
import { fireEvent,render } from '@testing-library/react-native'

import { ButtonTextInput } from '../ButtonTextInput'

describe('ButtonTextInput', () => {
  const mockOnPress = jest.fn()

  it('renders correctly', () => {
    const { getByText } = render(
      <ButtonTextInput
        title='Button title'
        onPress={mockOnPress}
        disabled={false}
        textInputButtonTitle={{ color: 'black' }}
      />
    )

    const titleText = getByText('Button title')

    expect(titleText).toBeTruthy()
  })

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <ButtonTextInput
        title='Button title'
        onPress={mockOnPress}
        disabled={false}
        textInputButtonTitle={{ color: 'black' }}
      />
    )

    const button = getByText('Button title')

    fireEvent.press(button)

    expect(mockOnPress).toHaveBeenCalled()
  })
})
