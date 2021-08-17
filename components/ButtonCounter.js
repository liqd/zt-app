import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './ButtonCounter.styles';

export const ButtonCounter = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Text style={
        props.disabled
          ? styles.textDisabled
          : props.highlight
            ? styles.textHighlight
            : styles.text
      }>
        {props.counter}
      </Text>
      <Text style={
        props.disabled
          ? styles.iconDisabled
          : props.highlight
            ? styles.iconHighlight
            : styles.icon
      }>
        {props.icon}
      </Text>
    </TouchableOpacity>
  );
};
