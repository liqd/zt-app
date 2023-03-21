import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'
import * as yup from 'yup'

import { TextInputFullFormField } from '../../components/formFields'
import { Header } from '../../components/Header'
import { KeyboardScrollView } from '../../components/KeyboardScrollView'
import { StatusBarStyled } from '../../components/StatusBarStyled'
import { TextSourceSans } from '../../components/TextSourceSans'
import { styles } from '../Reports/ReportCreateMessage.styles'

export const IdeaCreateDescription = props => {
  const { t } = useTranslation()
  const description = props.route.params.description
  const [submitPending, setSubmitPending] = useState()
  const ideaDescriptionValidationSchema = yup.object().shape({
    description: yup
      .string()
      .max(10000, t('Description must be no longer then 10000 characters'))
      .required(t('Description is required')),
  })

  const handleSubmit = (values) => {
    setSubmitPending(true)
    props.navigation.navigate({
      name: 'IdeaCreate',
      params: { descriptionText: values.description },
      merge: true,
    }),
    setSubmitPending(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarStyled />
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
          <KeyboardScrollView
            handleSubmit={handleSubmit}
            isValid={isValid && !submitPending}
            pending={submitPending}
          >
            <TextSourceSans style={styles.title}>
              {t('Add description')}
            </TextSourceSans>
            <TextInputFullFormField
              name='description'
              value={values.description}
              placeholder={t('Enter your idea description')}
              returnKeyType='next'
              returnKeyLabel={t('next')}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              error={errors.description}
              touched={touched.description}
              numberOfLines={10}
              multiline={true}
              autoFocus
            />
          </KeyboardScrollView>
        )}
      </Formik>
    </SafeAreaView>
  )
}
