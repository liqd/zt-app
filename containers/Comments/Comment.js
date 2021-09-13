import React, { useState, useCallback } from 'react';
import { View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './Comment.styles';
import { TextSourceSans } from '../../components/TextSourceSans';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { DateService } from '../../services/DateService';
import { TouchableWithoutFeedback } from 'react-native';
import { ButtonCounter } from '../../components/ButtonCounter';
import { SubComments } from './SubComments';

const NUM_OF_LINES = 2;

export const Comment = (props) => {
  const [showSubComments, setShowSubComments] = useState(false);
  const [showWholeComment, setShowWholeComment] = useState(false);
  const [hasExcerpt, setHasExcerpt] = useState(false);
  const {
    user_image:userAvatar,
    user_name:userName,
    child_comments: childComments,
    created,
    comment,
    ratings: {
      negative_ratings:downVotes,
      positive_ratings:upVotes,
    }
  } = props.comment;

  const toggleSubComments = () => {
    setShowSubComments(!showSubComments);
  };

  const toggleWholeComment = () => {
    setShowWholeComment(!showWholeComment);
  };

  const onTextLayout = useCallback(e => {
    setHasExcerpt(e.nativeEvent.lines.length > NUM_OF_LINES);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Image source={{ uri: userAvatar }} style={styles.avatar} />
          <View style={styles.author}>
            <TextSourceSans style={styles.username}>{userName}</TextSourceSans>
            <TextSourceSans style={styles.date}>{DateService(created)}</TextSourceSans>
          </View>
        </View>
        <TextSourceSans>
          <Button
            icon={<Icon name='options-vertical' size={22} />}
            type='clear'
          />
        </TextSourceSans>
      </View>
      <View>
        {!showWholeComment &&
          <TextSourceSans
            style={styles.comment}
            numberOfLines={NUM_OF_LINES}
            onTextLayout={onTextLayout}
          >
            {comment}
          </TextSourceSans>
        }
        {showWholeComment &&
        <TextSourceSans style={styles.comment}>
          {comment}
        </TextSourceSans>
        }
        {hasExcerpt && <TouchableWithoutFeedback onPress={toggleWholeComment}>
          <TextSourceSans style={styles.linkButton}>{showWholeComment ? 'Read Less' : 'Read More'}</TextSourceSans>
        </TouchableWithoutFeedback>}
      </View>
      <View style={styles.linkSection}>
        {childComments.length !== 0 && <TouchableWithoutFeedback onPress={toggleSubComments}>
          <TextSourceSans style={styles.linkButton}>
            {showSubComments ? 'Hide' : 'Show'} {childComments.length} answers
          </TextSourceSans>
        </TouchableWithoutFeedback>}
      </View>
      <View style={styles.bottomActionsContainer}>
        <View style={styles.ratingButtons}>
          <ButtonCounter
            icon={<Icon name='arrow-up' size={18} />}
            counter={upVotes}
          />
          <ButtonCounter
            icon={<Icon name='arrow-down' size={18} />}
            counter={downVotes}
          />
        </View>
        <Button
          icon={<Icon name='bubble' size={18} />}
          title="Reply"
          titleStyle={styles.buttonTitle}
          type='clear'
          styles={styles.commentButton}
        />
        <Button
          icon={<Icon name='action-redo' size={18} />}
          title="Share"
          titleStyle={styles.buttonTitle}
          type='clear'
        />
      </View>
      {showSubComments && <SubComments comments={childComments} />}
    </View>
  );
};
