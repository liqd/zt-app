import React, { useState } from 'react';
import { TextInput, View, Text, Button, Alert, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { styles } from './formFields.styles';


export const ImagePickerFormField = (props) => {
  const [pickedImage, setPickedImage] = useState();

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
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if(!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    setPickedImage(image.uri);
  };

  return (
    <View style={styles.formImagePicker}>
      {!pickedImage ? ( <Text>Please choose an image</Text> ) : ( <Image style={styles.formImage} source={{uri: pickedImage}} />)}
      <Button title='Choose Image' onPress={takeImageHandler} />
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
