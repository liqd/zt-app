# Android debug bridge
When running the app in android, you can use adb (android debug bridge), to get additional logging output. 
You need to install adb 

``sudo apt-get install adb``

and then type 
``adb logcat`` to output the logs in your console while running the app.

To filter the output for only react-native entries, type
``adb logcat *:S ReactNative:V ReactNativeJS:V``

See also here https://developer.android.com/studio/command-line/logcat for further information.

# Web developer tools
You can also start the app in a browser (chrome or chromium) and use the web developer tools to see additional output.
To do so, start the app with 
``make start-web``
and open the url given in chrome or chromium.
When using your local Aplus, make sure to set

``const baseUrl = 'http://localhost:8004/api';``

in BaseApi.js


