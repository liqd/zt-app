import React, { useState } from 'react'
import { Text, TouchableOpacity,View } from 'react-native'
import IconFA from 'react-native-vector-icons/FontAwesome'

import { COLORS } from '../theme/colors'

import { styles } from './RichtextCollapsibleItem.styles'

export const RichtextCollapsibleItem = ({ title, body }) => {
  const [collapsed, setCollapsed] = useState(true)
  const chevron = collapsed
    ? <IconFA name={'plus'} size={20} color={COLORS.text} />
    : <IconFA name={'minus'} size={20} color={COLORS.text} />

  return (
    <TouchableOpacity
      accessibilityRole="button" 
      onPress={() => setCollapsed(!collapsed)}
    >
      <View style={styles.collapsibleButton}>
        <Text style={styles.collapsibleButtonTitle}>
          {title}
        </Text>
        <View style={styles.collapsibleIcon}>
          {chevron}
        </View>
      </View>
      {!collapsed && (
        <View style={styles.collapsibleBody}>
          <Text>{body}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}
