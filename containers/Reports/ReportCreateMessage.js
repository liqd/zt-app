import React from 'react'
import { Alert, ScrollView,View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import * as yup from 'yup'

import API from '../../BaseApi'
import { ButtonSubmit } from '../../components/ButtonSubmit'
import { TextInputFullFormField } from '../../components/formFields'
import { Header } from '../../components/Header'
import { TextSourceSans } from '../../components/TextSourceSans'

import { styles } from './ReportCreateMessage.styles'

export const ReportCreateMessage = props => {
  const {content_type, object_pk} = props.route.params

  const reportMessageValidationSchema = yup.object().shape({
    message: yup
      .string()
      .max(1024, 'Message must be no longer then 1024 characters')
  })

  const handleSubmit = (values) => {
    const description = values.message
    AsyncStorage.getItem('authToken')
      .then((token) => {
        return API.postReport({content_type, object_pk, description}, token)
      })
      .then((response) => {
        const {statusCode, data} = response
        if (statusCode == 201) {
          Alert.alert('Thank you! We are taking care of it.')
          props.navigation.goBack()
        } else {
          const errorMessage = 'That did not work.'
          let errorDetail
          if (statusCode==403) {
            errorDetail = data.detail
          } else if (statusCode == 400) {
            errorDetail = 'Bad request'
          }
          Alert.alert(errorMessage, errorDetail)
        }
      })
  }

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
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
          <>
            <ScrollView>
              <TextSourceSans style={styles.title}>
                You want to report this content? Your message will be sent to the
                moderation. The moderation will look at the reported content. The
                content will be deleted if it does not meet our discussion rules
                (netiquette).
              </TextSourceSans>
              <TextInputFullFormField
                name='message'
                value={values.message}
                placeholder='Add message'
                returnKeyType='next'
                returnKeyLabel='next'
                onChangeText={handleChange('message')}
                onBlur={handleBlur('message')}
                error={errors.message}
                touched={touched.message}
                numberOfLines={10}
                multiline={true}
              />
            </ScrollView>
            <ButtonSubmit
              title='Submit'
              onPress={handleSubmit}
              disabled={!isValid}
            >
            </ButtonSubmit>
          </>
        )}
      </Formik>
    </View>
  )
}

ReportCreateMessage.navigationOptions = {
  headerTitle: 'Add your message',
  // headerBackTitle only for iOS
  headerBackTitle: 'Back'
}
