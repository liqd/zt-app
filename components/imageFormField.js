import React, { useState, useEffect } from 'react';
import { View, Alert, Image, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { CheckBoxFormField } from './formFields';
import { styles } from './imageFormField.styles';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import * as ImagePicker from 'expo-image-picker';
import { TextSourceSans } from './TextSourceSans';
import mime from 'mime';

export const ImagePickerFormField = (props) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [image, setImage] = useState(props.initialImage);

  const mutateImageProps = (imageObj) => {
    // eslint-disable-next-line
    const nameRegex = /[^\/]*$/;
    const imgName = imageObj.uri.match(nameRegex);
    imgName ? (imageObj.name = imgName[0]) : 'unknown';

    const extRegex = /\w+$/;
    const imgExt = imgName[0].match(extRegex);
    imgExt ? (imageObj.type = mime.getType(imgExt[0])) : 'image/jpeg';
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, [capturedImage, image]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    });

    mutateImageProps(result);

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
  }, [capturedImage, image]);

  const captureImageHandler = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    });

    mutateImageProps(result);

    if (!result.cancelled) {
      setCapturedImage(result.uri);
      props.onSetImage(result);
    }
  };

  const deleteImageHandler = async () => {
    let image = null;
    setCapturedImage(image);
    setImage(image);
  };

  const cameraIcon = <IconSLI name='camera' style={styles.iconButton} />;
  const pictureIcon = <IconSLI name='picture' style={styles.iconButton} />;
  const closeIcon = <IconSLI name='close' style={styles.iconRemoveButton} />;

  return (
    <>
      <View
        style={capturedImage || image ? styles.formImagePickerFull : styles.formImagePicker}
      >
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
        {capturedImage &&
          <>
            <Button
              buttonStyle={styles.imageRemoveButton}
              onPress={deleteImageHandler}
              icon={closeIcon}
              type='clear'
            />
            <Image
              style={styles.formImagePreview}
              source={{uri: capturedImage}}
              resizeMode="contain"/>
          </>
        }
      </View>
      <View style={capturedImage || image ? styles.formImagePickerFull : styles.formImagePicker}>
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
        {image &&
          <>
            <Button
              buttonStyle={styles.imageRemoveButton}
              onPress={deleteImageHandler}
              icon={closeIcon}
              type='clear'
            />
            <Image
              style={styles.formImagePreview}
              source={{uri: image}}
              resizeMode="contain"/>
          </>
        }
      </View>
    </>
  );
};

export const ImageChoiceFormFieldContainer = (props) => {
  const cloudUploadIcon = (
    <IconSLI name='cloud-upload' style={[styles.imageButtonIcon, styles.textLight]} />
  );

  const [clicked, setClicked] = useState(false);

  return (
    <View style={styles.formRow}>
      <TextSourceSans style={styles.formLabel}>{props.field}</TextSourceSans>
      {(!clicked && !props.image) &&
                <Button
                  buttonStyle={styles.imageButton}
                  icon={cloudUploadIcon}
                  type='fill'
                  title='Add image'
                  titleStyle={styles.textLight}
                  clicked={props.clicked}
                  setClicked={props.setClicked}
                  onPress={setClicked}
                />
      }
      <TextSourceSans style={styles.imageInfo}>
                Visualize your idea. It must be min. 600 pixel wide and 400 pixel tall. Allowed file formats are png, jpeg, gif. The file size should be max. 5 MB.
      </TextSourceSans>
      {(clicked || props.image) &&
        <>
          <ImagePickerFormField
            onSetImage={props.onSetImage}
            initialImage={props.image}
          />
          <CheckBoxFormField
            field='Image Copyright'
            name='imageCopyrightChecked'
            onIconPress={props.onIconPress}
            checked={props.checked}
            title='I hereby confirm that the copyrights for this photo are with me or that I have received rights of use from the author. I also confirm that the privacy rights of depicted third persons are not violated.'
          />
        </>
      }
    </View>
  );
};
