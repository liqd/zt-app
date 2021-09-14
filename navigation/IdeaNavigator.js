import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ExplorePage } from '../containers/Ideas/ExplorePage';
import { Idea } from '../containers/Ideas/Idea';
import { IdeaCreate } from '../containers/Ideas/IdeaCreate';
import { IdeaProject } from '../containers/Ideas/IdeaProject';
import { LoginScreen } from '../containers/Auth/LoginScreen';
import { StartUpScreen } from '../containers/Auth/StartUpScreen';
import { useAuthorization } from '../containers/Auth/AuthProvider.js';

const Stack = createStackNavigator();

export const IdeaNavigator = () => {
  const { loading, token } = useAuthorization();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StartUp"
        screenOptions={{ gestureEnabled: false, headerShown: false }}
      >
        {loading ? (
          <Stack.Screen name="StartUp" component={StartUpScreen} />
        ) : token == null ? (
          <Stack.Screen name="Auth" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="ExplorePage" component={ExplorePage} />
            <Stack.Screen name="IdeaProject" component={IdeaProject} />
            <Stack.Screen name="IdeaDetail" component={Idea} />
            <Stack.Screen name="IdeaCreate" component={IdeaCreate} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
