import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './ButtonCounter.styles';

export const ButtonCounter = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>
        {props.icon}
      </Text>
      <Text style={styles.text}>
        {props.counter}
      </Text>
    </View>
  );
};
