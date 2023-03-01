import React from 'react'
import { Image,TouchableOpacity } from 'react-native'

import { styles } from './ButtonAvatar.styles'
import { TextSourceSans } from './TextSourceSans'

export const AvatarCircle = (props) => {
  return (
    <Image
      accessibilityIgnoresInvertColors={true}
      style={[styles.imageCircle, props.avatarStyles]}
      source={props.imgSource}
    />
  )
}

export const ButtonAvatar = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      accessibilityLabel={props.a11yLabelText}
      accessibilityHint={props.a11yHintText}
      accessibilityRole="button"
      disabled={props.disabled}
    >
      <AvatarCircle
        imgSource={props.imgSource}
        avatarStyles={props.avatarStyles}
      />
      {props.children &&
        <TextSourceSans>{props.children}</TextSourceSans>
      }
    </TouchableOpacity>
  )
}
