import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { ListItem } from '@rneui/themed'

import { styles } from './ModalItem.styles'

export const ModalItem = (props) => {
  const {item: { isCancel, isText, title }} = props
  const titleList = Array.isArray(title) ? title : [title]
  let containerStyles
  if (isText) {
    containerStyles = styles.modalText
  } else {
    if (isCancel) {
      containerStyles = styles.cancelButton
    } else {
      containerStyles = styles.actionButton
    }
  }

  let listItemStyles
  if (isCancel) {
    listItemStyles = styles.cancelButtonText
  } else {
    if (isText) {
      listItemStyles = null
    } else {
      listItemStyles = styles.actionButtonText
    }
  }

  return (
    <ListItem
      Component={TouchableWithoutFeedback}
      bottomDivider={true}
      onPress={props.item.action ? props.item.action : null}
      containerStyle={containerStyles}
    >
      <ListItem.Content style={styles.modalContent}>
        {titleList.map((t,i) => (
          <ListItem.Title style={listItemStyles} key={i}>
            {t}
          </ListItem.Title>
        ))}
      </ListItem.Content>
    </ListItem>
  )
}
