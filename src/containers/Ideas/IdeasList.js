import React from 'react'
import { useTranslation } from 'react-i18next'
import {View} from 'react-native'

import {TextSourceSans} from '../../components/TextSourceSans'

import {IdeasListItem} from './IdeasListItem'

export const IdeasList = props => {
  const {t} = useTranslation()
  //do not pass ideas to child components
  const {ideas, ...otherProps} = props
  return (
    <View>
      {ideas && ideas.length > 0
        ? (
          props.ideas.map(idea => {
            return (
              <IdeasListItem key={`pk${idea.pk}`} idea={idea} {...otherProps} />
            )
          })
        )
        : (
          <TextSourceSans>
            {t('No ideas found. Be the first to add an idea!')}
          </TextSourceSans>
        )}
    </View>
  )
}
