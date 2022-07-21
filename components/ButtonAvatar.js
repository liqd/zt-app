import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { styles } from './ButtonAvatar.styles'

export const ButtonAvatar = (props) => {

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      accessibilityLabel={props.labelText}
      accessibilityHint={props.hintText}
      accessibilityRole="button"
      disabled={props.disabled}
    >
      <Image
        accessibilityIgnoresInvertColors={true}
        style={styles.imageCircle}
        source={props.imgSource}
      />
    </TouchableOpacity>
  )
}
