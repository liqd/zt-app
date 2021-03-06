import React from 'react'
import { styles } from './Header.styles.js'
import { StatusBar, View } from 'react-native'
import { Button } from '@rneui/base'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'

export const Header = (props) => {
  const arrowLeftIcon = (<IconSLI name='arrow-left' size={22} color={props.arrowColor ? props.arrowColor : undefined} />)
  const paddingTop = StatusBar.currentHeight || 0
  const backButtonStyle = props.backButtonStyle ? props.backButtonStyle : styles.backButton
  const backButtonTextStyle = props.backButtonTextStyle ? props.backButtonTextStyle : styles.backButtonText
  const containerStyle = props.transparent ? {} : styles.container

  function handleBack() {
    if (props.isEditing !== undefined && props.isEditing){
      props.toggleEditing()
    } else
      return props.navigation.goBack()
  }

  const defaultLeftButton = (
    <Button
      buttonStyle={backButtonStyle}
      titleStyle={backButtonTextStyle}
      title='Back'
      type='clear'
      icon={arrowLeftIcon}
      onPress={handleBack}
    />
  )

  return (
    <View style={{...containerStyle, paddingTop}}>
      <View style={styles.actionsContainer}>
        { props.leftButton ? props.leftButton : defaultLeftButton}
        { props.rightButton }
      </View>
    </View>
  )
}
