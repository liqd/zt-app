import React from 'react';
import { View } from 'react-native';
import { BottomSheet } from '@rneui/themed';
import { MenuItem } from './MenuItem';
import { styles } from './Menu.styles';

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
