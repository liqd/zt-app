import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { CheckBox } from '@rneui/themed'

import { COLORS } from '../theme/colors'

import { FormError } from './FormError'
import { styles } from './formFields.styles'
import { FormLabel } from './FormLabel'

/*  Setting list mode to scrollview globally
FIXME: to be checked if we want this */
DropDownPicker.setListMode('SCROLLVIEW')

export const TextInputFormField = (props) => {
  return (
    <View
      style={props.textInputContainer}
    >
      <FormLabel>{props.field}</FormLabel>
      <TextInput
        ref={props.inputRef}
        accessibilityLabel={props.field}
        accessibilityHint={props.fieldHint}
        accessible={true}
        style={styles.textInput}
        {...props}
      />
      {props.touched && props.error &&
        <FormError>{props.error}</FormError>
      }
    </View>
  )
}

export const TextInputFullFormField = (props) => {
  return (
    <View style={styles.textInputFullContainer}>
      <FormLabel>{props.field}</FormLabel>
      <TextInput
        style={styles.textInputFull}
        accessibilityLabel={props.field}
        accessibilityHint={props.fieldHint}
        accessible={true}
        {...props}
      />
      {props.touched &&
        <FormError>{props.error}</FormError>
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
    <View style={styles.dropdownContainer}>
      <FormLabel>{props.field}</FormLabel>
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
        textStyle={styles.dropdownFormFieldText}
      />
    </View>
  )
}
