import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FONTS, SIZES } from '../theme/fonts';

export const TextSourceSans = (props) => {
  const mergedStyles = props.style
    ? [styles.font, props.style]
    : styles.font;
  return (
    <Text style={mergedStyles}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  font: {
    fontFamily: FONTS.familySans,
  }
});
