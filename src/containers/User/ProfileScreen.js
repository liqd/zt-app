import React, { useContext } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import { Button } from '@rneui/base'

import { AvatarCircle } from '../../components/ButtonAvatar'
import { ButtonSignOut } from '../../components/ButtonSignOut'
import { Header } from '../../components/Header'
import { TextSourceSans } from '../../components/TextSourceSans'
import { ProfileContext } from '../../contexts/ProfileContext'
import { useUser } from '../../hooks/User'

import { styles } from './ProfileScreen.styles'

export const ProfileScreen = (props) => {
  const toSettingsOverview = () => {
    props.navigation.navigate('SettingsOverview')
  }

  const [profileContext] = useContext(ProfileContext)

  const settingsIcon = <IconSLI name='settings' size={30} />
  const rightHeaderButton = (
    <Button
      icon={settingsIcon}
      type='clear'
      onPress={toSettingsOverview}
    />)

  const user = useUser(profileContext?.userId)

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
            imgSource={{uri:
              profileContext?.userImage?.uri ||
              profileContext?.userImageFallback?.uri
            }}
            avatarStyles={styles.avatarStyles}
          />
          <TextSourceSans>
            {profileContext?.userName}
          </TextSourceSans>
        </View>
        {user && user.is_self &&
        <ButtonSignOut />
        }
      </View>
    </SafeAreaView>
  )
}
