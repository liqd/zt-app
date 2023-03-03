import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { TextSourceSans } from '../../components/TextSourceSans'

import { Comment } from './Comment'

export const Comments = (props) => {
  const { t } = useTranslation()
  const { navigation } = props

  return (
    <View>
      <TextSourceSans>
        {t('{{ count }} Entries', {count: props.comments.length})}
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
