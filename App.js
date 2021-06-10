import React from 'react';
import * as Sentry from 'sentry-expo';
import { AuthProvider } from './containers/Auth/AuthProvider';
import { IdeaNavigator } from './navigation/IdeaNavigator';

Sentry.init({
  url: 'https://sentry.liqd.net',
  dsn: '',
  enableInExpoDevelopment: false,
  debug: false,
});

const App = () => {
  return (
    <AuthProvider>
      <IdeaNavigator />
    </AuthProvider>
  );
};

export default App;
