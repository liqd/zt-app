import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { styles } from './formFields.styles';

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

export const MultiInputFormField = (props) => {
  return (
    <View>
      <Text style={styles.formLabel}>{props.field}</Text>
      {props.children}
      {props.children.touched && <Text style={styles.formError}>{props.error}</Text>}
    </View>
  );
};


export const CheckBoxFormField = (props) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <View style={styles.checkBoxContainer}>
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
        uncheckedColor='#F00'
      />
    </View>
  );
};
