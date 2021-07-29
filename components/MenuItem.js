import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import { COLORS } from '../theme/colors';
import { SIZES } from '../theme/fonts';

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

const styles = StyleSheet.create({
  listButton: {
    width: '90%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  listButtonFirst: {
    width: '90%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  listButtonLast: {
    width: '90%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cancelContent: {
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent'
  },
  cancelButtonText: {
    color: 'white'
  }
});
