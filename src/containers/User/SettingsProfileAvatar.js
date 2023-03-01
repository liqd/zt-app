import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '../../components/Header'
import { ImagePickerFormField } from '../../components/imageFormField'
import { ListContainer, ListItem } from '../../components/List'

export const SettingsProfileAvatar = props => {

  const onGoBack = props.route.params.onGoBack

  return (
    <SafeAreaView>
      <Header transparent={true} navigation={props.navigation} />
      <ListContainer
        title='Edit Profile Avatar'>
        <ListItem>
          <ImagePickerFormField
            onSetImage={img => {
              onGoBack(img)
              props.navigation.goBack()
            }}
          />
        </ListItem>
      </ListContainer>
    </SafeAreaView>
  )
}
