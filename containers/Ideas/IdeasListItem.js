import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { styles } from './IdeasListItem.styles'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'

import { ButtonCounter } from '../../components/ButtonCounter'
import { DateService } from '../../services/DateService'
import { Label } from '../../components/Label'
import { TextSourceSans } from '../../components/TextSourceSans'

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

  const arrowUpIcon = <IconSLI name='arrow-up' size={18} />
  const arrowDownIcon = <IconSLI name='arrow-down' size={18} />
  const commentIcon = <IconSLI name='bubble' size={18} />

  return (
    <TouchableOpacity accessibilityRole="button" onPress={pressHandler}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TextSourceSans style={styles.title}>{name}</TextSourceSans>
          {getCategory().length > 0 ? (
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
          ) : (
            <View style={styles.noLabelSpacing}></View>)}
        </View>
        <View style={styles.bottomContainer}>
          <TextSourceSans style={styles.text}>{creator}</TextSourceSans>
          <View style={styles.infoContainer}>
            <TextSourceSans style={styles.date}>
              {DateService(created)}
            </TextSourceSans>
            <View style={styles.counters}>
              <ButtonCounter icon={arrowUpIcon} counter={upCount} disabled />
              <ButtonCounter icon={arrowDownIcon} counter={downCount} disabled />
              <ButtonCounter icon={commentIcon} counter={commentCount} disabled />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
