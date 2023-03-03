import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput, TouchableOpacity,View } from 'react-native'
import IconFA from 'react-native-vector-icons/FontAwesome'
import { Formik } from 'formik'
import * as yup from 'yup'

import { COLORS } from '../../theme/colors'
import { SIZES } from '../../theme/fonts'

import { styles } from './CommentForm.styles'

export const CommentForm = (props) => {
  const { t } = useTranslation()
  const commentValidationSchema = yup.object().shape({
    comment: yup
      .string()
      .max(
        4000,
        t('Comment must be no longer than 4000 characters.')
      )
  })

  const planeIcon = (
    <IconFA
      name="paper-plane"
      color={COLORS.paper}
      size={SIZES.md}
    />
  )

  const submitButtonClass = props.disabled
    ? {...styles.submitButton, ...styles.disabled}
    : styles.submitButton

  return (
    <Formik
      validationSchema={commentValidationSchema}
      initialValues={{ comment: '' }}
      onSubmit={(values, {resetForm}) => {
        props.handleSubmit(values)
        resetForm({comment: ''})
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
        setFieldValue
      }) => {
        useEffect(() => {
          setFieldValue('comment', props.value, false)
        }, [props.isEdit])
        return (
          <View style={styles.submitContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                accessibilityLabel={t('Comment input')}
                accessibilityHint={t('Type your comment here')}
                name='comment'
                ref={props.inputRef}
                value={values.comment}
                placeholder={t('Enter your comment')}
                placeholderTextColor={COLORS.grey.medium}
                onChangeText={handleChange('comment')}
                onBlur={handleBlur('comment')}
                error={errors.comment}
                touched={touched.comment}
                multiline
                editable={!props.disabled}
              />
            </View>
            <View style={submitButtonClass}>
              <TouchableOpacity
                accessibilityRole="button"
                onPress={handleSubmit}
                disabled={!isValid || props.disabled}
              >
                {planeIcon}
              </TouchableOpacity>
            </View>
          </View>
        )
      }}
    </Formik>
  )
}
