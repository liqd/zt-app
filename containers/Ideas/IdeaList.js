import React, { useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { styles } from './Idea.styles'
import { IdeaListItem } from './IdeaListItem'

export const IdeaList = props => {
  const [ideaList, setIdeaList] = useState('');

  return (
    <View>
      <Text>Idea list!</Text>
      <FlatList
        data={ideaList}
        renderItem={itemData => <IdeaListItem title={itemData.item.title} />}
      />
    </View>
  );
}
