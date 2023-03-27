import React from 'react'
import { Pressable, View } from 'react-native'

import { styles } from './ButtonCounter.styles'
import { TextSourceSans } from './TextSourceSans'

export const ButtonCounter = (props) => {
  const listStyle = [styles.baseText, styles.disableText, styles.listText]
  let btnStyle
  let textStyle
  if (props.disabled) {
    btnStyle = styles.btn
    textStyle = [styles.baseText, styles.disableText]
  } else {
    if (props.counter === 0) {
      btnStyle = styles.btn
      textStyle = styles.baseText
    } else {
      if (props.rating === 'pos') {
        btnStyle = styles.btn
        textStyle = [styles.baseText, styles.ratedUp]
        if (props.highlight) {
          btnStyle = [styles.btn, styles.highlightUp]
          textStyle = [styles.baseText, styles.ratedUp]
        }
      } else if (props.rating === 'neg') {
        btnStyle = styles.btn
        textStyle = [styles.baseText, styles.ratedDown]
        if (props.highlight) {
          btnStyle = [styles.btn, styles.highlightDown]
          textStyle = [styles.baseText, styles.ratedDown]
        }
      }
    }
  }

  return (props.list ?
    <View style={styles.container}>
      <TextSourceSans style={listStyle}>
        {props.counter}
      </TextSourceSans>
      <TextSourceSans style={listStyle}>
        {props.icon}
      </TextSourceSans>
    </View>
    :
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
        </TextSourceSans>
        <TextSourceSans style={textStyle}>
          {props.icon}
        </TextSourceSans>
      </Pressable>
    </View>
  )
}
