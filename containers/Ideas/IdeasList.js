import React from 'react';
import { View } from 'react-native';

import { IdeasListItem } from './IdeasListItem';

export const IdeasList = (props) => {
  //do not pass ideas to child components
  const {ideas, ...otherProps} = props;
  return (
    <View>
      {props.ideas.map((idea) => {
        return (
          <IdeasListItem
            key={`pk${idea.pk}`}
            idea={idea}
            {...otherProps}
          />
        );
      })}
    </View>
  );
};
