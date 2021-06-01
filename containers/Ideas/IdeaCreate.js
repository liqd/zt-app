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
      .required('Idea title is Required'),
    description: yup
      .string()
      .min(20, ({ min }) => `Description must be at least ${min} characters`)
      .max(100, 'Description must be no longer then 100 characters')
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

            <DropdownFormFieldTest />
            <CheckBoxFormField
              field='Label selection'
              name='label'
              onChange={(e) => props.setFieldValue('label', e.target.checked)}
            />
            <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
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
