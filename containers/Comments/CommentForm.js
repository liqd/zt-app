import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextInputFormField } from '../../components/formFields';
import { ButtonSubmit } from '../../components/ButtonSubmit';

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
        <>
          <TextInputFormField
            name='comment'
            value={values.comment}
            placeholder='Enter your comment'
            onChangeText={handleChange('comment')}
            onBlur={handleBlur('comment')}
            error={errors.comment}
            touched={touched.comment}
            autoFocus = {props.isFocused}
            multiline
          />
          <ButtonSubmit
            title="Comment"
            onPress={handleSubmit}
            disabled={!isValid}
          />
        </>
      )}
    </Formik>
  );
};
