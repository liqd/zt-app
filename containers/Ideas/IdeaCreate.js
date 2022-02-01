import React, {useState, useEffect} from 'react';
import { Alert, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import { ButtonSubmit } from '../../components/ButtonSubmit';
import { ButtonTextInput, ButtonTextInputFieldContainer } from '../../components/ButtonTextInput';
import { TextSourceSans } from '../../components/TextSourceSans';
import { VirtualScrollView } from '../../components/VirtualScrollView';

import { styles } from './Idea.styles';
import {
  TextInputFormField,
  DropdownFormFieldContainer,
  DropdownFormField } from '../../components/formFields';
import {
  ImageChoiceFormFieldContainer } from '../../components/imageFormField';
import { LabelListContainer, LabelList } from '../../components/LabelForm';
import API from '../../BaseApi';

export const IdeaCreate = props => {

  const {idea, project, editing, descriptionText } = props.route.params;
  const moduleId = project.single_agenda_setting_module;
  const arrowLeftIcon = (
    <IconSLI name='arrow-left' size={22} />
  );
  const ideaValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Idea title is Required'),
    description: yup
      .string()
      .required('Description is required'),
  });

  const [error, setError] = useState();
  const [categories, setCategories] = useState([]);
  const [labelChoices, setLabelChoices] = useState([]);
  const [initialCategory, setInitialCategory] = useState();
  const [initialLabels, setInitialLabels] = useState();
  const [description, setDescription] = useState('');
  const [prevValues, setPrevValues] = useState('');

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{ text: 'Ok' }]);
    }
    else {
      if (descriptionText) {
        setDescription(descriptionText);
      }
      else {
        if (editing) {
          setDescription(idea.description);
        }
      }
      getCategories();
      getLabels();
    }
  }, [error, project, descriptionText]);

  const getCategories = async() => {
    const module = await API.getModule(moduleId);

    if (module.categories) {
      // map property names to format needed for formik
      // Example: [{value: 9, label: 'catname1'}]
      setCategories(module.categories.map(category => ({value: category.id, label: category.name})));
      if (editing && idea.category) {
        setInitialCategory(idea.category.id);
      }
      else {
        setInitialCategory(module.categories[0].id);
      }
    }
  };

  const getLabels = async() => {
    const module = await API.getModule(moduleId);

    if (module.labels) {
      setLabelChoices(module.labels);

      if (editing) {
        setInitialLabels(idea.labels);
      }
      else {
        setInitialLabels([]);
      }
    }
  };

  const mapLabels = (exLabels) => {
    return exLabels.map(el => el.id);
  };

  /* gathers all form data except description (not just labels)*/
  const makeFormData = (values) => {
    const extractedLabels = [...values.labels];
    extractedLabels && (values.labels = mapLabels(extractedLabels));
    let formData = new FormData();
    for (let key in values) {
      Array.isArray(values[key])
        ? values[key].forEach((value) => formData.append(key, value))
        : formData.append(key, values[key]);
    }
    return formData;
  };

  const handleSubmit = (values) => {
    values.description = description;
    const formData = makeFormData(values);
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
          Alert.alert('Your idea was added.', 'Thank you for participating!',  [{ text: 'Ok' }]);
          props.navigation.navigate('IdeaProject', {
            project: project
          });
        }
        else if (editing && statusCode == 200) {
          Alert.alert('Your idea was updated.', '',  [{ text: 'Ok' }]);
          props.navigation.navigate('IdeaDetail', {
            idea: data,
            project: project
          });
        }
        else if (statusCode == 400) {
          if (data && data.image) {
            const errorString = data.image.reduce((acc, curr) => {
              return `${acc}\n${curr}`;
            }, 'Please try again.\n');
            setError(errorString);
          }
          else {
            setError('Required fields are missing.');
          }
        }
        else if (response.statusCode == 403) {
          setError(response.data.detail);
        }
        else {
          setError('Try again.');
        }
      });
  };

  const getInitialValues = () => {
    const initialValues = prevValues
      ? {
        name: prevValues.name ? prevValues.name : '',
        description: description ? description : '',
        labels: prevValues.labels ? prevValues.labels : initialLabels,
        category: prevValues.category ? prevValues.category : initialCategory,
        imageChecked: prevValues.imageChecked ? prevValues.imageChecked : false,
      }
      : {
        name: editing ? idea.name : '',
        description: editing ? idea.description : '',
        labels: initialLabels,
        category: initialCategory,
        imageChecked: editing ? !!idea.image : false
      };

    if (prevValues.image) {
      initialValues.image = prevValues.image;
    }
    return initialValues;
  };

  const toDescription = (values) => {
    setPrevValues(values);
    props.navigation.navigate('IdeaCreateDescription', {
      project: project,
      description: description,
      editing: editing,
      idea: idea
    });
  };

  return (
    <VirtualScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
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
      <TextSourceSans style={styles.title}>Submit a new idea for this project</TextSourceSans>
      <Formik
        validationSchema={ideaValidationSchema}
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
          setFieldValue
        }) => (
          <>
            <TextInputFormField
              field='Idea title'
              name='name'
              value={values.name}
              placeholder='Enter your idea title'
              returnKeyType='next'
              returnKeyLabel='next'
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              error={errors.name}
              touched={touched.name}
            />
            <ButtonTextInputFieldContainer
              field='Idea Description'
              name='description'>
              <ButtonTextInput
                title={description ? description : 'Enter your idea description'}
                onPress={() => toDescription(values)}
              >
              </ButtonTextInput>
            </ButtonTextInputFieldContainer>
            {categories.length > 0 &&
              <DropdownFormFieldContainer
                field='Idea Category'
                name='category'>
                <DropdownFormField
                  items={categories}
                  setItems={setCategories}
                  value={values.category}
                  onChangeValue={(selCat) => setFieldValue('category', selCat)}
                >
                </DropdownFormField>
              </DropdownFormFieldContainer>
            }
            {labelChoices.length > 0 && initialLabels &&
              <LabelListContainer
                field='Idea Labels'
                name='labels'
              >
                <LabelList
                  labelChoices={labelChoices}
                  selectedLabels={values.labels}
                  onIconPress={(selectedLabels) => setFieldValue('labels', selectedLabels)}
                />
              </LabelListContainer>
            }
            <ImageChoiceFormFieldContainer
              field='Add Image'
              onSetImage={(img) => setFieldValue('image', img)}
              onIconPress={() => setFieldValue('imageChecked', !values.imageChecked)}
              checked={values.imageChecked}
              image={idea && idea.image}
            />
            <ButtonSubmit
              title='Submit'
              onPress={handleSubmit}
              disabled={!isValid}
            >
            </ButtonSubmit>
          </>
        )}
      </Formik>
    </VirtualScrollView>
  );
};

IdeaCreate.navigationOptions = {
  headerTitle: 'Submit your idea',
  // headerBackTitle only for iOS
  headerBackTitle: 'Back'
};
