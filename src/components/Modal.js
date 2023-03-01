import React from 'react'
import { View } from 'react-native'
import { BottomSheet } from '@rneui/themed'

import { styles } from './Modal.styles'
import { ModalItem } from './ModalItem'

export const Modal = (props) => {
  return (
    <BottomSheet
      isVisible={props.isVisible}
      containerStyle={styles.backdrop}
    >
      <View style={styles.list}>
        {props.modalItems.map((modalItem, idx) =>
          <ModalItem key={idx} item={modalItem} />)}
      </View>
    </BottomSheet>
  )
}
