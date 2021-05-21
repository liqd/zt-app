import React, { useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { styles } from './Idea.styles'
import { IdeaCreate } from './IdeaCreate'
import { IdeaListItem } from './IdeaListItem'

export const Ideas = () => {
  const [ideaList, setIdeaList] = useState([]);

  const addIdeaHandler = ideaTitle => {
    setIdeaList(currentIdeaList => [
      ...currentIdeaList,
      {key: Math.random().toString(), title: ideaTitle}
    ]);
  };

  return (
    <View>
      <Text>Add your idea!</Text>
      <IdeaCreate
        onAddIdea={addIdeaHandler}
      />
      <View>
        <Text>Idea list!</Text>
        <FlatList
          data={ideaList}
          renderItem={itemData => <IdeaListItem title={itemData.item.title} />}
        />
      </View>
    </View>
  );
}

