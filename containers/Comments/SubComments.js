import React from 'react'
import { View } from 'react-native'

import { SubComment } from './SubComment'

export const SubComments = (props) => {
  return (
    <View>
      {props.comments.map((comment) =>
        <SubComment
          key={`comment-${comment.id}`}
          comment={comment}
          handleRate={props.handleRate}
          handleOptions={props.handleOptions}
          toggleMenu={props.toggleMenu}
          getCommentTextDisplay={props.getCommentTextDisplay}
          isDisplayed={props.isDisplayed}
        />)}
    </View>
  )
}
