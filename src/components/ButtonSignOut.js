import React from 'react'
import { Button } from '@rneui/base'

import {useAuthorization} from '../containers/Auth/AuthProvider.js'

import { styles } from './ButtonSignOut.styles'

export const ButtonSignOut = () => {
  const {signOut} = useAuthorization()
  return (
    <Button
      buttonStyle={styles.logoutButton}
      onPress={signOut}
      title='Sign out'
    />
  )
}
