import React from 'react'
import { Pressable, View } from 'react-native'

import { styles } from './ButtonCounter.styles'
import { TextSourceSans } from './TextSourceSans'

export const ButtonCounter = (props) => {
  let btnStyle
  let textStyle
  if (props.disabled) {
    textStyle = [styles.text, styles.disableStyle]
  } else {
    if (props.counter === 0) {
      btnStyle = styles.btn
      textStyle = styles.text
    } else {
      if (props.rating === 'pos') {
        btnStyle = styles.btn
        textStyle = [styles.text, styles.ratedUp]
        if (props.highlight) {
          btnStyle = [styles.btn, styles.highlightUp]
          textStyle = [styles.text, styles.ratedUp]
        }
      } else if (props.rating === 'neg') {
        btnStyle = styles.btn
        textStyle = [styles.text, styles.ratedDown]
        if (props.highlight) {
          btnStyle = [styles.btn, styles.highlightDown]
          textStyle = [styles.text, styles.ratedDown]
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={btnStyle}
        onPress={props.onPress}
        accessibilityLabel={props.labelText}
        accessibilityHint={props.hintText}
        disabled={props.disabled}
      >
        <TextSourceSans style={textStyle}>
          {props.counter}
          {props.icon}
        </TextSourceSans>
      </Pressable>
    </View>
  )
}
