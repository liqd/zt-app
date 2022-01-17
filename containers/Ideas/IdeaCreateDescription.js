import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import { ButtonSubmit } from '../../components/ButtonSubmit';
import { TextSourceSans } from '../../components/TextSourceSans';

import { styles } from './Idea.styles';
import { TextInputFullFormField } from '../../components/formFields';
import API from '../../BaseApi';

export const IdeaCreateDescription = props => {

  const {idea, project, editing} = props.route.params;
  const moduleId = project.single_agenda_setting_module;
  const arrowLeftIcon = (
    <IconSLI name='arrow-left' size={22} />
  );
  const ideaDescriptionValidationSchema = yup.object().shape({
    description: yup
      .string()
      .max(10000, 'Description must be no longer then 100 characters')
      .required('Description is required'),
  });

  const [error, setError] = useState();

  const handleSubmit = (values) => {
    let formData = new FormData();
    for (let key in values) {
      Array.isArray(values[key])
        ? values[key].forEach((value) => formData.append(key, value))
        : formData.append(key, values[key]);
    }

    AsyncStorage.getItem('authToken')
      .then((token) => {
        if (editing) {
          return API.editIdea(moduleId, idea.pk, formData, token);
        }
        else {
          return API.postIdea(moduleId, formData, token);
        }
      })
      //error handling is provisional and should probably go somewhere else eventually
      .then((response) => {
        const {statusCode, data} = response;
        if (statusCode == 201) {
          props.navigation.navigate('IdeaCreate', {
            project: project
          });
        }
        else if (editing && statusCode == 200) {
          Alert.alert('Your description was updated.', '',  [{ text: 'Ok' }]);
          props.navigation.navigate('IdeaCreate', {
            idea: data,
            project: project
          });
        }
        else if (statusCode == 400) {
          setError('Required field is missing.');
        }
        else if (response.statusCode == 403) {
          setError(response.data.detail);
        }
        else {
          setError('Try again.');
        }
      });
  };

  return (
    <View
      style={styles.descripContainer}
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
        initialValues={{
          ...(editing
            ? {
              description: idea.description,
            }
            : {
              description: '',
            }),
        }}
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
    </View>
  );
};

IdeaCreateDescription.navigationOptions = {
  headerTitle: 'Add your description',
  // headerBackTitle only for iOS
  headerBackTitle: 'Back'
};
