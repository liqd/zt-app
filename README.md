## Setup Development Environment

![Build Status](https://github.com/liqd/zt-app/actions/workflows/react.yml/badge.svg)

Prerequisites
- Install NodeJS
- Install via terminal/bash`expo (expo.io): npm install expo-cli --global`
- Install an emulator, e.g. Android Studio (see https://docs.expo.dev/workflow/android-studio-emulator/ for setup)

Setup
- Clone repo
- Change directory into project folder `cd zt-app`
- `npm install`
- If you do `npm start` now, a window will open in your browser. If you click "Run on Andoird" or "Run on iOS", it will tell you how set these up.

Setup after Hibernation
- Check correct Node version: 18.3.0 (15.6.22) -> Note: expo-cli has not yet been tested against v18.3.0
- Update expo-cli - `npm install -g expo-cli`: 5.4.9 (15.6.22)
- Update Android Studio and/or XCode
- Pull latest zt:app repo and install dependencies (see `Run with new deps` below)
- Update expo go (app on virtual phone) - expo/metro should ask you

Run
- Start emulators (Android Studio or XCode)
- `npm start`
- enjoy coding ⌨️ !

Run with new deps (node v18.3.0)
- Delete all deps `rm -rf node_modules`
- Install fresh `npm install`
- Start with cleared cache `expo start -c`

Using local backend (adhocracy-plus)
- App Repo --> BaseApi.js --> `const baseUrl = 'http://10.0.2.2:8004/api';`
- Aplus Repo --> Add or Edit `local.py` --> `ALLOWED_HOSTS = [u'10.0.2.2', u'localhost']`

Publishing to expo
- Add the sentry dsn for the dev or prod project in App.js
- `expo publish --release-channel dev` (or prod)
- To also upload the sourcemaps to sentry use `SENTRY_PROJECT=zt-app-dev
SENTRY_AUTH_TOKEN=<the secret token> expo publish --release-channel dev`
instead (for prod replace `zt-app-dev` with `zt-app` and use the prod release channel).

Note: There is already a very first attempt of linting included, containing rules
of eslint, react and react-native rules. To be added react-native-a11y rules.

## Project folder structure of Z:T App
tbd

example:
```
/assets
/assets/global-styles
/assets/...
/components
/components/IconButton.js
/components/IconButton.styles.js
/containers
/containers/LiveQuestions
/containers/LiveQuestions/LiveQuestions.js
/containers/LiveQuestions/LiveQuestions.styles.js
/navigation
/services
/services/api-services (tbd)
/services/redux-services (tbd)
/services/contexts (tbd)
/App.js
/App.styles.js
```
