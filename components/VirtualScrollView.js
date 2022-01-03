import React from 'react';
import {FlatList} from 'react-native';

export const VirtualScrollView = props => {
  return (
    <FlatList
      style={props.style}
      contentContainerStyle={props.contentContainerStyle}
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => 'dummy'}
      renderItem={null}
      ListHeaderComponent={() => (
        <>{props.children}</>
      )}
    />
  );
};
