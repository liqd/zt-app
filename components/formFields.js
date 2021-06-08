import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Alert, Image, Platform } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { styles } from './formFields.styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export const ImageCaptureFormField = (props) => {
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
        icon={<Icon name='camera' size={22} />}
        type="outline"
        titleStyle={{ color: 'black' }}
      />
      {capturedImage && ( <Image style={styles.formImage} source={{uri: capturedImage}} />)}
    </View>
  );
};

export const ImagePickerFormField = (props) => {
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
        title="Library"
        onPress={pickImage}
        type="outline"
        icon={<Icon name='picture' size={22} />}
        titleStyle={{ color: 'black' }}
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

export const AddImageButton = (props) => {
  return (
    <View>
      <Button
        buttonStyle={styles.imageButton}
        icon={<Icon name='cloud-upload' size={22} color={'#fff'} />}
        type='fill'
        title='Select image'
        titleStyle={{ color: 'white' }}
      />
    </View>
  );
};

export const TextInputFormField = (props) => {
  return (
    <View>
      <Text style={styles.formLabel}>{props.field}</Text>
      <TextInput
        style={styles.textInput}
        {...props}
      />
      {props.touched && <Text style={styles.formError}>{props.error}</Text>}
    </View>
  );
};

export const CheckBoxFormFieldContainer = (props) => {
  return (
    <View style={styles.checkBoxFormFieldContainer}>
      <Text style={styles.formLabel}>{props.field}</Text>
      {props.children}
      {props.children.touched && <Text style={styles.formError}>{props.error}</Text>}
    </View>
  );
};

export const CheckBoxFormField = (props) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <CheckBox
      checked={checked}
      onIconPress={() => setChecked(!checked)}
      onLongIconPress={() =>
        console.log('onLongIconPress()')
      }
      onLongPress={() => console.log('onLongPress()')}
      onPress={() => console.log('onPress()')}
      title={props.title}
      titleProps={{}}
      checkedColor='#a3ef90'
      uncheckedColor='#2d40cc'
      containerStyle={styles.checkBoxContainer}
    />
  );
};

export const DropdownFormFieldContainer = (props) => {
  return (
    <View>
      <Text style={styles.formLabel}>{props.field}</Text>
      {props.children}
    </View>
  );
};

export const DropdownFormField = (props) => {
  return (
    <View>
      <DropDownPicker
        style={styles.dropdownFormField}
        open={props.open}
        value={props.value}
        items={props.items}
        setOpen={props.setOpen}
        setValue={props.setValue}
        setItems={props.setItems}
        containerStyle={{}}
      />
    </View>
  );
};
