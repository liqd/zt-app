import React from 'react'
import { View } from 'react-native'
import { styles } from './ProfileScreen.styles'

import { ButtonSignOut } from '../../components/ButtonSignOut'
import { Header } from '../../components/Header'
import { TextSourceSans } from '../../components/TextSourceSans'
import { AvatarCircle } from '../../components/ButtonAvatar'

export const ProfileScreen = (props) => {
  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      <View style={styles.containerInner}>
        <AvatarCircle avatarSize={styles.avatarSize}></AvatarCircle>
        <TextSourceSans>
            UserName
        </TextSourceSans>
      </View>
      <ButtonSignOut></ButtonSignOut>
    </View>
  )
}
