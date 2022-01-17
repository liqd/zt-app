import React from 'react';
import {View} from 'react-native';

import {IdeasListItem} from './IdeasListItem';
import {TextSourceSans} from '../../components/TextSourceSans';

export const IdeasList = props => {
  //do not pass ideas to child components
  const {ideas, ...otherProps} = props;
  return (
    <View>
      {ideas && ideas.length > 0 ? (
        props.ideas.map(idea => {
          return (
            <IdeasListItem key={`pk${idea.pk}`} idea={idea} {...otherProps} />
          );
        })
      ) : (
        <TextSourceSans>
          No ideas found. Be the first to add an idea!
        </TextSourceSans>
      )}
    </View>
  );
};
