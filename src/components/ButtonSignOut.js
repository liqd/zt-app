import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@rneui/base'

import {useAuthorization} from '../containers/Auth/AuthProvider.js'

import { styles } from './ButtonSignOut.styles'

export const ButtonSignOut = () => {
  const { t } = useTranslation()
  const {signOut} = useAuthorization()
  return (
    <Button
      buttonStyle={styles.logoutButton}
      onPress={signOut}
      title={t('Sign out')}
    />
  )
}
