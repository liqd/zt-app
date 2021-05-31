import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { styles } from './Idea.styles'

export const IdeaCreate = props => {

  const pressHandler = () => props.navigation.pop();

  return (
    <View>
      <TextInput
        placeholder="This is my great idea"
        style={styles.TextInput}
      />
      <Button title="Submit Idea" onPress={pressHandler} />
    </View>
  );
}

IdeaCreate.navigationOptions = {
  headerTitle: 'Submit your idea',
  // headerBackTitle only for iOS
  headerBackTitle: 'Back'
};
