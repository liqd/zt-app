import React, { useEffect, useState } from 'react'
import { Alert, Linking, ScrollView, View } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'

import API, { baseUrl } from '../../BaseApi'
import { ButtonSubmit } from '../../components/ButtonSubmit'
import { TextInputFormField } from '../../components/formFields'
import { LinkTextSourceSans } from '../../components/LinkTextSourceSans'
import { TextSourceSans } from '../../components/TextSourceSans'

import {useAuthorization} from './AuthProvider.js'
import { styles } from './LoginScreen.styles'

export const LoginScreen = () => {
  const {signIn} = useAuthorization()
  const [error, setError] = useState()
  const registerUrl = '/accounts/signup/?next=/'
  const passwordResetUrl = '/accounts/password/reset/'

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{ text: 'Ok' }])
    }
  }, [error])

  const handleLogin = (values) => {
    API.postLogin(values).then((response) => {
      if (response.statusCode!==200) {
        if (response.data.non_field_errors) {
          setError(response.data.non_field_errors[0])
        } else if (response.data.username) {
          setError('Username or E-mail address: ' + response.data.username[0])
        } else if (response.data.password) {
          setError('Password: ' + response.data.password[0])
        } else {
          setError('Something went wrong, please try again.')
        }
      } else {
        signIn(response.data.token)
      }
    })
  }

  const loginValidationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Please enter your e-mail address or username.'),
    password: yup
      .string()
      .required('Please enter your password.'),
  })

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
        <View style={styles.flexContainer}>
          <View style={styles.container}>
            <ScrollView>
              <TextSourceSans style={styles.title}>
                Login
              </TextSourceSans>
              <TextSourceSans style={styles.registerText}>
                If you have not created an account yet, then please <LinkTextSourceSans
                  onPress={() => Linking.openURL(baseUrl + registerUrl)}
                >register</LinkTextSourceSans> first.
              </TextSourceSans>
              <TextInputFormField
                field='Username or E-mail address:'
                name='username'
                value={values.username}
                placeholder=''
                returnKeyType='next'
                returnKeyLabel='next'
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={errors.username}
                touched={touched.username}
                testID='username-input'
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
                testID='password-input'
              />
              <LinkTextSourceSans style={styles.forgotPassword}
                onPress={() => Linking.openURL(baseUrl + passwordResetUrl)}
              >Forgot Password?</LinkTextSourceSans>
            </ScrollView>
          </View>
          <ButtonSubmit
            title='Login'
            onPress={handleSubmit}
            disabled={!isValid}
          >
          </ButtonSubmit>
        </View>
      )}
    </Formik>
  )
}
