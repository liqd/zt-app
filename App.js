import 'react-native-gesture-handler' /* eslint-disable-line */
import React, { useCallback,useEffect, useState } from 'react'
import { View } from 'react-native'
import {
  SourceSansPro_400Regular,
  SourceSansPro_600SemiBold,
} from '@expo-google-fonts/source-sans-pro'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import * as Sentry from 'sentry-expo'
import 'intl-pluralrules'

import { loadLanguage } from './src/i18n'
import { AuthProvider } from './src/containers/Auth/AuthProvider'
import { IdeaNavigator } from './src/navigation/IdeaNavigator'

Sentry.init({
  url: 'https://sentry.liqd.net',
  dsn: '',
  enableInExpoDevelopment: false,
  debug: false,
})

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false)
  useEffect(() => {
    (async function () {
      try {
        await SplashScreen.preventAutoHideAsync()
        await Font.loadAsync({ SourceSansPro_400Regular })
        await Font.loadAsync({ SourceSansPro_600SemiBold })
        await loadLanguage()
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    })()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }
  return (
    <View
    style={{ flex: 1 }} /* eslint-disable-line */
      onLayout={onLayoutRootView}
    >
      <AuthProvider>
        <IdeaNavigator />
      </AuthProvider>
    </View>
  )
}

export default App
