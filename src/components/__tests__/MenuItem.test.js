import React from 'react'
import { render } from '@testing-library/react-native'

import { MenuItem } from '../MenuItem'

test('Test MenuItem notAllowed', () => {
  const { toJSON} = render(
    <MenuItem
      item={{isCancel: false, isFirst: false, isLast: false, isAllowed: false}}
    />)
  expect(toJSON()).toBe(null)
})

// Snapshot tests
test('Test MenuItem isAllowed', () => {
  const { toJSON} = render(
    <MenuItem
      item={{isCancel: false, isFirst: false, isLast: false, isAllowed: true}}
    />)
  expect(toJSON()).toMatchSnapshot()
})

test('Test MenuItem isAllowed with Icon', () => {
  const { toJSON} = render(
    <MenuItem
      item={{isCancel: false, isFirst: false, isLast: false, isAllowed: true, icon: 'check'}}
    />)
  expect(toJSON()).toMatchSnapshot()
})

test('Test MenuItem isAllowed isCancel', () => {
  const { toJSON} = render(
    <MenuItem
      item={{isCancel: true, isFirst: false, isLast: false, isAllowed: true}}
    />)
  expect(toJSON()).toMatchSnapshot()
})

test('Test MenuItem isAllowed isFirst', () => {
  const { toJSON} = render(
    <MenuItem
      item={{isCancel: false, isFirst: true, isLast: false, isAllowed: true}}
    />)
  expect(toJSON()).toMatchSnapshot()
})

test('Test MenuItem isAllowed isLast', () => {
  const { toJSON} = render(
    <MenuItem
      item={{isCancel: false, isFirst: false, isLast: true, isAllowed: true}}
    />)
  expect(toJSON()).toMatchSnapshot()
})

test('Test MenuItem isAllowed isFirst and isLast', () => {
  const { toJSON} = render(
    <MenuItem
      item={{isCancel: false, isFirst: true, isLast: true, isAllowed: true}}
    />)
  expect(toJSON()).toMatchSnapshot()
})
