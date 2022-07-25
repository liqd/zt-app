import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { styles } from './ButtonAvatar.styles'

export const AvatarCircle = (props) => {
  return (
    <Image
      accessibilityIgnoresInvertColors={true}
      style={[styles.imageCircle, props.avatarSize]}
      source={props.imgSource}
    />
  )
}

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
      <AvatarCircle/>
    </TouchableOpacity>
  )
}
