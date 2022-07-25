import React from 'react'
import { View } from 'react-native'
import { ButtonSubmit } from '../../components/ButtonSubmit'
import { Header } from '../../components/Header'
import { TextSourceSans } from '../../components/TextSourceSans'

export const SettingsOverview = (props) => {

  const toProfileSettings = () => {
    props.navigation.navigate('SettingsProfile', {name: 'Bob'})
  }

  return (
    <View>
      <Header
        navigation={props.navigation} />
      <TextSourceSans />
      <ButtonSubmit
        title='Profile settings'
        onPress={toProfileSettings}
      />
    </View>
  )
}
