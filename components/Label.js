import React from 'react'
import { View } from 'react-native'
import { styles } from './Label.styles'
import { TextSourceSans } from './TextSourceSans'

export const Label = (props) => {
  return (
    <View style={styles.label}>
      <TextSourceSans style={styles.text}>{props.title}</TextSourceSans>
    </View>
  )
}
