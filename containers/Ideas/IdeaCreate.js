import React, {useState, useEffect} from 'react';
import { Alert, View, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

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
  ImageChoiceFormFieldContainer } from '../../components/imageFormField';
import API from '../../BaseApi';

export const IdeaCreate = props => {

  const [error, setError] = useState();
  const {moduleId, project} = props.route.params;
  const arrowLeftIcon = (
    <IconSLI name='arrow-left' size={22} />
  );

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  const handleSubmit = (values) => {
    AsyncStorage.getItem('authToken')
      .then((token) => API.postIdea(moduleId, values, token))
      //error handling is provisional and should probably go somewhere else eventually
      .then(response => {
        if (response.statusCode == 201) {
          Alert.alert('Your idea was added.', 'Thank you for participating!',  [{ text: 'Ok' }]);
          props.navigation.navigate('IdeaProject', {
            project: project
          });
        }
        else if (response.statusCode == 400) {
          setError('Required fields are missing.');
        }
        else if (response.statusCode == 403) {
          setError(response.data.detail);
        }
        else {
          setError('Try again.');
        }
      });
  };

  const ideaValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Idea title is Required'),
    description: yup
      .string()
      .min(20, ({ min }) => `Description must be at least ${min} characters`)
      .max(100, 'Description must be no longer then 100 characters')
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.actionsContainer}>
        <Button
          buttonStyle={styles.backButton}
          titleStyle={styles.backButtonText}
          title='Back'
          type='clear'
          icon={arrowLeftIcon}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <Text style={styles.title}>Submit a new idea for this project</Text>
      <Formik
        validationSchema={ideaValidationSchema}
        initialValues={{ name: '', description: '' , labels: []}}
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
              name='name'
              value={values.name}
              placeholder='Enter your idea title'
              returnKeyType='next'
              returnKeyLabel='next'
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              error={errors.name}
              touched={touched.name}
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
