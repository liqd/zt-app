import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from '@rneui/base';
import { Formik } from 'formik';
import * as yup from 'yup';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import { ButtonSubmit } from '../../components/ButtonSubmit';
import { TextSourceSans } from '../../components/TextSourceSans';

import { styles } from '../Reports/ReportCreateMessage.styles';
import { TextInputFullFormField } from '../../components/formFields';
import { VirtualScrollView } from '../../components/VirtualScrollView';

export const IdeaCreateDescription = props => {

  const description = props.route.params.description;
  const arrowLeftIcon = (
    <IconSLI name='arrow-left' size={22} />
  );
  const ideaDescriptionValidationSchema = yup.object().shape({
    description: yup
      .string()
      .max(10000, 'Description must be no longer then 10000 characters')
      .required('Description is required'),
  });

  const handleSubmit = (values) => {
    props.navigation.navigate({
      name: 'IdeaCreate',
      params: { descriptionText: values.description },
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
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
          <>
            <ScrollView>
              <TextSourceSans style={styles.title}>Add description</TextSourceSans>
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
              />
            </ScrollView>
            <ButtonSubmit
              title='Add'
              onPress={handleSubmit}
              disabled={!isValid}
            >
            </ButtonSubmit>
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
