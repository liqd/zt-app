import React from 'react'
import { render } from '@testing-library/react-native'

import { Modal } from '../Modal'

test('Test Modal isVisible false', () => {
  const { toJSON} = render(<Modal isVisible={false} modalItems={[]} />)
  expect(toJSON()).toMatchSnapshot()
})

test('Test Modal isVisible true', () => {
  const { toJSON} = render(<Modal isVisible={true} modalItems={[]} />)
  expect(toJSON()).toMatchSnapshot()
})

test('Test Modal with ModalItems', () => {
  const modalItems = [
    {isCancel: false, isText: false},
    {isCancel: false, isText: false, action: () => {}},
    {isCancel: true, isText: false},
    {isCancel: false, isText: true},
    {isCancel: true, isText: true},
  ]
  const { toJSON} = render(<Modal isVisible={true} modalItems={modalItems} />)
  expect(toJSON()).toMatchSnapshot()
})
