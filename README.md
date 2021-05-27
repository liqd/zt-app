## Setup Development Environment

Prerequisites
- Install NodeJS
- Install via terminal/bash`expo (expo.io): npm install expo-cli --global`

Setup
- Clone repo
- Change directory into project folder `cd zt-app`
- `npm install`
- If you do `npm start` now, a window will open in your browser. If you click "Run on Andoird" or "Run on iOS", it will tell you how set these up.

Run
- Start emulators (Android Studio or XCode)
- `npm start`
- enjoy coding ⌨️ !

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
