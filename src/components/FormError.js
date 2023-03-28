import React from 'react'
import { StyleSheet } from 'react-native'

import { COLORS } from '../theme/colors'
import { SIZES } from '../theme/fonts'

import { TextSourceSans } from './TextSourceSans'

export const FormError = (props) => {
  const mergedStyles = props.style
    ? [styles.error, props.style]
    : styles.error
  return (
    <TextSourceSans {...props} style={mergedStyles} accessibilityRole="alert">
      {props.children}
    </TextSourceSans>
  )
}

const styles = StyleSheet.create({
  error: {
    fontSize: SIZES.xs,
    color: COLORS.warning
  }
})
