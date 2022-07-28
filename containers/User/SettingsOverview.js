import React from 'react'
import { View } from 'react-native'

import { ButtonSubmit } from '../../components/ButtonSubmit'
import { ListContainer, ListLink } from '../../components/List'
import { Header } from '../../components/Header'

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
    <View>
      <Header
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
    </View>
  )
}
