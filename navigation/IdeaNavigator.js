import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Linking from 'expo-linking'
import { ExplorePage } from '../containers/Ideas/ExplorePage'
import { Idea } from '../containers/Ideas/Idea'
import { IdeaCreate } from '../containers/Ideas/IdeaCreate'
import { IdeaCreateDescription } from '../containers/Ideas/IdeaCreateDescription'
import { IdeaProject } from '../containers/Ideas/IdeaProject'
import { LoginScreen } from '../containers/Auth/LoginScreen'
import { StartUpScreen } from '../containers/Auth/StartUpScreen'
import { useAuthorization } from '../containers/Auth/AuthProvider.js'
import { ReportCreateMessage } from '../containers/Reports/ReportCreateMessage'
import { ProfileScreen } from '../containers/User/ProfileScreen'
import { SettingsOverview } from '../containers/User/SettingsOverview'
import { SettingsProfile } from '../containers/User/SettingsProfile'
import { DeepLinking } from './DeepLinking.js'

const Stack = createStackNavigator()
const prefix = Linking.createURL('/')
const linking = {
  prefixes: [prefix, 'https://aplus-dev.liqd.net/'],
  config: {
    screens: {
      DeepLinking: '/:organisation/projects/:projectSlug/',
    }
  }
}

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
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SettingsOverview" component={SettingsOverview} />
        <Stack.Screen name="SettingsProfile" component={SettingsProfile} />
      </>
    }
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="StartUp"
        screenOptions={{ headerShown: false }}
      >
        {stackScreen}
        <Stack.Screen name="DeepLinking" component={DeepLinking} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
