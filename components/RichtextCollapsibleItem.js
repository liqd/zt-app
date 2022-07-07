import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import { COLORS } from '../theme/colors';
import { styles } from './RichtextCollapsibleItem.styles';

export const RichtextCollapsibleItem = ({ title, body }) => {
  const [collapsed, setCollapsed] = useState(true);
  const chevron = collapsed
    ? <IconSLI name={'plus'} size={24} color={COLORS.text.main} />
    : <IconSLI name={'minus'} size={24} color={COLORS.text.main} />;

  return (
    <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
      <View style={styles.collapsibleButton}>
        <Text>{title}</Text>
        <View style={styles.collapsibleIcon}>{chevron}</View>
      </View>
      {!collapsed && (
        <View style={styles.collapsibleBody}>
          <Text>{body}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
