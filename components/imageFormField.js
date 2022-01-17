import React, { useState, useEffect } from 'react';
import { View, Alert, Image, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './imageFormField.styles';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import * as ImagePicker from 'expo-image-picker';
import { TextSourceSans } from './TextSourceSans';
import mime from 'mime';

export const ImagePickerFormField = (props) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      props.onSetImage(result);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  const captureImageHandler = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    // eslint-disable-next-line
    const nameRegex = /[^\/]*$/;
    const imgName = result.uri.match(nameRegex);
    imgName ? (result.name = imgName[0]) : 'unknown';

    const extRegex = /\w+$/;
    const imgExt = imgName[0].match(extRegex);
    imgExt ? (result.mimeType = mime.getType(imgExt[0])) : 'image/jpeg';

    if (!result.cancelled) {
      setCapturedImage(result.uri);
      props.onSetImage(result);
    }
  };

  const cameraIcon = <IconSLI name='camera' style={styles.iconButton} />;
  const pictureIcon = <IconSLI name='picture' style={styles.iconButton} />;

  return (
    <>
      <View style={styles.formImagePicker}>
        {!capturedImage && !image &&
        <Button
          buttonStyle={styles.imageAddButton}
          title='Camera'
          onPress={captureImageHandler}
          icon={cameraIcon}
          type='clear'
          titleStyle={styles.textDark}
          imageUri={capturedImage}
        />}
        {capturedImage && <Image style={styles.formImage} source={{uri: capturedImage}} />}
      </View>
      <View style={styles.formImagePicker}>
        {!capturedImage && !image &&
        <Button
          buttonStyle={styles.imageAddButton}
          title='Library'
          onPress={pickImage}
          type='clear'
          icon={pictureIcon}
          titleStyle={styles.textDark}
          imageUri={image}
        />}
        {image && <Image style={styles.formImage} source={{uri: image}} />}
      </View>
    </>
  );
};

export const ImageChoiceFormFieldContainer = (props) => {
  return (
    <View style={styles.formRow}>
      <TextSourceSans style={styles.formLabel}>{props.field}</TextSourceSans>
      {props.children}
    </View>
  );
};
