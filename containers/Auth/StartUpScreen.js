import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../Ideas/Idea.styles';
import { COLORS } from '../../theme/colors';

export const StartUpScreen = (props) => {

  useEffect(() => {
    const tryLogin = async () => {
      const authToken = await AsyncStorage.getItem('authToken');
      if (!authToken) {
        props.navigation.navigate('Auth');
      }
      else {
        props.navigation.navigate('Ideas');
      }
    };
    tryLogin();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={COLORS.grey.medium} />
    </View>
  );
};
