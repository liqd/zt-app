import React from 'react';
import { Button, View } from 'react-native';

// *** SAMPLE COMPONENT ***

export const IconButton = (props) => {
  const iconedTitle = `🚁 ${props.children}`;

  return (
    <View>
      <Button onPress={props.action} title={iconedTitle} />
    </View>
  );
};