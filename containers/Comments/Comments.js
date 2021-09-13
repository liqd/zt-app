import React from 'react';
import { View } from 'react-native';
import { Comment } from './Comment';
import { TextSourceSans } from '../../components/TextSourceSans';

export const Comments = (props) => {
  return (
    <View>
      <TextSourceSans>
        {props.comments.length} {props.comments.length !== 1
          ? 'Entries'
          : 'Entry'}
      </TextSourceSans>
      {props.comments.map((comment, idx) =>
        <Comment
          key={`comment-${idx}`}
          comment={comment}
        />)}
    </View>
  );
};
