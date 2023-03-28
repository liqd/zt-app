import React from 'react'
import { TouchableOpacity } from 'react-native'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'

import { styles } from './ButtonTextInput.styles'
import { TextSourceSans } from './TextSourceSans'

export const ButtonTextInput = (props) => {
  const arrowRightIcon = <IconSLI name='arrow-right' size={22}/>

  return (
    <TouchableOpacity accessibilityRole="button"
      accessible={true}
      onPress={props.onPress}
      style={styles.textInputButton}
      disabled={props.disabled}
      accessibilityLabel={props.field}
      accessibilityHint={props.fieldHint}
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
