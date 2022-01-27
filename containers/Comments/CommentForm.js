import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextInputFormField } from '../../components/formFields';
import { styles } from './CommentForm.styles';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import { COLORS } from '../../theme/colors';
import { SIZES } from '../../theme/fonts';

export const CommentForm = (props) => {

  const commentValidationSchema = yup.object().shape({
    comment: yup
      .string()
      .max(4000, 'Comment must be no longer than 4000 characters.')
      .required('Please enter you comment.'),
  });

  return (
    <Formik
      validationSchema={commentValidationSchema}
      initialValues={{
        comment: '',
      }}
      onSubmit={(values, {resetForm}) => {props.handleSubmit(values); resetForm({comment: ''});}}
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
        <View style={styles.submitContainer}>
          <View style={styles.textInputContainer}>
            <TextInputFormField
              name='comment'
              inputRef={props.inputRef}
              value={values.comment}
              placeholder='Enter your comment'
              onChangeText={handleChange('comment')}
              onBlur={handleBlur('comment')}
              error={errors.comment}
              touched={touched.comment}
              multiline
            />
          </View>
          <View style={styles.submitButton}>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <IconSLI
                name="paper-plane"
                color={COLORS.primary}
                size={SIZES.md}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};
