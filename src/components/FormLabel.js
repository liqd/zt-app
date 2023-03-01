import React from 'react'
import { StyleSheet } from 'react-native'

import { LINEHEIGHTS, SIZES } from '../theme/fonts'
import { SPACINGS } from '../theme/spacings'

import { TextSourceSans } from './TextSourceSans'

export const FormLabel = (props) => {
  const mergedStyles = props.style
    ? [styles.label, props.style]
    : styles.label
  return (
    <TextSourceSans {...props} style={mergedStyles}>
      {props.children}
    </TextSourceSans>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: SIZES.sm,
    lineHeight: LINEHEIGHTS.sm,
    paddingTop: SPACINGS.multiplyBy(1.5),
    paddingBottom: SPACINGS.multiplyBy(.25),
    width: '100%'
  }
})
