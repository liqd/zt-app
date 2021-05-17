import React from 'react';
import { View } from 'react-native';
import { LiveQuestions } from './containers/LiveQuestions/LiveQuestions';
import { styles } from './App.styles';

export default function App() {
  return (
    <View style={styles.container}>
      <LiveQuestions />
    </View>
  );
}