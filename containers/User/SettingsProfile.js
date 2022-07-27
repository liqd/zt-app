import React from 'react'
import { View } from 'react-native'

import { AvatarCircle } from '../../components/ButtonAvatar'
import { ButtonSubmit } from '../../components/ButtonSubmit'
import { Header } from '../../components/Header'
import { ListContainer, ListItem } from '../../components/List'
import { TextInputFormField } from '../../components/formFields'
import { TextSourceSans } from '../../components/TextSourceSans'

import { styles } from './SettingsProfile.styles'

export const SettingsProfile = props => {

  return (
    <View style={styles.container}>
      <View>
        <Header navigation={props.navigation} />
        <ListContainer
          title='Edit Profile'>
          <ListItem>
            <AvatarCircle avatarStyles={styles.avatarStyles}/>
            <TextSourceSans>Change profile picture</TextSourceSans>
          </ListItem>
          <ListItem>
            <TextInputFormField
              name='name'
              placeholder='Username'
            />
          </ListItem>
        </ListContainer>
      </View>
      <ButtonSubmit
        title='Save'
      />
    </View>
  )
}
