import React from 'react'
import { StyleSheet } from 'react-native'
import { fireEvent, render } from '@testing-library/react-native'
import { Button } from '@rneui/themed'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import { Header } from '../Header'
import { COLORS } from '../../theme/colors'
import { SIZES } from '../../theme/fonts'
import { SPACINGS } from '../../theme/spacings'
import { styles } from '../../containers/Ideas/IdeaProject.styles'

test('Snapshot Default Header', () => {
  const { toJSON } = render(<Header />)
  expect(toJSON()).toMatchSnapshot()
})

test('Snapshot Default Header Transparent White Arrow', () => {
  const { toJSON } = render(<Header transparent={true} arrowColor={COLORS.paper} />)
  expect(toJSON()).toMatchSnapshot()
})

test('Snapshot Default Header Custom Style', () => {
  const diffStyles = StyleSheet.create({
    backButton: {
      padding: 5,
      marginVertical: 0,
    },
    backButtonText: {
      fontSize: SIZES.md,
      marginHorizontal: SPACINGS.multiplyBy(.25),
      color: COLORS.text,
    }
  })
  const { toJSON } = render(<Header backButtonStyle={diffStyles.backButton} backButtonTextStyle={diffStyles.backButtonText} />)
  expect(toJSON()).toMatchSnapshot()
})

test('Test Custom Header Follow Button Left', () => {
  const plusIcon = <IconSLI name='plus' size={24} color={COLORS.paper} />
  const followButton = (
    <Button
      buttonStyle={styles.button}
      titleStyle={styles.buttonText}
      title='Follow'
      icon={plusIcon}
      type='clear'
    />
  )
  const { getByText, queryByText } = render(<Header leftButton={followButton} />)
  const fb = getByText(/Follow/)
  expect(fb).toBeTruthy()
  const backButton = queryByText(/Back/)
  expect(backButton).toBeFalsy()
})

test('Test Custom Header Follow Button Right', () => {
  const plusIcon = <IconSLI name='plus' size={24} color={COLORS.paper} />
  const followButton = (
    <Button
      buttonStyle={styles.button}
      titleStyle={styles.buttonText}
      title='Follow'
      icon={plusIcon}
      type='clear'
    />
  )
  const { getByText } = render(<Header rightButton={followButton} />)
  const fb = getByText(/Follow/)
  expect(fb).toBeTruthy()
  const backButton = getByText(/Back/)
  expect(backButton).toBeTruthy()
})

test('Test Header Back Button', async () => {
  const navigation = { goBack: jest.fn()}
  const { findByText } = render(<Header navigation={navigation} />)
  const backButton = await findByText('Back')
  fireEvent.press(backButton)
  expect(navigation.goBack).toHaveBeenCalled()
})

test('Test Header Back Button Editing', async () => {
  const toggleEditing = jest.fn()
  const { findByText } = render(<Header isEditing={true} toggleEditing={toggleEditing} />)
  const backButton = await findByText('Back')
  fireEvent.press(backButton)
  expect(toggleEditing).toHaveBeenCalled()
})

test('Test Custom Header Follow Button Right', async () => {
  const plusIcon = <IconSLI name='plus' size={24} color={COLORS.paper} />
  const handleFollow = jest.fn()
  const followButton = (
    <Button
      buttonStyle={styles.button}
      titleStyle={styles.buttonText}
      title='Follow'
      icon={plusIcon}
      type='clear'
      onPress={handleFollow}
    />
  )
  const { findByText } = render(<Header rightButton={followButton} />)
  const fb = await findByText(/Follow/)
  fireEvent.press(fb)
  expect(handleFollow).toHaveBeenCalled()
})
