import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '../../components/Header'
import { ListContainer, ListLink } from '../../components/List'

export const SettingsOverview = (props) => {
  const { t } = useTranslation()

  const toProfileSettings = () => {
    props.navigation.navigate('SettingsProfile')
  }

  const toProfileScreen = () => {
    props.navigation.navigate('ProfileScreen')
  }

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
