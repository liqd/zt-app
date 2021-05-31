import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SIZES } from '../theme/fonts';
import { SPACINGS } from '../theme/spacings';

export const Chip = (props) => {
  return (
    <View style={styles.chip}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.text.main,
    paddingVertical: SPACINGS.multiplyBy(.4),
    paddingHorizontal: SPACINGS.multiplyBy(.8),
    borderRadius: 12,
    marginRight: SPACINGS.multiplyBy(.5),
    marginBottom: SPACINGS.multiplyBy(.5)
  },
  text: {
    color: COLORS.text.inverted,
    fontSize: SIZES.multiplyBy(.9375)
  }
});
