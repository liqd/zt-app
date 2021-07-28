import React from 'react';
import { View } from 'react-native';
import { BottomSheet } from 'react-native-elements';
import { MenuItem } from './MenuItem';

export const Menu = (props) => {
  return (
    <BottomSheet isVisible>
      <View>
        {props.menuItems.map((menuitem, idx) => <MenuItem key={idx} item={menuitem} />)}
        <MenuItem item={{title: 'Cancel'}} />
      </View>
    </BottomSheet>
  );
};
