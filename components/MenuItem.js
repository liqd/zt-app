import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { ListItem } from '@rneui/themed'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import { COLORS } from '../theme/colors'
import { SIZES } from '../theme/fonts'
import { styles } from './MenuItem.styles'

export const MenuItem = (props) => {
  const {item: { isCancel, isFirst, isLast, isAllowed }} = props
  const getContainerStyle = () => {
    if (isCancel) {
      return styles.cancelButton
    } else if ( isFirst && isLast ) {
      return styles.listButtonOnly
    } else if ( isFirst ) {
      return styles.listButtonFirst
    } else if ( isLast ) {
      return styles.listButtonLast
    } else {
      return styles.listButton
    }
  }

  if (isAllowed) {
    return (
      <ListItem
        Component={TouchableWithoutFeedback}
        onPress={props.item.action}
        bottomDivider={!isCancel}
        containerStyle={getContainerStyle()}
      >
        {props.item.icon ?
          <IconSLI
            name={props.item.icon}
            color={COLORS.primary}
            size={SIZES.md}
          /> : null}
        <ListItem.Content style={isCancel ? styles.cancelContent : null}>
          <ListItem.Title
            style={isCancel ? styles.cancelButtonText : null}
          >
            {props.item.title}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    )
  } else {
    return null
  }
}
