import React, { useState, useCallback } from 'react';
import { View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './Comment.styles';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
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

  const optionsIcon = (<IconSLI name='options-vertical' size={22} />);
  const arrowUpIcon = (<IconSLI name='arrow-up' size={18} />);
  const arrowDownIcon = (<IconSLI name='arrow-down' size={18} />);
  const redoIcon = (<IconSLI name='action-redo' size={18} />);

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
            icon={optionsIcon}
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
            icon={arrowUpIcon}
            counter={upVotes}
          />
          <ButtonCounter
            icon={arrowDownIcon}
            counter={downVotes}
          />
        </View>
        <Button
          icon={redoIcon}
          title="Share"
          titleStyle={styles.buttonTitle}
          type='clear'
        />
      </View>
    </View>
  );
};
