import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Alert, Linking, View } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'

import API, { baseUrl } from '../../BaseApi'
import { TextInputFormField } from '../../components/formFields'
import { KeyboardScrollView } from '../../components/KeyboardScrollView'
import { LinkTextSourceSans } from '../../components/LinkTextSourceSans'
import { StatusBarStyled } from '../../components/StatusBarStyled'
import { TextSourceSans } from '../../components/TextSourceSans'

import {useAuthorization} from './AuthProvider.js'
import { styles } from './LoginScreen.styles'

export const LoginScreen = () => {
  const { t } = useTranslation()
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
      .required(t('Please enter your e-mail address or username.')),
    password: yup
      .string()
      .required(t('Please enter your password.')),
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
        <KeyboardScrollView
          handleSubmit={handleSubmit}
          isValid={isValid}
          buttonText='Login'
        >
          <StatusBarStyled />
          <View style={styles.container}>
            <TextSourceSans style={styles.title}>
              {t('Login')}
            </TextSourceSans>
            <TextSourceSans style={styles.registerText}>
              <Trans t={t}>
                If you have not created an account yet, then please <LinkTextSourceSans
                  onPress={() => Linking.openURL(baseUrl + registerUrl)}
                >register</LinkTextSourceSans> first.
              </Trans>
            </TextSourceSans>
            <TextInputFormField
              field={t('Username or E-mail address:')}
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
              field={t('Password:')}
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
            >{t('Forgot Password?')}</LinkTextSourceSans>
          </View>
        </KeyboardScrollView>
      )}
    </Formik>
  )
}
