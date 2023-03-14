import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import { LinearProgress } from '@rneui/themed'

import { TextSourceSans } from '../../components/TextSourceSans'
import { COLORS } from '../../theme/colors'

import { styles } from './ExploreListItem.styles'

export const ExploreListItem = (props) => {
  const image = props.item.image
    ? props.item.image
    : null

  const clockIcon = (<IconSLI name='clock' color={COLORS.grey.medium} />)

  const containerHeight = () => {
    if (props.item.description.length > 200) {
      return { height: 530 }
    } else if (props.item.description.length > 120) {
      return { height: 480 }
    } else {
      return { height: 440 }
    }
  }

  const containerStyles = {
    ...styles.container,
    ...containerHeight()
  }

  const imageContainerStyles = () => {
    if (props.item.description.length > 200) {
      return { flex: 1 }
    } else if (props.item.description.length > 120) {
      return { flex: 1 }
    } else {
      return { flex: 2 }
    }
  }

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={() => props.action(props.item)}
      delayPressIn={100}>
      <View style={containerStyles}>
        <View style={imageContainerStyles()}>
          <Image
            style={styles.image}
            source={{ uri: image }}
            accessibilityIgnoresInvertColors={true}
          />
        </View>
        <View style={styles.textContainer}>
          <TextSourceSans style={styles.text}>
            by {props.item.organisation}
          </TextSourceSans>
          <TextSourceSans style={styles.title}>
            {props.item.name}
          </TextSourceSans>
          <TextSourceSans style={styles.text}>
            {props.item.description}
          </TextSourceSans>
        </View>
        <View style={styles.progressContainer}>
          {props.item.module_running_progress && (
            <>
              <LinearProgress
                style={styles.progressBar}
                color={COLORS.primary}
                trackColor={COLORS.grey.extralight}
                value={props.item.module_running_progress/100}
                variant='determinate'
              />
            </>
          )}
          <TextSourceSans style={styles.progressText}>
            {clockIcon} {props.item.participation_time_display}
          </TextSourceSans>
        </View>
      </View>
    </TouchableOpacity>
  )
}
