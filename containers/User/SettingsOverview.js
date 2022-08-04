import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '../../components/Header'
import { ListContainer, ListLink } from '../../components/List'

export const SettingsOverview = (props) => {

  // Pass fetched data forward
  const toProfileSettings = () => {
    props.navigation.navigate('SettingsProfile', {
      userId: userId,
      userName: userName,
      userImage: userImage
    })
  }

  // Pass updated info back
  const toProfileScreen = () => {
    props.navigation.navigate('ProfileScreen', {
      userId: userId,
      userName: userName,
      userImage: userImage
    })
  }

  const {userId, userName, userImage} = props.route.params

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
          linkTitle='Edit Profile'
          onPress={toProfileSettings}/>
        <ListLink
          linkTitle='Dummy Settings'
          onPress={toProfileSettings}/>
      </ListContainer>
    </SafeAreaView>
  )
}
