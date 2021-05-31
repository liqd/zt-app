import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { IdeasListItem } from './IdeasListItem';

export const IdeasList = (props) => {
  const ideaListItem = ({ item }) => <IdeasListItem {...item} {...props} />;
  return (
    <View>
      <Text>List of Ideas</Text>
      <FlatList
        keyExtractor={(i) => `pk${i.pk}`}
        data={props.ideas}
        renderItem={ideaListItem}
      />
    </View>
  );
};
