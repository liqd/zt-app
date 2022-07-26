import React from 'react'
import { View } from 'react-native'
import { styles } from './ProfileScreen.styles'
import { ButtonSignOut } from '../../components/ButtonSignOut'
import { Header } from '../../components/Header'
import { TextSourceSans } from '../../components/TextSourceSans'
import { AvatarCircle } from '../../components/ButtonAvatar'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import { Button } from '@rneui/base'

export const ProfileScreen = (props) => {

  const toSettingsOverview = () => {
    props.navigation.navigate('SettingsOverview', {name: 'Bob'})
  }

  const settingsIcon = <IconSLI name='settings' size={22} />
  const rightHeaderButton = (
    <Button
      icon={settingsIcon}
      type='clear'
      onPress={toSettingsOverview}
    />)

  return (
    <View style={styles.container}>
      <Header
        navigation={props.navigation}
        rightButton={rightHeaderButton}
      />
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
