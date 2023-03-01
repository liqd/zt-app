import React from 'react'
import { View } from 'react-native'
import { BottomSheet } from '@rneui/themed'

import { styles } from './Menu.styles'
import { MenuItem } from './MenuItem'

export const Menu = (props) => {
  return (
    <BottomSheet
      isVisible={props.isVisible}
      containerStyle={styles.backdrop}
    >
      <View style={styles.list}>
        {props.menuItems.map((menuitem, idx) =>
          <MenuItem key={idx} item={menuitem} />)}
      </View>
    </BottomSheet>
  )
}
