import React from 'react'
import { Button } from '@rneui/base'
import { styles } from './ButtonSignOut.styles'
import {useAuthorization} from '../containers/Auth/AuthProvider.js'

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
