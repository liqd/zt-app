import React, { useEffect, useState, useCallback } from 'react';
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
  const [comment, setComment] = useState(props.comment);
  const [showWholeComment, setShowWholeComment] = useState(false);
  const [hasExcerpt, setHasExcerpt] = useState(false);

  useEffect(() => {
    setComment(props.comment);
  }, [props.comment]);

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
          {props.isDisplayed(comment) &&
          <Image source={{ uri: comment.user_image }} style={styles.avatar} />
          }
          <View style={styles.author}>
            <TextSourceSans style={styles.username}>{comment.user_name}</TextSourceSans>
            {props.isDisplayed(comment) &&
            <TextSourceSans style={styles.date}>{DateService(comment.created)}</TextSourceSans>
            }
          </View>
        </View>
        {props.isDisplayed(comment) &&
        <TextSourceSans>
          <Button
            icon={optionsIcon}
            type='clear'
            onPress={() => {props.setCommentBeingProcessed(comment); props.toggleMenu();}}
          />
        </TextSourceSans>
        }
      </View>
      {!showWholeComment &&
        <TextSourceSans
          style={styles.comment}
          numberOfLines={NUM_OF_LINES}
          onTextLayout={onTextLayout}
        >
          {props.getCommentTextDisplay(comment)}
        </TextSourceSans>
      }
      {showWholeComment &&
      <TextSourceSans style={styles.comment}>
        {comment.comment}
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
            counter={comment.ratings.positive_ratings}
            onPress={() => props.handleRate(comment, 1)}
            highlight={
              comment.ratings.current_user_rating_id &&
              comment.ratings.current_user_rating_value === 1 &&
              comment.ratings.current_user_rating_value
            }
            disabled={!comment.has_rating_permission}
          />
          <ButtonCounter
            icon={arrowDownIcon}
            counter={comment.ratings.negative_ratings}
            onPress={() => props.handleRate(comment, -1)}
            highlight={
              comment.ratings.current_user_rating_id &&
              comment.ratings.current_user_rating_value === -1 &&
              comment.ratings.current_user_rating_value
            }
            disabled={!comment.has_rating_permission}
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
