import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { ListItem } from 'react-native-elements';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

export const MenuItem = (props) => {
  return (
    <ListItem
      Component={TouchableWithoutFeedback}
      onPress={props.item.action}
      bottomDivider
    >
      {props.item.icon ? <IconSLI name={props.item.icon} /> : null}
      <ListItem.Content>
        <ListItem.Title>{props.item.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};
