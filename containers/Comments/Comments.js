import React from 'react';
import { View, Text } from 'react-native';
import { Comment } from './Comment';

export const Comments = (props) => {
  return (
    <View>
      <Text>
        {props.comments.length} {props.comments.length !== 1
          ? 'Entries'
          : 'Entry'}
      </Text>
      {props.comments.map((comment, idx) =>
        <Comment
          key={`comment-${idx}`}
          comment={comment}
        />)}
    </View>
  );
};
