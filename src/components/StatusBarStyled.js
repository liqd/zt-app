import React from 'react'
import { StatusBar } from 'react-native'

export const StatusBarStyled = (props) => {
  return (
    <StatusBar
      backgroundColor='transparent'
      barStyle={props.lightContent
        ? 'light-content'
        : 'dark-content'}
      translucent={true}
    />
  )
}
