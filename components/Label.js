import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Label.styles';

export const Label = (props) => {
  return (
    <View style={styles.label}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};
