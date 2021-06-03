import React, { useState } from 'react';
import { TextInput, View, Text, Alert, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { styles } from './formFields.styles';


export const ImagePickerFormField = (props) => {
  const [imageSource, setImageSource] = useState(null);

  function selectImage() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true
      }
    };

    launchImageLibrary(options, response => {
      console.log({ response });

      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        console.log({ source });
      }
    });
  }
  return (
    <View>
      <Text style={styles.formLabel}>
        Simple Image Picker
      </Text>
      <TouchableOpacity
        onPress={selectImage}
      >
        <Text>Pick an image</Text>
      </TouchableOpacity>
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
