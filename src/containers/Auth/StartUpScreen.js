import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import { COLORS } from '../../theme/colors'
import { styles } from '../Ideas/Idea.styles'

export const StartUpScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={COLORS.grey.medium} />
    </View>
  )
}
