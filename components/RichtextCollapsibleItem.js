import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import { COLORS } from '../theme/colors';
import { styles } from './RichtextCollapsibleItem.styles';

export const RichtextCollapsibleItem = ({ title, body }) => {
  const [collapsed, setCollapsed] = useState(true);
  const chevron = collapsed
    ? <IconSLI name={'arrow-down'} size={12} color={COLORS.text.main} />
    : <IconSLI name={'arrow-up'} size={12} color={COLORS.text.main} />;

  return (
    <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
      <View style={styles.collapsibleButton}>
        <Text>{title}</Text>
        {chevron}
      </View>
      {!collapsed && <Text>{body}</Text>}
    </TouchableOpacity>
  );
};
