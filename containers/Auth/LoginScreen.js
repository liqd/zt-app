import React, { useEffect, useState } from 'react';
import { Alert, Button, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import API from '../../BaseApi';
import { styles } from '../Ideas/Idea.styles';

import { TextInputFormField } from '../../components/formFields';

export const LoginScreen = (props) => {

  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error[0], [{ text: 'Ok' }]);
    }
  }, [error]);

  const handleLogin = (values) => {
    API.postLogin(values).then((response) => {
      if (!response.token) {
        setError(response.non_field_errors);
        props.navigation.navigate('Auth');
      }
      else {
        AsyncStorage.setItem('authToken', response.token);
        props.navigation.navigate('Ideas');
      }
    });
  };

  const loginValidationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Please enter your e-mail address or username.'),
    password: yup
      .string()
      .required('Please enter your password.'),
  });

  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{ username: '', password: '' }}
      onSubmit={values => handleLogin(values)}
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
        <View style={styles.container}>

          <TextInputFormField
            field='E-mail address:'
            name='username'
            value={values.username}
            placeholder=''
            returnKeyType='next'
            returnKeyLabel='next'
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            error={errors.username}
            touched={touched.username}
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            autoCompleteType='email'
          />
          <TextInputFormField
            field='Password:'
            name='password'
            value={values.password}
            placeholder=''
            returnKeyType='next'
            returnKeyLabel='next'
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
          />
          <Button onPress={handleSubmit} title="Login" disabled={!isValid} />
        </View>

      )}
    </Formik>
  );
};
