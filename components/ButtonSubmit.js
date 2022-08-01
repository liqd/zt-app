import React from 'react'
import { Button } from '@rneui/base'

import { styles } from './ButtonSubmit.styles'

export const ButtonSubmit = (props) => {
  return (
    <Button
      title={props.title}
      onPress={props.onPress}
      buttonStyle={styles.submitButton}
      disabled={props.disabled}
    />
  )
}
