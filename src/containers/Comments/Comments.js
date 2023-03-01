import React from 'react'
import { View } from 'react-native'

import { TextSourceSans } from '../../components/TextSourceSans'

import { Comment } from './Comment'

export const Comments = (props) => {
  const { navigation } = props

  return (
    <View>
      <TextSourceSans>
        {props.comments.length} {props.comments.length !== 1
          ? 'Entries'
          : 'Entry'}
      </TextSourceSans>
      {props.comments.map((comment) =>
        <Comment
          key={`comment-${comment.id}`}
          comment={comment}
          handleReply={props.handleReply}
          openSubComments={(props.commentLastCommented==comment.id)}
          setMenuItems={props.setMenuItems}
          toggleMenu={props.toggleMenu}
          toggleEditing={props.toggleEditing}
          setDeleteModalItems={props.setDeleteModalItems}
          toggleDeleteModal={props.toggleDeleteModal}
          hasCommentingPermission={props.hasCommentingPermission}
          navigation={navigation}
        />)}
    </View>
  )
}
