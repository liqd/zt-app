import React, { useCallback,useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image,View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import { Button } from '@rneui/base'

import { ButtonCounter } from '../../components/ButtonCounter'
import { TextSourceSans } from '../../components/TextSourceSans'

import { styles } from './Comment.styles'

const NUM_OF_LINES = 2

export const SubComment = (props) => {
  const { t } = useTranslation()
  const [showWholeComment, setShowWholeComment] = useState(false)
  const [hasExcerpt, setHasExcerpt] = useState(false)
  const [numOfLines, setNumOfLines] = useState(0)

  const toggleWholeComment = () => {
    setShowWholeComment(!showWholeComment)
  }

  const onTextLayout = useCallback(e => {
    if (e.nativeEvent.lines.length > NUM_OF_LINES) {
      setNumOfLines(NUM_OF_LINES)
      setHasExcerpt(true)
    }
  }, [])

  const optionsIcon = (<IconSLI name='options-vertical' size={22} />)
  const arrowUpIcon = (<IconSLI name='arrow-up' size={18} />)
  const arrowDownIcon = (<IconSLI name='arrow-down' size={18} />)
  const redoIcon = (<IconSLI name='action-redo' size={18} />)

  return (
    <View style={styles.subContainer}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          {props.isDisplayed(props.comment) &&
          <Image
            source={{ uri: (props.comment.user_image)
              ? props.comment.user_image
              : props.comment.user_image_fallback }}
            style={styles.avatar}
            accessibilityIgnoresInvertColors={true}
          />
          }
          <View style={styles.author}>
            <TextSourceSans style={styles.username}>{props.comment.user_name}</TextSourceSans>
            {props.isDisplayed(props.comment) &&
            <TextSourceSans style={styles.date}>{props.comment.created}</TextSourceSans>
            }
          </View>
        </View>
        {props.isDisplayed(props.comment) &&
        <TextSourceSans>
          <Button
            icon={optionsIcon}
            type='clear'
            onPress={() => props.handleOptions(props.comment)}
          />
        </TextSourceSans>
        }
      </View>
      {!showWholeComment &&
        <TextSourceSans
          style={styles.comment}
          numberOfLines={numOfLines}
          onTextLayout={onTextLayout}
        >
          {props.getCommentTextDisplay(props.comment)}
        </TextSourceSans>
      }
      {showWholeComment &&
      <TextSourceSans style={styles.comment}>
        {props.comment.comment}
      </TextSourceSans>
      }
      <View style={styles.linkSection}>
        {hasExcerpt &&
          <TouchableWithoutFeedback
            accessibilityRole="button"
            onPress={toggleWholeComment}
          >
            <TextSourceSans style={styles.linkButton}>
              {showWholeComment
                ? t('Read Less')
                : t('Read More')}
            </TextSourceSans>
          </TouchableWithoutFeedback>}
      </View>
      {props.isDisplayed(props.comment) &&
      <View style={styles.bottomActionsContainer}>
        <View style={styles.ratingButtons}>
          <ButtonCounter
            icon={arrowUpIcon}
            counter={props.comment.ratings.positive_ratings}
            onPress={() => props.handleRate(props.comment, 1)}
            highlight={
              props.comment.ratings.current_user_rating_id &&
              props.comment.ratings.current_user_rating_value === 1 &&
              props.comment.ratings.current_user_rating_value
            }
            rating='pos'
            disabled={!props.comment.user_info.has_rating_permission}
          />
          <ButtonCounter
            icon={arrowDownIcon}
            counter={props.comment.ratings.negative_ratings}
            onPress={() => props.handleRate(props.comment, -1)}
            highlight={
              props.comment.ratings.current_user_rating_id &&
              props.comment.ratings.current_user_rating_value === -1 &&
              props.comment.ratings.current_user_rating_value
            }
            rating='neg'
            disabled={!props.comment.user_info.has_rating_permission}
          />
        </View>
        <Button
          icon={redoIcon}
          title={t('Share')}
          titleStyle={styles.buttonTitle}
          type='clear'
        />
      </View>
      }
    </View>
  )
}
