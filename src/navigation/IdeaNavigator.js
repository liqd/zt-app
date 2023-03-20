import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Linking from 'expo-linking'

import { useAuthorization } from '../containers/Auth/AuthProvider.js'
import { LoginScreen } from '../containers/Auth/LoginScreen'
import { StartUpScreen } from '../containers/Auth/StartUpScreen'
import { ExplorePage } from '../containers/Ideas/ExplorePage'
import { Idea } from '../containers/Ideas/Idea'
import { IdeaCreate } from '../containers/Ideas/IdeaCreate'
import { IdeaCreateDescription } from '../containers/Ideas/IdeaCreateDescription'
import { IdeaProject } from '../containers/Ideas/IdeaProject'
import { ReportCreateMessage } from '../containers/Reports/ReportCreateMessage'
import { ProfileScreen } from '../containers/User/ProfileScreen'
import { SettingsOverview } from '../containers/User/SettingsOverview'
import { SettingsProfile } from '../containers/User/SettingsProfile'
import { SettingsProfileAvatar } from '../containers/User/SettingsProfileAvatar'

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
  const { t } = useTranslation()
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
        <Stack.Screen name="IdeaCreate" component={IdeaCreate}
          options={{
            headerTitle: t('Submit your idea'),
            // headerBackTitle only for iOS
            headerBackTitle: t('Back')
          }} />
        <Stack.Screen name="IdeaCreateDescription" component={IdeaCreateDescription}
          options={{
            headerTitle: t('Add your description'),
            // headerBackTitle only for iOS
            headerBackTitle: t('Back')
          }} />
        <Stack.Screen name="ReportCreateMessage" component={ReportCreateMessage}
          options={{
            headerTitle: t('Add your message'),
            // headerBackTitle only for iOS
            headerBackTitle: t('Back')
          }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SettingsOverview" component={SettingsOverview} />
        <Stack.Screen name="SettingsProfile" component={SettingsProfile} />
        <Stack.Screen name="SettingsProfileAvatar" component={SettingsProfileAvatar} />
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
