import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { COLORS } from '../../theme/colors'
import { styles } from './ExploreListItem.styles'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import { TextSourceSans } from '../../components/TextSourceSans'
import { LinearProgress } from '@rneui/themed'

export const ExploreListItem = (props) => {
  const image = props.item.image
    ? props.item.image
    : null

  const clockIcon = (<IconSLI name='clock' color={COLORS.grey.medium} />)

  return (
    <TouchableOpacity accessibilityRole="button" onPress={() => props.action(props.item)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
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
