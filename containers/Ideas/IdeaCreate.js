import React, {useState} from 'react';
import { Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { styles } from './Idea.styles';
import {
  TextInputFormField,
  CheckBoxFormFieldContainer,
  CheckBoxFormField,
  DropdownFormFieldContainer,
  DropdownFormField } from '../../components/formFields';
import {
  ImagePickerFormField,
  ImageCaptureFormField,
  AddImageButton,
  ImageChoiceFormFieldContainer } from '../../components/imageFormField';

export const IdeaCreate = props => {

  //const pressHandler = () => props.navigation.pop();

  const handleSubmit = (values) => {
    //AsyncStorage.getItem('authToken').then((token) => console.log(token));
    console.log(values);
  };

  const ideaValidationSchema = yup.object().shape({
    title: yup
      .string()
      .max(120, ({ max }) => `Title must be no longer then ${max} characters`)
      .required('Idea title is Required'),
    description: yup
      .string()
      .required('Description is required'),
  });

  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Category 1', value: 'category1'},
    {label: 'Category 2', value: 'category2'}
  ]);

  return (
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.title}>Submit a new idea for this project</Text>
      <Formik
        validationSchema={ideaValidationSchema}
        initialValues={{ title: '', description: '' }}
        onSubmit={values => handleSubmit(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid
        }) => (
          <>
            <TextInputFormField
              field='Idea title'
              name='title'
              value={values.title}
              placeholder='Enter your idea title'
              returnKeyType='next'
              returnKeyLabel='next'
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              error={errors.title}
              touched={touched.title}
            />
            <TextInputFormField
              field='Idea description'
              name='description'
              value={values.description}
              placeholder='Enter your idea description'
              returnKeyType='next'
              returnKeyLabel='next'
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              error={errors.description}
              touched={touched.description}
            />
            <DropdownFormFieldContainer
              field='Idea Category'
              name='category'>
              <DropdownFormField
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              >
              </DropdownFormField>
            </DropdownFormFieldContainer>
            <CheckBoxFormFieldContainer
              field='Idea Labels'
            >
              <CheckBoxFormField
                title='Label 1'
              />
              <CheckBoxFormField
                title='Label 2'
              />
              <CheckBoxFormField
                title='Label 3'
              />
            </CheckBoxFormFieldContainer>
            {!clicked &&
              <Button
                buttonStyle={styles.imageButton}
                icon={<Icon name='cloud-upload' style={[styles.iconButton, styles.textLight]} />}
                type='fill'
                title='Add image'
                titleStyle={styles.textLight}
                clicked={props.clicked}
                setClicked={props.setClicked}
                onPress={setClicked}
              />
            }
            {clicked &&
              <ImageChoiceFormFieldContainer
                field='Add image'
              >
                <ImageCaptureFormField />
                <ImagePickerFormField />
              </ImageChoiceFormFieldContainer>
            }
            <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

IdeaCreate.navigationOptions = {
  headerTitle: 'Submit your idea',
  // headerBackTitle only for iOS
  headerBackTitle: 'Back'
};
