import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'

import { styles } from './ButtonTextInput.styles'
import { FormLabel } from './FormLabel'
import { TextSourceSans } from './TextSourceSans'

export const ButtonTextInputFieldContainer = (props) => {
  return (
    <View>
      <FormLabel>{props.field}</FormLabel>
      {props.children}
    </View>
  )
}

export const ButtonTextInput = (props) => {
  const arrowRightIcon = <IconSLI name='arrow-right' size={22}/>

  return (
    <TouchableOpacity accessibilityRole="button"
      onPress={props.onPress}
      style={styles.textInputButton}
      disabled={props.disabled}
    >
      <TextSourceSans style={[props.textInputButtonTitle, styles.textInputButtonTitleBase]} numberOfLines={1}>
        {props.title}
      </TextSourceSans>
      <TextSourceSans style={[props.textInputButtonTitle, styles.textInputButtonTitleBase]}>
        {arrowRightIcon}
      </TextSourceSans>
    </TouchableOpacity>
  )
}
