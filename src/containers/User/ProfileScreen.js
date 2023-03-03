import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import { Button } from '@rneui/base'

import { AvatarCircle } from '../../components/ButtonAvatar'
import { ButtonSignOut } from '../../components/ButtonSignOut'
import { Header } from '../../components/Header'
import { TextSourceSans } from '../../components/TextSourceSans'
import { useUser } from '../../hooks/User'

import { styles } from './ProfileScreen.styles'

export const ProfileScreen = (props) => {
  const toSettingsOverview = () => {
    props.navigation.navigate('SettingsOverview', {
      userName: user.username,
      userImage: user.user_image})
  }

  const {userId, userName, userImage} = props.route.params

  const settingsIcon = <IconSLI name='settings' size={30} />
  const rightHeaderButton = (
    <Button
      icon={settingsIcon}
      type='clear'
      onPress={toSettingsOverview}
    />)
  const user = useUser(userId)

  return (
    <SafeAreaView
      style={styles.safeAreaContainer}
    >
      <View style={styles.container}>
        <Header
          navigation={props.navigation}
          rightButton={user && user.is_self && rightHeaderButton}
        />
        <View style={styles.containerInner}>
          <AvatarCircle
            imgSource={userImage ? {uri: userImage} :user && {uri: (user.user_image) ? user.user_image : user.user_image_fallback}}
            avatarStyles={styles.avatarStyles}
          />
          <TextSourceSans>
            {userName ? userName : user && user.username}
          </TextSourceSans>
        </View>
        {user && user.is_self &&
        <ButtonSignOut />
        }
      </View>
    </SafeAreaView>
  )
}
