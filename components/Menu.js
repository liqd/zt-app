import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheet } from 'react-native-elements';
import { MenuItem } from './MenuItem';

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
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(77, 77, 77, 0.9)'
  },
  list: {
    alignItems: 'center'
  }
});
