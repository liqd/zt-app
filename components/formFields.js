import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import { CheckBox } from '@rneui/themed'
import DropDownPicker from 'react-native-dropdown-picker'
import { styles } from './formFields.styles'
import { TextSourceSans } from './TextSourceSans'
import { COLORS } from '../theme/colors'

/*  Setting list mode to scrollview globally
FIXME: to be checked if we want this */
DropDownPicker.setListMode('SCROLLVIEW')

export const TextInputFormField = (props) => {
  return (
    <View>
      <TextSourceSans style={styles.formLabel}>{props.field}</TextSourceSans>
      <TextInput
        ref={props.inputRef}
        style={styles.textInput}
        {...props}
      />
      {props.touched && props.error &&
        <TextSourceSans style={styles.formError}>{props.error}</TextSourceSans>
      }
    </View>
  )
}

export const TextInputFullFormField = (props) => {
  return (
    <View style={styles.textInputFullContainer}>
      <TextSourceSans style={styles.formLabel}>{props.field}</TextSourceSans>
      <TextInput
        style={styles.textInputFull}
        {...props}
      />
      {props.touched &&
        <TextSourceSans style={styles.formError}>{props.error}</TextSourceSans>
      }
    </View>
  )
}

export const CheckBoxFormField = (props) => {
  return (
    <CheckBox
      checked={props.checked}
      onIconPress={props.onIconPress}
      title={props.title}
      titleProps={{}}
      checkedColor={COLORS.primary}
      uncheckedColor={COLORS.primary}
      textStyle={styles.checkBoxText}
      containerStyle={styles.checkBoxContainer}
      wrapperStyle={styles.checkBoxWrapper}
    >{props.children}</CheckBox>
  )
}

export const DropdownFormFieldContainer = (props) => {
  return (
    <View>
      <TextSourceSans style={styles.formLabel}>{props.field}</TextSourceSans>
      {props.children}
    </View>
  )
}

export const DropdownFormField = (props) => {
  const [ open, setOpen ] = useState(false)
  const [ selected, setSelected ] = useState(props.value)
  return (
    <View>
      <DropDownPicker
        style={styles.dropdownFormField}
        open={open}
        value={selected}
        items={props.items}
        setOpen={setOpen}
        setItems={props.setItems}
        setValue={setSelected}
        onChangeValue={value => props.onChangeValue(value)}
        containerStyle={{}}
      />
    </View>
  )
}
