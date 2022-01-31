import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { styles } from './CommentForm.styles';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../theme/colors';
import { SIZES } from '../../theme/fonts';

export const CommentForm = (props) => {

  const commentValidationSchema = yup.object().shape({
    comment: yup
      .string()
      .max(4000, 'Comment must be no longer than 4000 characters.')
  });

  const planeIcon = (<IconFA name="paper-plane" color={COLORS.text.inverted} size={SIZES.md} />);

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
            <TextInput
              name='comment'
              ref={props.inputRef}
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
              {planeIcon}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};
