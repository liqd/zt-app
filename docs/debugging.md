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
To use your local Aplus, first do 

``export LOCAL_API=true``

in the console window that you start the app with.


# react-devtools
You can also use react-devtools while running the app in an emulator.
You first need to install react-devtools:

``sudo npm install -g react-devtools --unsafe-perm=true``

Then start the app with 
``make start-local`` or ``make start``
and in a separate terminal start react devtools: ``react-devtools``. 
This will open up the react devtools console and you can search for 
your react components at the top and see their states and props.
See also https://docs.expo.dev/workflow/debugging/#debugging-with-react-devtools


