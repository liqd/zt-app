## Setup Development Environment

![Build Status](https://github.com/liqd/zt-app/actions/workflows/react.yml/badge.svg)

Prerequisites
- Install NodeJS
- Install via terminal/bash`expo (expo.io): npm install expo-cli --global`
- Install an emulator:
  - Android Studio (see https://docs.expo.dev/workflow/android-studio-emulator/ for setup)
  - Xcode for IOS (only on mac, see https://docs.expo.dev/workflow/ios-simulator/ for setup)

Updates after Hibernation (Technical review)
- Run `expo doctor --fix-dependencies` (working as of 15.02.23)


Setup after Hibernation
- Check correct Node version: 18.4.0 (15.02.23) -> Note: expo-cli has not yet
  been tested against v18.4.0
- Update expo-cli - `npm install -g expo-cli`: 6.3.1 (15.02.23)
- Update Android Studio and/or XCode
- Pull latest zt:app repo and install dependencies (see `Run with new deps` below)
- Update expo go (app on virtual phone) - expo/metro should ask you


Setup
- Clone repo
- Change directory into project folder `cd zt-app`
- `make install`
- If you do `make start` now, a window will open in your browser. If you click
"Run on Android" or "Run on iOS", it will tell you how set these up. You can use
`make start-web` if you want to view in chrome however some styling will be broken.


Run
- Start emulators (Android Studio or XCode)
- `make start`
- enjoy coding ⌨️ !

Run with new deps (node v18.4.0)
- Delete all deps: `make clean`
- Install fresh: `make install`
- Start app: `make start`
- Start with cleared cache: `make start-nocache`
- Check `Makefile` for additional options

Using local api (adhocracy-plus)
- Download and follow setup instructions in aplus and run it locally with `make watch`
- In ZT for Android phones, emulators & simulators just `make start-local`
- For Apple iphones set your local ip in BaseApi.js, then `make start-local`
- In Aplus Repo --> Add or Edit `local.py` --> `ALLOWED_HOSTS = ['10.0.2.2', 'localhost']`

Publishing to expo
- See the wiki.

Note: There is linting included, containing rules of eslint, react, react-native
and react-native-a11y rules.

## Project folder structure of Z:T App

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
/containers/LiveQuestions/__tests__/
/containers/LiveQuestions/LiveQuestions.js
/containers/LiveQuestions/LiveQuestions.styles.js
/navigation
/services
/services/api-services (tbd)
/App.js
```
