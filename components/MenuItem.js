import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { ListItem } from 'react-native-elements';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import { COLORS } from '../theme/colors';
import { SIZES } from '../theme/fonts';
import { styles } from './MenuItem.styles';

export const MenuItem = (props) => {
  const {item: { isCancel, isFirst, isLast }} = props;

  return (
    <ListItem
      Component={TouchableWithoutFeedback}
      onPress={props.item.action}
      bottomDivider={!isCancel}
      containerStyle={isCancel
        ? styles.cancelButton
        : isFirst
          ? styles.listButtonFirst
          : isLast
            ? styles.listButtonLast
            : styles.listButton
      }
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
  );
};
