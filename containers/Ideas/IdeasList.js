import React from 'react';
import {View} from 'react-native';

import {IdeasListItem} from './IdeasListItem';
import {TextSourceSans} from '../../components/TextSourceSans';

export const IdeasList = props => {
  //do not pass ideas to child components
  const {ideas, ...otherProps} = props;
  const hasIdeas = !!ideas && ideas.length > 0;
  return (
    <View>
      {hasIdeas ? (
        props.ideas.map(idea => {
          return (
            <IdeasListItem key={`pk${idea.pk}`} idea={idea} {...otherProps} />
          );
        })
      ) : (
        <TextSourceSans>
          Could not fetch ideas. Do you use the correct Backend and is your
          local adhocracy+ server running?
        </TextSourceSans>
      )}
    </View>
  );
};
