import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import { Button } from '@rneui/base'

import { AvatarCircle } from '../../components/ButtonAvatar'
import { ButtonSignOut } from '../../components/ButtonSignOut'
import { Header } from '../../components/Header'
import { StatusBarStyled } from '../../components/StatusBarStyled'
import { TextSourceSans } from '../../components/TextSourceSans'
import { ProfileContext } from '../../contexts/ProfileContext'
import { useUser } from '../../hooks/User'

import { styles } from './ProfileScreen.styles'

export const ProfileScreen = (props) => {
  const toSettingsOverview = () => {
    props.navigation.navigate('SettingsOverview')
  }

  const [profileContext] = useContext(ProfileContext)
  const { t } = useTranslation()

  const settingsIcon = <IconSLI name='settings' size={30} />
  const rightHeaderButton = (
    <Button
      icon={settingsIcon}
      type='clear'
      onPress={toSettingsOverview}
      accessibilityLabel={t('Click to navigate to your profile settings')}
      accessibilityHint={t('Click to navigate to update your profile settings')}
    />)

  const user = useUser(profileContext?.userId)

  return (
    <SafeAreaView
      style={styles.safeAreaContainer}
    >
      <StatusBarStyled />
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
