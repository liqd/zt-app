import React from 'react';
import { Button } from 'react-native-elements';
import { styles } from './ButtonSubmit.styles';

export const ButtonSubmit = (props) => {
  return (
    <Button
      title={props.title}
      onPress={props.onPress}
      buttonStyle={styles.submitButton}
      disabled={props.disabled}
    />
  );
};
