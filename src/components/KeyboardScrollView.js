import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

import { ButtonSubmit } from './ButtonSubmit'
import { styles } from './KeyboardScrollView.styles'

export const KeyboardScrollView = (props) => {

  const buttonText = props.buttonText
    ? props.buttonText
    : 'Add'

  const defaultBehavior = Platform.OS === 'ios'
    ? 'padding'
    : null

  const defaultVerticalOffset = props.keyboardVerticalOffset
    ? props.keyboardVerticalOffset
    : 0

  const behavior = props.behavior
    ? props.behavior
    : defaultBehavior

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      keyboardVerticalOffset={defaultVerticalOffset}
      style={styles.flexContainerKeyboard}
    >
      <ScrollView
        style={styles.flexContainerScroll}
      >
        {props.children}
      </ScrollView>
      <ButtonSubmit
        title={buttonText}
        onPress={props.handleSubmit}
        disabled={!props.isValid}
        loading={props.pending}
      />
    </KeyboardAvoidingView>
  )
}
