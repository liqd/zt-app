import React, {  useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'
import * as Device from 'expo-device'

import { TextSourceSans } from '../../components/TextSourceSans'

import { Comment } from './Comment'

const getScrollOffset = () => {
  if (Device.osName === 'Android') {
    return 180
  } else if (Device.osName === 'iOS') {
    return 210
  } else if (Device.osName === 'iPadOS') {
    return 230
  }
}

export const Comments = (props) => {
  const commentsListRef = useRef()
  const [commentViewInfo, setCommentViewInfo] = useState([])
  const { t } = useTranslation()
  const { navigation } = props

  // store position of <Comment> and comment id, for later
  // this happens on mount of this component
  const handleOnLayout = (index, commentId, y, height) => {
    commentViewInfo[index] = {commentId, y, height}
    setCommentViewInfo(commentViewInfo)
  }

  // after click on 'reply', this "inbetween" handler will be called to
  // find the comment which has been clicked on. Then the parent's
  // handleReply will be called.
  const handleReplyLayout = (commentContentType, commentObjectPk) => {
    const parentComment = commentViewInfo
      .find(cvc => cvc.commentId === commentObjectPk)
    props.handleReply(
      commentContentType,
      commentObjectPk,
      parentComment.y + parentComment.height + getScrollOffset()
    )
  }

  return (
    <View>
      <TextSourceSans>
        {t('{{ count }} Entry', {count: props.comments.length})}
      </TextSourceSans>
      <ScrollView
        ref={commentsListRef}
      >
        {props.comments.map((comment, index) =>
          <Comment
            key={`comment-${comment.id}`}
            commentId={comment.id}
            onLayout={(y, height) => handleOnLayout(index, comment.id, y, height)}
            comment={comment}
            handleReply={handleReplyLayout}
            openSubComments={(props.commentLastCommented==comment.id)}
            setMenuItems={props.setMenuItems}
            toggleMenu={props.toggleMenu}
            toggleEditing={props.toggleEditing}
            setDeleteModalItems={props.setDeleteModalItems}
            toggleDeleteModal={props.toggleDeleteModal}
            hasCommentingPermission={props.hasCommentingPermission}
            navigation={navigation}
          />)}
      </ScrollView>
    </View>
  )
}
