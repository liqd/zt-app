import React from 'react';
import * as Sentry from 'sentry-expo';
import { AuthProvider } from './containers/Auth/AuthProvider';
import { IdeaNavigator } from './navigation/IdeaNavigator';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  SourceSansPro_400Regular
} from '@expo-google-fonts/source-sans-pro';

Sentry.init({
  url: 'https://sentry.liqd.net',
  dsn: '',
  enableInExpoDevelopment: false,
  debug: false,
});

const App = () => {
  const [fontsLoaded] = useFonts({
    SourceSansPro_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {
    return (
      <AuthProvider>
        <IdeaNavigator />
      </AuthProvider>
    );
  }
};

export default App;
