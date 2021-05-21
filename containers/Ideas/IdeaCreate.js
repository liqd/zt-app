import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { styles } from './Idea.styles'

export const IdeaCreate = props => {
  const [enteredIdeaTitle, setEnteredIdeaTitle] = useState('');

  const textInputHandler = (enteredText) => {
    setEnteredIdeaTitle(enteredText);
  };

  return (
    <View style={styles.inputGroup}>
      <TextInput
        placeholder="good idea"
        style={styles.TextInput}
        onChangeText={textInputHandler}
        value={enteredIdeaTitle}
      />
      <Button
        title="ADD"
        onPress={props.onAddIdea.bind(this, enteredIdeaTitle)}
      />
    </View>
  );
}

