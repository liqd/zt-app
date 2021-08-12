import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './Comment.styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { DateService } from '../../services/DateService';
import { TouchableWithoutFeedback } from 'react-native';
import { ButtonCounter } from '../../components/ButtonCounter';
import { SubComments } from './SubComments';

export const Comment = (props) => {
  const [showSubComments, setShowSubComments] = useState(false);
  const [showWholeComment, setShowWholeComment] = useState(false);
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

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Image source={{ uri: userAvatar }} style={styles.avatar} />
          <View style={styles.author}>
            <Text style={styles.username}>{userName}</Text>
            <Text style={styles.date}>{DateService(created)}</Text>
          </View>
        </View>
        <Text>
          <Button
            icon={<Icon name='options-vertical' size={22} />}
            type='clear'
          />
        </Text>
      </View>
      <View>
        {!showWholeComment &&
          <Text style={styles.comment} numberOfLines={2}>
            {comment}
          </Text>
        }
        {showWholeComment &&
        <Text style={styles.comment}>
          {comment}
        </Text>
        }
        <TouchableWithoutFeedback onPress={toggleWholeComment}>
          <Text style={styles.linkButton}>{showWholeComment ? 'Read Less' : 'Read More'}</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.linkSection}>
        {childComments.length !== 0 && <TouchableWithoutFeedback onPress={toggleSubComments}>
          <Text style={styles.linkButton}>
            {showSubComments ? 'Hide' : 'Show'} {childComments.length} answers
          </Text>
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
