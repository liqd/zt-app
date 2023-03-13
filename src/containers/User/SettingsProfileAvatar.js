import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '../../components/Header'
import { ImagePickerFormField } from '../../components/imageFormField'
import { ListContainer, ListItem } from '../../components/List'
import { ProfileContext } from '../../contexts/ProfileContext'

export const SettingsProfileAvatar = props => {
  const [profileContext, setProfileContext] = useContext(ProfileContext)

  return (
    <SafeAreaView>
      <Header transparent={true} navigation={props.navigation} />
      <ListContainer
        title='Edit Profile Avatar'>
        <ListItem>
          <ImagePickerFormField
            onSetImage={img => {
              setProfileContext({
                ...profileContext,
                newUserImage: img
              })
              props.navigation.goBack()
            }}
          />
        </ListItem>
      </ListContainer>
    </SafeAreaView>
  )
}
