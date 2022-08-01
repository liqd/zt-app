import React from 'react'
import { StyleSheet } from 'react-native'

import { TextSourceSans } from './TextSourceSans'

export const LinkTextSourceSans = (props) => {
  const mergedStyles = props.style
    ? [styles.font, props.style]
    : styles.font
  return (
    <TextSourceSans {...props} style={mergedStyles}>
      {props.children}
    </TextSourceSans>
  )
}

const styles = StyleSheet.create({
  font: {
    textDecorationLine: 'underline',
  }
})
