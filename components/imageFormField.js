import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Image, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { styles } from './imageFormField.styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';


export const ImageCaptureFormField = () => {
  const [capturedImage, setCapturedImage] = useState(null);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status != 'granted') {
      Alert.alert('You need to grant access to camera',
        [{text: 'Okay'}]
      );
      return false;
    }
    return true;
  };

  const captureImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if(!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    setCapturedImage(image.uri);
  };

  return (
    <View style={styles.formImagePicker}>
      <Button
        title='Camera'
        onPress={captureImageHandler}
        icon={<Icon name='camera' style={styles.iconButton} />}
        type='outline'
        raised='true'
        titleStyle={styles.textDark}
      />
      {capturedImage && ( <Image style={styles.formImage} source={{uri: capturedImage}} />)}
    </View>
  );
};

export const ImagePickerFormField = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.formImagePicker}>
      <Button
        title='Library'
        onPress={pickImage}
        type='outline'
        raised='true'
        icon={<Icon name='picture' style={styles.iconButton} />}
        titleStyle={styles.textDark}
      />
      {image && <Image style={styles.formImage} source={{ uri: image }} />}
    </View>
  );
};

export const ImageChoiceFormFieldContainer = (props) => {
  return (
    <View style={styles.formRow}>
      <Text style={styles.formLabel}>{props.field}</Text>
      {props.children}
    </View>
  );
};
