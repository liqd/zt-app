import React from 'react';
import { View } from 'react-native';

import { IdeasListItem } from './IdeasListItem';

export const IdeasList = (props) => {
  return (
    <View>
      {props.ideas.map((idea) => {
        return (
          <IdeasListItem
            key={`pk${idea.pk}`}
            idea={idea}
            isRatingPhase={props.isRatingPhase}
            {...props}
          />
        );
      })}
    </View>
  );
};
