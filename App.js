import React from 'react';
import * as Sentry from 'sentry-expo';
import IdeaNavigator from './navigation/IdeaNavigator';

Sentry.init({
  url: 'https://sentry.liqd.net',
  dsn: '',
  enableInExpoDevelopment: false,
  debug: false, 
});

const App = () => {
  return (
    <IdeaNavigator />
  );
};

export default App;
