import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '../../components/Header'
import { ListContainer, ListLink } from '../../components/List'
import { StatusBarStyled } from '../../components/StatusBarStyled'

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
      <StatusBarStyled />
      <Header
        transparent={true}
        handleCustomBack={toProfileScreen}
      />
      <ListContainer
        title={('Profile')}>
        <ListLink
          linkTitle={t('Edit Profile')}
          onPress={toProfileSettings}/>
      </ListContainer>
    </SafeAreaView>
  )
}
