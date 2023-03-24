import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '../../components/Header'
import { ImagePickerFormField } from '../../components/imageFormField'
import { ListContainer, ListItem } from '../../components/List'
import { StatusBarStyled } from '../../components/StatusBarStyled'
import { ProfileContext } from '../../contexts/ProfileContext'

export const SettingsProfileAvatar = props => {
  const [profileContext, setProfileContext] = useContext(ProfileContext)
  const { t } = useTranslation()

  return (
    <SafeAreaView>
      <StatusBarStyled />
      <Header transparent={true} navigation={props.navigation} />
      <ListContainer
        title={t('Edit Profile Avatar')}>
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
