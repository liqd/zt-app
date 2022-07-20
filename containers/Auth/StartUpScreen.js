import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import { styles } from '../Ideas/Idea.styles'
import { COLORS } from '../../theme/colors'

export const StartUpScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={COLORS.grey.medium} />
    </View>
  )
}
