import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'
import * as yup from 'yup'

import API from '../../BaseApi'
import { TextInputFullFormField } from '../../components/formFields'
import { Header } from '../../components/Header'
import { KeyboardScrollView } from '../../components/KeyboardScrollView'
import { StatusBarStyled } from '../../components/StatusBarStyled'
import { TextSourceSans } from '../../components/TextSourceSans'

import { styles } from './ReportCreateMessage.styles'

export const ReportCreateMessage = props => {
  const { t } = useTranslation()
  const {content_type, object_pk} = props.route.params
  const [error, setError] = useState()
  const [submitPending, setSubmitPending] = useState()

  const reportMessageValidationSchema = yup.object().shape({
    message: yup
      .string()
      .max(1024, t('Message must be no longer then 1024 characters'))
      .required(t('Please add a few words explaining why you are reporting this content')),
  })

  useEffect(() => {
    if (error) {
      Alert.alert(t('An error occured'), error, [{ text: t('Ok') }])
    }
  }, [error])

  const handleSubmit = (values) => {
    const description = values.message
    setSubmitPending(true)
    return API.postReport({
      content_type,
      object_pk,
      description
    })
      .then((response) => {
        const {statusCode, data} = response
        if (statusCode === 201) {
          Alert.alert(t('Thank you! We are taking care of it.'))
          setSubmitPending(false)
          props.navigation.goBack()
        } else if (statusCode === 403) {
          return Promise.reject(data.detail)
        } else if (statusCode === 400) {
          return Promise.reject('Bad request')
        }
      })
      .catch(error => {
        setError(error)
        setSubmitPending(false)
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarStyled />
      <View style={styles.header}>
        <Header navigation={props.navigation} style={styles.header}/>
      </View>
      <Formik
        validationSchema={reportMessageValidationSchema}
        initialValues={{message: ''}}
        onSubmit={values => handleSubmit(values)}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <KeyboardScrollView
            handleSubmit={handleSubmit}
            isValid={isValid && !submitPending}
            buttonText={t('Submit')}
          >
            <TextSourceSans style={styles.title}>
              {t('You want to report this content? Your message will be sent to the ' +
              'moderation. The moderation will look at the reported content. The ' +
              'content will be deleted if it does not meet our discussion rules ' +
              '(netiquette).')}
            </TextSourceSans>
            <TextInputFullFormField
              name='message'
              value={values.message}
              placeholder={t('Add message')}
              returnKeyType='next'
              returnKeyLabel={t('next')}
              onChangeText={handleChange('message')}
              onBlur={handleBlur('message')}
              error={errors.message}
              touched={touched.message}
              numberOfLines={10}
              multiline={true}
            />
          </KeyboardScrollView>
        )}
      </Formik>
    </SafeAreaView>
  )
}
