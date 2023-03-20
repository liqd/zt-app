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
  const [submitPending, setSubmitPending] = useState()
  const registerUrl = '/accounts/signup/?next=/'
  const passwordResetUrl = '/accounts/password/reset/'

  useEffect(() => {
    if (error) {
      Alert.alert(t('An error occured'), error, [{ text: 'Ok' }])
    }
  }, [error])

  const handleLogin = (values) => {
    setSubmitPending(true)
    return API.postLogin(values)
      .then((response) => {
        const {statusCode, data} = response
        if (statusCode === 200) {
          signIn(data.token)
        } else if (statusCode === 400) {
          let errorMessage
          if (data.non_field_errors) {
            errorMessage = data.non_field_errors[0]
          } else if (data.username) {
            errorMessage = t('Username or E-mail address: ') + data.username[0]
          } else if (data.password) {
            errorMessage = t('Password: ') + data.password[0]
          } else {
            errorMessage = t('Something went wrong, please try again.')
          }
          return Promise.reject(errorMessage)
        }
      })
      .catch(error => {
        setError(error)
        setSubmitPending(false)
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
      validateOnMount={true}
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
          isValid={isValid && !submitPending}
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
