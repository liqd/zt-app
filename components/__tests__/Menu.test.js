import React from 'react'
import { render } from '@testing-library/react-native'
import { Menu } from '../Menu'

test('Test Menu isVisible false', () => {
  const { toJSON } = render(<Menu isVisible={false} menuItems={[]} />)
  expect(toJSON()).toMatchSnapshot()
})

test('Test Menu isVisible true', () => {
  const { toJSON } = render(<Menu isVisible={true} menuItems={[]} />)
  expect(toJSON()).toMatchSnapshot()
})

test('Test Menu with MenuItems', () => {
  const menuItems = [
    {isCancel: false, isFirst: false, isLast: false, isAllowed: true},
    {isCancel: false, isFirst: false, isLast: false, isAllowed: true, icon: 'check'},
    {isCancel: false, isFirst: false, isLast: false, isAllowed: false},
  ]
  const { toJSON } = render(<Menu isVisible={true} menuItems={menuItems} />)
  expect(toJSON()).toMatchSnapshot()
})
