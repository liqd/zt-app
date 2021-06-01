import React from 'react';
import { Button, View, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import { styles } from './Idea.styles';
import { TextInputFormField } from '../../components/formFields';

export const Login = props => {

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(5, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Please login</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: ''}}
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
              field='Email'
              name="email"
              placeholder="Email Address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              error={errors.title}
              touched={touched.title}
            />
            <TextInputFormField
              field='Password'
              name="password"
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              error={errors.password}
              touched={touched.password}
            />
            <Button onPress={handleSubmit} title="Login" disabled={!isValid} />
          </>
        )}
      </Formik>
    </View>
  );
};
