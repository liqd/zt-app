import React, { useCallback, useEffect, useRef,useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Image, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import { Button } from '@rneui/base'

import API from '../../BaseApi'
import { ButtonCounter } from '../../components/ButtonCounter'
import { TextSourceSans } from '../../components/TextSourceSans'

import { styles } from './Comment.styles'
import { SubComments } from './SubComments'

const NUM_OF_LINES = 2

export const Comment = (props) => {
  const { t } = useTranslation()
  const [showSubComments, setShowSubComments] = useState(false)
  const [showWholeComment, setShowWholeComment] = useState(false)
  const [hasExcerpt, setHasExcerpt] = useState(false)
  const [comment, setComment] = useState(props.comment)
  const processing = useRef(false)

  const getCommentMenuItems = (commentInstance) => {
    return [
      {
        title: t('Edit'),
        icon: 'pencil',
        action: () => props.toggleEditing(commentInstance),
        isFirst: true,
        isAllowed: commentInstance.user_info.has_changing_permission
      },
      {
        title: t('Delete'),
        icon: 'trash',
        action: () => props.toggleDeleteModal(),
        isAllowed: commentInstance.user_info.has_deleting_permission
      },
      {
        title: t('Report'),
        icon: 'flag',
        action: () => {
          props.toggleMenu()
          props.navigation.navigate('ReportCreateMessage', {
            content_type: commentInstance.comment_content_type,
            object_pk: commentInstance.id
          })
        },
        isFirst: !commentInstance.user_info.has_changing_permission && !commentInstance.user_info.has_deleting_permission,
        isLast: true,
        isAllowed: true
      },
      {
        title: t('Cancel'),
        action: () => props.toggleMenu(),
        isCancel: true,
        isAllowed: true
      },
    ]
  }

  const getCommentDeleteModalItems = (commentInstance) => {
    return [
      {
        title: [t('This comment will be deleted.'), t('This action cannot be undone.')],
        isText: true
      },
      {
        title: t('Delete'),
        action: () => deleteComment(commentInstance)
      },
      {
        title: t('Cancel'),
        action: () => props.toggleDeleteModal(),
        isCancel: true
      },
    ]
  }

  useEffect(() => {
    setComment(props.comment)
    props.openSubComments && setShowSubComments(true)
  }, [props.openSubComments, props.comment])

  const toggleSubComments = () => {
    setShowSubComments(!showSubComments)
  }

  const toggleWholeComment = () => {
    setShowWholeComment(!showWholeComment)
  }

  const onTextLayout = useCallback(e => {
    setHasExcerpt(e.nativeEvent.lines.length > NUM_OF_LINES)
  }, [])

  function handleOptions(commentInstance) {
    props.setDeleteModalItems(getCommentDeleteModalItems(commentInstance))
    props.setMenuItems(getCommentMenuItems(commentInstance))
    props.toggleMenu()
  }

  const handleRate = async(commentInstance, value) => {
    if (processing.current) return
    processing.current = true
    const newComment = await rate(commentInstance, value)
    if (newComment) {
      processing.current = false
    }
  }

  const rate = async(commentInstance, value) => {
    if (commentInstance.ratings.current_user_rating_id) {
      if (commentInstance.ratings.current_user_rating_value !== value) {
        await API.changeRating(
          commentInstance.comment_content_type,
          commentInstance.id,
          commentInstance.ratings.current_user_rating_id,
          {value: value}
        )
      } else {
        await API.changeRating(
          commentInstance.comment_content_type,
          commentInstance.id,
          commentInstance.ratings.current_user_rating_id,
          {value: 0}
        )
      }
    } else {
      await API.postRating(
        commentInstance.comment_content_type,
        commentInstance.id,
        {value: value}
      )
    }
    return await fetchComment()
  }

  const fetchComment = () => {
    return API.getComment(
      comment.content_type,
      comment.object_pk,
      comment.id,
    )
      .then(response => {
        setComment(response.data)
        return response.data
      })
  }

  const deleteComment = (commentInstance) => {
    API.deleteComment(
      commentInstance.content_type,
      commentInstance.object_pk,
      commentInstance.id,
    )
      .then((response) => {
        const {statusCode, data} = response
        props.toggleDeleteModal()
        if (statusCode == 200) {
          if (commentInstance.user_info.is_users_own_comment) {
            Alert.alert(
              t('Your comment was deleted.'),
              t('Thank you for participating!'),
              [{ text: 'Ok' }]
            )
          } else {
            Alert.alert(
              t('This comment was deleted.'),
              t('Thank you for moderating!'),
              [{ text: 'Ok' }]
            )
          }
          fetchComment()
        } else {
          const errorMessage = 'That did not work.'
          let errorDetail
          if (statusCode==403) {
            errorDetail = data.detail
          } else if (statusCode == 400) {
            errorDetail = 'Bad request'
          }
          Alert.alert(errorMessage, errorDetail, [{ text: 'Ok' }])
        }
      })
  }

  const getCommentTextDisplay = (commentInstance) => {
    if (commentInstance.is_removed) {
      return t('Deleted by creator on ') + commentInstance.modified
    } else if (commentInstance.is_censored || commentInstance.is_blocked) {
      return t('Deleted by moderation on ')+ commentInstance.modified
    } else {
      return commentInstance.comment
    }
  }

  const isDisplayed = (commentInstance) => {
    return !(commentInstance.is_deleted || commentInstance.is_blocked)
  }

  const optionsIcon = (<IconSLI name='options-vertical' size={22} />)
  const arrowUpIcon = (<IconSLI name='arrow-up' size={18} />)
  const arrowDownIcon = (<IconSLI name='arrow-down' size={18} />)
  const commentIcon = (<IconSLI name='bubble' size={18} />)
  const redoIcon = (<IconSLI name='action-redo' size={18} />)

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          {isDisplayed(comment) &&
          <Image
            source={{ uri: (comment.user_image) ? comment.user_image : comment.user_image_fallback }}
            style={styles.avatar}
            accessibilityIgnoresInvertColors={true}
          />
          }
          <View style={styles.author}>
            <TextSourceSans style={styles.username}>
              {comment.user_name}
            </TextSourceSans>
            {isDisplayed(comment) &&
            <TextSourceSans style={styles.date}>
              {comment.created}
            </TextSourceSans>
            }
          </View>
        </View>
        {isDisplayed(comment) &&
        <TextSourceSans>
          <Button
            testID={'options_button_' + comment.id}
            icon={optionsIcon}
            type='clear'
            onPress={() => handleOptions(comment)}
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
        {hasExcerpt &&
          <TouchableWithoutFeedback
            accessibilityRole="button"
            onPress={toggleWholeComment}
          >
            <TextSourceSans style={styles.linkButton}>
              {showWholeComment ? t('Read Less') : t('Read More')}
            </TextSourceSans>
          </TouchableWithoutFeedback>}
      </View>
      <View style={styles.linkSection}>
        {comment.child_comments.length !== 0 &&
          <TouchableWithoutFeedback
            accessibilityRole="button"
            onPress={toggleSubComments}
          >
            <TextSourceSans style={styles.linkButton}>
              {t('{{ state }} {{ count }} answers',
                {state: showSubComments ? t('Hide') : t('Show') ,
                  count: comment.child_comments.length})}
            </TextSourceSans>
          </TouchableWithoutFeedback>
        }
      </View>
      <View style={styles.bottomActionsContainer}>
        <View style={styles.ratingButtons}>
          <ButtonCounter
            icon={arrowUpIcon}
            labelText={t('up-votes')}
            hintText={t('click to up vote')}
            counter={comment.ratings.positive_ratings}
            onPress={() => handleRate(comment, 1)}
            highlight={
              comment.ratings.current_user_rating_id &&
              comment.ratings.current_user_rating_value === 1 &&
              comment.ratings.current_user_rating_value
            }
            disabled={!comment.user_info.has_rating_permission}
          />
          <ButtonCounter
            icon={arrowDownIcon}
            labelText={t('down-votes')}
            hintText={t('click to down vote')}
            counter={comment.ratings.negative_ratings}
            onPress={() => handleRate(comment, -1)}
            highlight={
              comment.ratings.current_user_rating_id &&
              comment.ratings.current_user_rating_value === -1 &&
              comment.ratings.current_user_rating_value
            }
            disabled={!comment.user_info.has_rating_permission}
          />
        </View>
        <Button
          icon={commentIcon}
          title={t('Reply')}
          titleStyle={styles.buttonTitle}
          type='clear'
          styles={styles.commentButton}
          onPress={() => {props.handleReply(comment.comment_content_type, comment.id)}}
          disabled={!props.hasCommentingPermission}
        />
        <Button
          icon={redoIcon}
          title={t('Share')}
          titleStyle={styles.buttonTitle}
          type='clear'
        />
      </View>
      {showSubComments &&
        <SubComments
          comments={comment.child_comments}
          handleRate={handleRate}
          handleOptions={handleOptions}
          toggleMenu={props.toggleMenu}
          getCommentTextDisplay={getCommentTextDisplay}
          isDisplayed={isDisplayed}
        />
      }
    </View>
  )
}
