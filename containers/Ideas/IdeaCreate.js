import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { styles } from './Idea.styles'

export const IdeaCreate = props => {
  const [enteredIdeaTitle, setEnteredIdeaTitle] = useState('');

  const textInputHandler = (enteredText) => {
    setEnteredIdeaTitle(enteredText);
  };


  const pressHandler = () => props.navigation.pop();

  return (
    <View>
      <TextInput
        placeholder="This is my great idea"
        style={styles.TextInput}
        onChangeText={textInputHandler}
        value={enteredIdeaTitle}
      />
      <TextInput
        placeholder="Add your description"
        style={styles.TextInput}
        onChangeText={textInputHandler}
        value={enteredIdeaTitle}
      />
      <View>
        <Button title="Label 1" />
        <Button title="Label 2" />
        <Button title="Label 3" />
      </View>
      <Button title="Submit Idea" onPress={pressHandler} />
    </View>
  );
}

IdeaCreate.navigationOptions = {
  headerTitle: 'Submit your idea',
  // headerBackTitle only for iOS
  headerBackTitle: 'Back'
};
