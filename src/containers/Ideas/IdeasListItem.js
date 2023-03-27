import React from 'react'
import { TouchableOpacity,View } from 'react-native'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'

import { ButtonCounter } from '../../components/ButtonCounter'
import { Label } from '../../components/Label'
import { TextSourceSans } from '../../components/TextSourceSans'

import { styles } from './IdeasListItem.styles'

export const IdeasListItem = (props) => {
  const {
    name,
    created,
    creator,
    category,
    comment_count: commentCount,
    positive_rating_count: upCount,
    negative_rating_count: downCount,
  } = props.idea

  const pressHandler = () =>
    props.navigation.navigate('IdeaDetail', {
      idea: props.idea,
      module: props.module,
    })

  const getCategory = () => {
    let categoryList = []
    category && categoryList.push(category.name)
    return categoryList
  }

  const arrowUpIcon = <IconSLI name='arrow-up' size={16} />
  const arrowDownIcon = <IconSLI name='arrow-down' size={16} />
  const commentIcon = <IconSLI name='bubble' size={16} />

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={pressHandler}
      delayPressIn={50}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TextSourceSans style={styles.title} accessibilityRole="header">{name}</TextSourceSans>
          {getCategory().length > 0
            ? (
              <View style={styles.labelsContainer}>
                {getCategory().map((category, idx) => (
                  <View
                    key={idx + category}
                    style={styles.labelWrapper}
                  >
                    <Label  title={category} />
                  </View>
                ))}
              </View>
            )
            : (
              <View style={styles.noLabelSpacing}></View>)}
        </View>
        <View style={styles.bottomContainer}>
          <TextSourceSans style={styles.creatorText}>{creator}</TextSourceSans>
          <View style={styles.infoContainer}>
            <TextSourceSans style={styles.date}>
              {created}
            </TextSourceSans>
            <View style={styles.counters}>
              <ButtonCounter icon={arrowUpIcon} counter={upCount} disabled list />
              <ButtonCounter icon={arrowDownIcon} counter={downCount} disabled list />
              <ButtonCounter icon={commentIcon} counter={commentCount} disabled list />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
