import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'

import { styles } from './List.styles'
import { TextSourceSans } from './TextSourceSans'

export const ListContainer = (props) => {
  return (
    <View style={styles.listContainer}>
      <TextSourceSans style={styles.listTitle}>{props.title}</TextSourceSans>
      {props.children}
    </View>
  )
}

export const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      {props.children}
    </View>
  )
}

export const ListLink = (props) => {
  const arrowRightIcon = <IconSLI name='arrow-right' size={20}/>

  return (
    <View style={styles.listItem}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={props.onPress}
        style={styles.listLink}
        disabled={props.disabled}
      >
        <TextSourceSans style={styles.listLinkTitle} numberOfLines={1}>
          {props.linkTitle}
        </TextSourceSans>
        <TextSourceSans style={styles.listLinkTitle}>
          {arrowRightIcon}
        </TextSourceSans>
      </TouchableOpacity>
    </View>
  )
}
