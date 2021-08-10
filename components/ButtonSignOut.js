import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './ButtonSignOut.styles';
import {useAuthorization} from '../containers/Auth/AuthProvider.js';

export const ButtonSignOut = () => {
  const {signOut} = useAuthorization();
  return (
    <View style={styles.logoutContainer}>
      <Button
        onPress={signOut}
        title='Sign out'
        type='clear'
      />
    </View>
  );
};
