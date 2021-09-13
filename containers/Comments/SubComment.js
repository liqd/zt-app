import React, { useState, useCallback } from 'react';
import { View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './Comment.styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { DateService } from '../../services/DateService';
import { TouchableWithoutFeedback } from 'react-native';
import { ButtonCounter } from '../../components/ButtonCounter';
import { TextSourceSans } from '../../components/TextSourceSans';

const NUM_OF_LINES = 2;

export const SubComment = (props) => {
  const {
    user_image:userAvatar,
    user_name:userName,
    created,
    comment,
    ratings: {
      negative_ratings:downVotes,
      positive_ratings:upVotes,
    }
  } = props.comment;
  const [showWholeComment, setShowWholeComment] = useState(false);
  const [hasExcerpt, setHasExcerpt] = useState(false);

  const toggleWholeComment = () => {
    setShowWholeComment(!showWholeComment);
  };

  const onTextLayout = useCallback(e => {
    setHasExcerpt(e.nativeEvent.lines.length > NUM_OF_LINES);
  }, []);

  return (
    <View style={styles.subContainer}>
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
      <View style={styles.linkSection}>
        {hasExcerpt && <TouchableWithoutFeedback onPress={toggleWholeComment}>
          <TextSourceSans style={styles.linkButton}>{showWholeComment ? 'Read Less' : 'Read More'}</TextSourceSans>
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
          icon={<Icon name='action-redo' size={18} />}
          title="Share"
          titleStyle={styles.buttonTitle}
          type='clear'
        />
      </View>
    </View>
  );
};
