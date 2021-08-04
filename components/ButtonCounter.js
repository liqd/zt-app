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
      <Text
        style={props.disabled ? styles.iconDisabled : styles.icon}
      >
        {props.icon}
      </Text>
      <Text style={props.disabled ? styles.textDisabled : styles.text}>
        {props.counter}
      </Text>
    </TouchableOpacity>
  );
};
