import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import { styles } from './Idea.styles';
import { TextInputFormField } from '../../components/formFields';

export const IdeaCreate = props => {

  const pressHandler = () => props.navigation.pop();

  const ideaValidationSchema = yup.object().shape({
    title: yup
      .string()
      .email('Please enter idea title')
      .required('Idea title is Required'),
    description: yup
      .string()
      .min(20, ({ min }) => `Description must be at least ${min} characters`)
      .max(100, 'Too Long!')
      .required('Description is required'),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Submit a new idea for this project</Text>
      <Formik
        validationSchema={ideaValidationSchema}
        initialValues={{ title: '', description: '' }}
        onSubmit={values => console.log(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched
        }) => (
          <>
            <TextInputFormField
              field='Idea title'
              name='Add your idea title'
              placeholder='Enter your idea title'
              returnKeyType='next'
              returnKeyLabel='next'
              onChangeText={handleChange('title')}
              error={errors.title}
              touched={touched.email}
            />
            <TextInputFormField
              field='Idea description'
              name='Add your idea description'
              placeholder='Enter your idea description'
              returnKeyType='next'
              returnKeyLabel='next'
              onChangeText={handleChange('description')}
              onBlur={handleBlur('email')}
              error={errors.description}
              touched={touched.email}
            />
            <Button onPress={handleSubmit} title="Submit" />
          </>
        )}
      </Formik>
    </View>
  );
};

IdeaCreate.navigationOptions = {
  headerTitle: 'Submit your idea',
  // headerBackTitle only for iOS
  headerBackTitle: 'Back'
};
