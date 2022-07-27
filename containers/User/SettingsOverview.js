import React from 'react'
import { View } from 'react-native'

import { ButtonSubmit } from '../../components/ButtonSubmit'
import { ListContainer, ListLink } from '../../components/List'
import { Header } from '../../components/Header'

export const SettingsOverview = (props) => {

  const toProfileSettings = () => {
    props.navigation.navigate('SettingsProfile', {name: 'Bob'})
  }

  return (
    <View>
      <Header
        navigation={props.navigation} />
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
