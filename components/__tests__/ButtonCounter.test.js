import React from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { render } from '@testing-library/react-native'

import { ButtonCounter } from '../ButtonCounter'

test('Test ButtonCounter', () => {
  const { getByText, toJSON } = render(
    <ButtonCounter
      disabled={false}
      highlight={0}
      counter={0}
      icon={<Icon name="check" />}
    />
  )
  expect(toJSON()).toMatchSnapshot()
  expect(getByText('0')).toBeTruthy()
})

test('Test ButtonCounter 10', () => {
  const { getByText, toJSON } = render(
    <ButtonCounter
      disabled={false}
      highlight={0}
      counter={10}
      icon={<Icon name="check" />}
    />
  )
  expect(toJSON()).toMatchSnapshot()
  expect(getByText('10')).toBeTruthy()
})

test('Test ButtonCounter random value', () => {
  const rand = Math.floor(Math.random() * 100)
  const { getByText } = render(
    <ButtonCounter
      disabled={false}
      highlight={0}
      counter={rand}
      icon={<Icon name="check" />}
    />
  )
  expect(getByText(`${rand}`)).toBeTruthy()
})

test('Test ButtonCounter disabled', () => {
  const { getByText, toJSON } = render(
    <ButtonCounter
      disabled={true}
      highlight={0}
      counter={0}
      icon={<Icon name="check" />}
    />
  )
  expect(toJSON()).toMatchSnapshot()
  expect(getByText('0')).toBeTruthy()
})

test('Test ButtonCounter highlight', () => {
  const { getByText, toJSON } = render(
    <ButtonCounter
      disabled={false}
      highlight={1}
      counter={0}
      icon={<Icon name="check" />}
    />
  )
  expect(toJSON()).toMatchSnapshot()
  expect(getByText('0')).toBeTruthy()
})

test('Test ButtonCounter highlight 10', () => {
  const { getByText, toJSON } = render(
    <ButtonCounter
      disabled={false}
      highlight={10}
      counter={0}
      icon={<Icon name="check" />}
    />
  )
  expect(toJSON()).toMatchSnapshot()
  expect(getByText('0')).toBeTruthy()
})
