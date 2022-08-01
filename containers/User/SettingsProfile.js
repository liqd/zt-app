import React from 'react'
import { View } from 'react-native'

import { ButtonSubmit } from '../../components/ButtonSubmit'
import { TextInputFormField } from '../../components/formFields'
import { Header } from '../../components/Header'
import { TextSourceSans } from '../../components/TextSourceSans'

export const SettingsProfile = props => {

  return (
    <View>
      <Header navigation={props.navigation} />
      <TextSourceSans>Profile</TextSourceSans>
      <TextSourceSans>Change profile picture</TextSourceSans>
      <TextInputFormField
        name='name'
        placeholder='Username'
      />
      <ButtonSubmit
        title='Save'
      />
    </View>
  )
}
