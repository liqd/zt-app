import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ExplorePage } from '../containers/Ideas/ExplorePage'
import { Idea } from '../containers/Ideas/Idea'
import { IdeaCreate } from '../containers/Ideas/IdeaCreate'
import { IdeaCreateDescription } from '../containers/Ideas/IdeaCreateDescription'
import { IdeaProject } from '../containers/Ideas/IdeaProject'
import { LoginScreen } from '../containers/Auth/LoginScreen'
import { StartUpScreen } from '../containers/Auth/StartUpScreen'
import { useAuthorization } from '../containers/Auth/AuthProvider.js'
import { ReportCreateMessage } from '../containers/Reports/ReportCreateMessage'

const Stack = createStackNavigator()

export const IdeaNavigator = () => {
  const { loading, token } = useAuthorization()

  let stackScreen
  if (loading) {
    stackScreen = <Stack.Screen name="StartUp" component={StartUpScreen} />
  } else {
    if (token == null) {
      stackScreen = <Stack.Screen name="Auth" component={LoginScreen} />
    } else {
      stackScreen = <>
        <Stack.Screen name="ExplorePage" component={ExplorePage} />
        <Stack.Screen name="IdeaProject" component={IdeaProject} />
        <Stack.Screen name="IdeaDetail" component={Idea} />
        <Stack.Screen name="IdeaCreate" component={IdeaCreate} />
        <Stack.Screen name="IdeaCreateDescription" component={IdeaCreateDescription} />
        <Stack.Screen name="ReportCreateMessage" component={ReportCreateMessage} />
      </>
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StartUp"
        screenOptions={{ gestureEnabled: false, headerShown: false }}
      >
        {stackScreen}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
