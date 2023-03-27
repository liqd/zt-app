import React from 'react'
import { render } from '@testing-library/react-native'

import { ImagePickerFormField } from '../ImagePickerFormField'

jest.mock('expo-device', () => ({
  brand: 'Apple',
  isDevice: true,
}))

jest.mock('expo-image-picker', () => ({
  launchCameraAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  requestCameraPermissionsAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
}))

jest.mock('../../hooks/useImageResize', () => ({
  useImageResize: () => [null, jest.fn()],
}))

describe('ImagePickerFormField', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders the component with camera and library buttons when there is no initial image', () => {
    const onSetImageMock = jest.fn()
    const { getByText } = render(
      <ImagePickerFormField initialImage={null} onSetImage={onSetImageMock} />
    )

    expect(getByText('Camera')).toBeTruthy()
    expect(getByText('Library')).toBeTruthy()
  })

  it('renders the component with an image preview when an initial image is provided', () => {
    const onSetImageMock = jest.fn()
    const { getByLabelText } = render(
      <ImagePickerFormField
        initialImage="https://via.placeholder.com/150"
        onSetImage={onSetImageMock}
        imagePreview={true}
      />
    )

    expect(getByLabelText('Remove image')).toBeTruthy()
  })
})
