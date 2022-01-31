import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import { ButtonSubmit } from '../../components/ButtonSubmit';
import { TextSourceSans } from '../../components/TextSourceSans';

import { styles } from './Idea.styles';
import { TextInputFullFormField } from '../../components/formFields';

export const IdeaCreateDescription = props => {

  const {idea, project, editing, description } = props.route.params;
  const arrowLeftIcon = (
    <IconSLI name='arrow-left' size={22} />
  );
  const ideaDescriptionValidationSchema = yup.object().shape({
    description: yup
      .string()
      .max(10000, 'Description must be no longer then 100 characters')
      .required('Description is required'),
  });

  const handleSubmit = (values) => {
    props.navigation.navigate('IdeaCreate', {
      project: project,
      descriptionText: values.description,
      editing: editing,
      idea: idea
    });
  };

  const getInitialValues = () => {
    const initialValues = description
      ? {description: description}
      : editing
        ? {description: idea.description}
        : {description: ''};

    return initialValues;
  };

  return (
    <KeyboardAvoidingView
      style={styles.descripContainer}
      behavior={(Platform.OS === 'ios')? 'padding' : null}
    >
      <View style={styles.actionsContainer}>
        <Button
          buttonStyle={styles.backButton}
          titleStyle={styles.backButtonText}
          title='Back'
          type='clear'
          icon={arrowLeftIcon}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <TextSourceSans style={styles.title}>Add description</TextSourceSans>
      <Formik
        validationSchema={ideaDescriptionValidationSchema}
        initialValues={getInitialValues()}
        onSubmit={values => handleSubmit(values)}
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
            <TextInputFullFormField
              field='Idea description'
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
            />
            <View style={styles.descripBtnContainer}>
              <ButtonSubmit
                title='Add'
                onPress={handleSubmit}
                disabled={!isValid}
              >
              </ButtonSubmit>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

IdeaCreateDescription.navigationOptions = {
  headerTitle: 'Add your description',
  // headerBackTitle only for iOS
  headerBackTitle: 'Back'
};
