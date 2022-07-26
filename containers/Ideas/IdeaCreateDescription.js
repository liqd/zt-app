import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'

import { ButtonSubmit } from '../../components/ButtonSubmit'
import { TextInputFullFormField } from '../../components/formFields'
import { Header } from '../../components/Header'
import { TextSourceSans } from '../../components/TextSourceSans'
import { styles } from '../Reports/ReportCreateMessage.styles'

export const IdeaCreateDescription = props => {

  const description = props.route.params.description
  const ideaDescriptionValidationSchema = yup.object().shape({
    description: yup
      .string()
      .max(10000, 'Description must be no longer then 10000 characters')
      .required('Description is required'),
  })

  const handleSubmit = (values) => {
    props.navigation.navigate({
      name: 'IdeaCreate',
      params: { descriptionText: values.description },
      merge: true,
    })
  }

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      <Formik
        validationSchema={ideaDescriptionValidationSchema}
        initialValues={{description: description}}
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
          <KeyboardAvoidingView
            behavior={
              Platform.OS === 'ios'
                ? 'padding'
                : 'null'
            }
            style={styles.keyboardContainer}
          >
            <ScrollView
              style={styles.scrollContainer}
            >
              <TextSourceSans style={styles.title}>
                Add description
              </TextSourceSans>
              <TextInputFullFormField
                name='description'
                value={values.description}
                placeholder='Enter your idea description'
                returnKeyType='next'
                returnKeyLabel='next'
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                error={errors.description}
                touched={touched.description}
                numberOfLines={10}
                multiline={true}
                autoFocus
              />
            </ScrollView>
            <ButtonSubmit
              title='Add'
              onPress={handleSubmit}
              disabled={!isValid}
            >
            </ButtonSubmit>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  )
}

IdeaCreateDescription.navigationOptions = {
  headerTitle: 'Add your description',
  // headerBackTitle only for iOS
  headerBackTitle: 'Back'
}
