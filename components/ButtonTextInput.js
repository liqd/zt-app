import React from 'react';
import { View } from 'react-native';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import { Button } from 'react-native-elements';
import { styles } from './ButtonTextInput.styles';
import { COLORS } from '../theme/colors';

import { TouchableOpacity } from 'react-native';
import { TextSourceSans } from './TextSourceSans';

export const ButtonTextInputFieldContainer = (props) => {
  return (
    <View>
      <TextSourceSans style={styles.formLabel}>{props.field}</TextSourceSans>
      {props.children}
    </View>
  );
};

export const ButtonTextInput = (props) => {
  const arrowRightIcon = (<IconSLI name='arrow-right' size={22} color={COLORS.grey.light}/>);

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.textInputButton}
      disabled={props.disabled}
    >
      <TextSourceSans style={styles.textInputButtonTitle}>
        {props.title}
      </TextSourceSans>
      <TextSourceSans style={styles.textInputButtonTitle}>
        {arrowRightIcon}
      </TextSourceSans>
    </TouchableOpacity>
  );
};
