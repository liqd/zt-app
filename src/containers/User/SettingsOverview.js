import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '../../components/Header'
import { ListContainer, ListLink } from '../../components/List'

export const SettingsOverview = (props) => {
  const { t } = useTranslation()
  // Pass fetched data forward
  const toProfileSettings = () => {
    props.navigation.navigate('SettingsProfile', {
      userName: userName,
      userImage: userImage
    })
  }

  // Pass updated info back
  const toProfileScreen = () => {
    props.navigation.navigate({
      name: 'ProfileScreen',
      params: {
        userName: userName,
        userImage: userImage
      },
      merge: true,
    })
  }

  const {userName, userImage} = props.route.params

  return (
    <SafeAreaView
    >
      <Header
        transparent={true}
        handleCustomBack={toProfileScreen}
      />
      <ListContainer
        title='Profile'>
        <ListLink
          linkTitle={t('Edit Profile')}
          onPress={toProfileSettings}/>
        <ListLink
          linkTitle='Dummy Settings'
          onPress={toProfileSettings}/>
      </ListContainer>
    </SafeAreaView>
  )
}
