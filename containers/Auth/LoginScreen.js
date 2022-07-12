import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import {useAuthorization} from './AuthProvider.js';
import API from '../../BaseApi';
import { TextInputFormField } from '../../components/formFields';
import { COLORS } from '../../theme/colors';
import { SPACINGS } from '../../theme/spacings';

export const LoginScreen = () => {
  const {signIn} = useAuthorization();
  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  const handleLogin = (values) => {
    API.postLogin(values).then((response) => {
      if (response.statusCode!==200) {
        if (response.data.non_field_errors) {
          setError(response.data.non_field_errors[0]);
        }
        else if (response.data.username) {
          setError('Username: ' + response.data.username[0]);
        }
        else if (response.data.password) {
          setError('Password: ' + response.data.password[0]);
        }
        else {
          setError('Something went wrong, please try again.');
        }
      }
      else {
        signIn(response.data.token);
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
        <View style={styles.loginContainer}>

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
            secureTextEntry
          />
          <Button onPress={handleSubmit} title="Login" disabled={!isValid} />
        </View>

      )}
    </Formik>
  );
};

export const styles = StyleSheet.create({
  loginContainer: {
    paddingVertical: SPACINGS.multiplyBy(2),
    paddingHorizontal: SPACINGS.multiplyBy(2),
    backgroundColor: COLORS.paper.main,
  }
});
