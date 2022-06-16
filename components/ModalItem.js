import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { ListItem } from '@rneui/themed';
import { styles } from './ModalItem.styles';

export const ModalItem = (props) => {
  const {item: { isCancel, isText }} = props;

  return (
    <ListItem
      Component={TouchableWithoutFeedback}
      bottomDivider={true}
      onPress={props.item.action
        ? props.item.action
        : null
      }
      containerStyle={isText
        ? styles.modalText
        : isCancel
          ? styles.cancelButton
          : styles.actionButton
      }
    >
      <ListItem.Content style={styles.modalContent}>
        <ListItem.Title
          style={isCancel
            ? styles.cancelButtonText
            : isText
              ? null
              : styles.actionButtonText
          }
        >
          {props.item.title}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};
