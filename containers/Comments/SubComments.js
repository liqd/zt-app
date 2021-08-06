import React from 'react';
import { View } from 'react-native';
import { SubComment } from './SubComment';

export const SubComments = (props) => {
  return (
    <View>
      {props.comments.map((comment, idx) =>
        <SubComment
          key={`comment-${idx}`}
          comment={comment}
        />)}
    </View>
  );
};
