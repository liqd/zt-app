import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import { Button } from '@rneui/base'

import { styles } from './Header.styles.js'

export const Header = (props) => {
  const { t } = useTranslation()
  const arrowLeftIcon = (
    <IconSLI
      name='arrow-left'
      size={22}
      color={props.arrowColor
        ? props.arrowColor
        : undefined}
    />
  )
  const backButtonStyle = props.backButtonStyle
    ? props.backButtonStyle
    : styles.backButton
  const backButtonTextStyle = props.backButtonTextStyle
    ? props.backButtonTextStyle
    : styles.backButtonText
  const containerStyle = props.transparent
    ? {}
    : styles.container

  function handleBack() {
    if (props.isEditing !== undefined && props.isEditing) {
      props.toggleEditing()
    } else return props.navigation.goBack()
  }

  const defaultLeftButton = (
    <Button
      buttonStyle={backButtonStyle}
      titleStyle={backButtonTextStyle}
      title={t('Back')}
      type='clear'
      icon={arrowLeftIcon}
      onPress={props.handleCustomBack
        ? props.handleCustomBack
        : handleBack}
    />
  )

  return (
    <View style={containerStyle}>
      <View style={styles.actionsContainer}>
        {props.leftButton
          ? props.leftButton
          : defaultLeftButton}
        {props.rightButton}
      </View>
    </View>
  )
}
