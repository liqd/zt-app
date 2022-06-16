import React, { useState, useCallback, useEffect } from 'react';
import { Alert, View, Image } from 'react-native';
import { Button } from '@rneui/base';
import { styles } from './Comment.styles';
import { TextSourceSans } from '../../components/TextSourceSans';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import { DateService } from '../../services/DateService';
import { TouchableWithoutFeedback } from 'react-native';
import { ButtonCounter } from '../../components/ButtonCounter';
import { SubComments } from './SubComments';
import API from '../../BaseApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NUM_OF_LINES = 2;

export const Comment = (props) => {
  const [showSubComments, setShowSubComments] = useState(false);
  const [showWholeComment, setShowWholeComment] = useState(false);
  const [hasExcerpt, setHasExcerpt] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [comment, setComment] = useState(props.comment);
  const [commentBeingProcessed, setCommentBeingProcessed] = useState(props.comment);
  const commentMenuItems = [
    {
      title: 'Edit',
      icon: 'pencil',
      action: () => console.log('Edit comment'),
      isFirst: true,
      isAllowed: comment.has_changing_permission
    },
    {
      title: 'Delete',
      icon: 'trash',
      action: () => props.toggleDeleteModal(),
      isAllowed: comment.has_deleting_permission
    },
    {
      title: 'Report',
      icon: 'flag',
      action: () => console.log('Report comment'),
      isFirst: !comment.has_changing_permission && !comment.has_deleting_permission,
      isLast: true,
      isAllowed: true
    },
    {
      title: 'Cancel',
      action: () => props.toggleMenu(),
      isCancel: true,
      isAllowed: true
    },
  ];

  const commentDeleteModalItems = [
    {
      // space is to center the text
      title: '   This comment will be deleted.\nThis action cannot be undone.',
      isText: true
    },
    {
      title: 'Delete',
      action: () => deleteComment()
    },
    {
      title: 'Cancel',
      action: () => props.toggleDeleteModal(),
      isCancel: true
    },
  ];

  useEffect(() => {
    setComment(props.comment);
    props.openSubComments && setShowSubComments(true);
  }, [props.openSubComments, props.comment]);

  useEffect(() => {
    props.setDeleteModalItems(commentDeleteModalItems);
    props.setMenuItems(commentMenuItems);
  }, [commentBeingProcessed]);

  const toggleSubComments = () => {
    setShowSubComments(!showSubComments);
  };

  const toggleWholeComment = () => {
    setShowWholeComment(!showWholeComment);
  };

  const onTextLayout = useCallback(e => {
    setHasExcerpt(e.nativeEvent.lines.length > NUM_OF_LINES);
  }, []);

  const handleRate = async(ratingComment, value) => {
    if (processing) return;
    setProcessing(true);
    const token = await AsyncStorage.getItem('authToken');
    const newComment = await rate(ratingComment, value, token);
    newComment && setProcessing(false);
  };

  const rate = async(ratingComment, value, token) => {
    if (ratingComment.ratings.current_user_rating_id) {
      if (ratingComment.ratings.current_user_rating_value !== value) {
        await API.changeRating(
          ratingComment.comment_content_type,
          ratingComment.id,
          ratingComment.ratings.current_user_rating_id,
          {value: value},
          token
        );
      }
      else {
        await API.changeRating(
          ratingComment.comment_content_type,
          ratingComment.id,
          ratingComment.ratings.current_user_rating_id,
          {value: 0},
          token
        );
      }
    }
    else {
      await API.postRating(ratingComment.comment_content_type, ratingComment.id, {value: value}, token);
    }
    return await fetchComment();
  };

  const fetchComment = () => {
    return AsyncStorage.getItem('authToken')
      .then((token) => API.getComment(comment.content_type, comment.object_pk, comment.id, token))
      .then(fetchedComment => {
        setComment(fetchedComment);
        return fetchedComment;
      });
  };

  const deleteComment = () => {
    AsyncStorage.getItem('authToken')
      .then((token) => API.deleteComment(commentBeingProcessed.content_type, commentBeingProcessed.object_pk, commentBeingProcessed.id, token))
      .then((response) => {
        const {statusCode, data} = response;
        props.toggleDeleteModal();
        if (statusCode == 200) {
          Alert.alert('Your comment was deleted.', 'Thank you for participating!',  [{ text: 'Ok' }]);
          fetchComment();
        }
        else {
          const errorMessage = 'That did not work.';
          let errorDetail;
          if (statusCode==403) {
            errorDetail = data.detail;
          }
          else if (statusCode == 400) {
            errorDetail = 'Bad request';
          }
          Alert.alert(errorMessage, errorDetail, [{ text: 'Ok' }]);
        }
      });
  };

  const getCommentTextDisplay = (comment) => {
    if (comment.is_removed) {
      return 'Deleted by creator on ' + DateService(comment.modified);
    }
    else if (comment.is_censored || comment.is_blocked) {
      return 'Deleted by moderation on '+ DateService(comment.modified);
    }
    else {
      return comment.comment;
    }
  };

  const isDisplayed = (comment) => {
    return !(comment.is_deleted || comment.is_blocked);
  };

  const optionsIcon = (<IconSLI name='options-vertical' size={22} />);
  const arrowUpIcon = (<IconSLI name='arrow-up' size={18} />);
  const arrowDownIcon = (<IconSLI name='arrow-down' size={18} />);
  const commentIcon = (<IconSLI name='bubble' size={18} />);
  const redoIcon = (<IconSLI name='action-redo' size={18} />);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          {isDisplayed(comment) &&
          <Image source={{ uri: comment.user_image }} style={styles.avatar} />
          }
          <View style={styles.author}>
            <TextSourceSans style={styles.username}>{comment.user_name}</TextSourceSans>
            {isDisplayed(comment) &&
            <TextSourceSans style={styles.date}>{DateService(comment.created)}</TextSourceSans>
            }
          </View>
        </View>
        {isDisplayed(comment) &&
        <TextSourceSans>
          <Button
            icon={optionsIcon}
            type='clear'
            onPress={() => {setCommentBeingProcessed(comment); props.toggleMenu();}}
          />
        </TextSourceSans>
        }
      </View>
      <View>
        {!showWholeComment &&
          <TextSourceSans
            style={styles.comment}
            numberOfLines={NUM_OF_LINES}
            onTextLayout={onTextLayout}
          >
            {getCommentTextDisplay(comment)}
          </TextSourceSans>
        }
        {showWholeComment &&
        <TextSourceSans style={styles.comment}>
          {comment.comment}
        </TextSourceSans>
        }
        {hasExcerpt && <TouchableWithoutFeedback onPress={toggleWholeComment}>
          <TextSourceSans style={styles.linkButton}>{showWholeComment ? 'Read Less' : 'Read More'}</TextSourceSans>
        </TouchableWithoutFeedback>}
      </View>
      <View style={styles.linkSection}>
        {comment.child_comments.length !== 0 && <TouchableWithoutFeedback onPress={toggleSubComments}>
          <TextSourceSans style={styles.linkButton}>
            {showSubComments ? 'Hide' : 'Show'} {comment.child_comments.length} answers
          </TextSourceSans>
        </TouchableWithoutFeedback>}
      </View>
      <View style={styles.bottomActionsContainer}>
        <View style={styles.ratingButtons}>
          <ButtonCounter
            icon={arrowUpIcon}
            counter={comment.ratings.positive_ratings}
            onPress={() => handleRate(comment, 1)}
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
            onPress={() => handleRate(comment, -1)}
            highlight={
              comment.ratings.current_user_rating_id &&
              comment.ratings.current_user_rating_value === -1 &&
              comment.ratings.current_user_rating_value
            }
            disabled={!comment.has_rating_permission}
          />
        </View>
        <Button
          icon={commentIcon}
          title="Reply"
          titleStyle={styles.buttonTitle}
          type='clear'
          styles={styles.commentButton}
          onPress={() => {props.handleReply(comment.comment_content_type, comment.id);}}
          disabled={!props.hasCommentingPermission}
        />
        <Button
          icon={redoIcon}
          title="Share"
          titleStyle={styles.buttonTitle}
          type='clear'
        />
      </View>
      {showSubComments &&
        <SubComments
          comments={comment.child_comments}
          handleRate={handleRate}
          setCommentBeingProcessed={setCommentBeingProcessed}
          toggleMenu={props.toggleMenu}
          getCommentTextDisplay={getCommentTextDisplay}
          isDisplayed={isDisplayed}
        />
      }
    </View>
  );
};
