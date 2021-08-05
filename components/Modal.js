import React from 'react';
import { View } from 'react-native';
import { BottomSheet } from 'react-native-elements';
import { ModalItem } from './ModalItem';
import { styles } from './Modal.styles';

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
  );
};
