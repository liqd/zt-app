import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './LiveQuestionsItem.styles';

// *** SAMPLE COMPONENT ***

export const LiveQuestionsItem = (props) => {
  return (
    <View style={styles.eventItem}>
      <Text>{props.text}</Text>
    </View>
  );
};
