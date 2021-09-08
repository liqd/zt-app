import React, {useState, useEffect} from 'react';
import { Alert, View, ScrollView, Text } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

import { styles } from './Idea.styles';
import {
  TextInputFormField,
  CheckBoxFormFieldContainer,
  CheckBoxFormField,
  DropdownFormFieldContainer,
  DropdownFormField } from '../../components/formFields';
import {
  ImagePickerFormField,
  ImageChoiceFormFieldContainer } from '../../components/imageFormField';
import API from '../../BaseApi';

export const IdeaCreate = props => {

  const {idea, project, editing} = props.route.params;
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
      .min(20, ({ min }) => `Description must be at least ${min} characters`)
      .max(100, 'Description must be no longer then 100 characters')
      .required('Description is required'),
  });

  const [error, setError] = useState();
  const [clicked, setClicked] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [labels, setLabels] = useState([]);
  const [labelsChecked, setLabelsChecked] = useState([]);

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{ text: 'Ok' }]);
    }
    else {
      setLabelsAndCategories();
    }
  }, [error, project]);

  const setLabelsAndCategories = async() => {
    const module = await API.getModule(moduleId);

    if (module.categories) {
      // map property names to format needed for formik
      setCategories(module.categories.map(category => ({value: category.id, label: category.name})));
      if (editing) {
        setSelectedCategory(idea.category.id);
      }
      else {
        setSelectedCategory(module.categories[0].id);
      }
    }
    if (module.labels) {
      setLabels(module.labels.map(label => ({value: label.id, label: label.name})));

      if (editing) {
        // idea.labels is array of label ids -> map that to array of bools with length = number of
        // of module labels and true iff label is checked
        setLabelsChecked(module.labels.map(label => (idea.labels.some(entry => entry.id===label.id))));
      }
      else {
        setLabelsChecked(new Array(module.labels.length).fill(false));
      }
    }
  };

  const getSelectedLabels = () => {
    let selectedLabels = [];
    labelsChecked.forEach((isSelected, index) => {
      if (isSelected) {
        selectedLabels.push(labels[index].value);
      }
    });
    return selectedLabels;
  };

  const handleLabelCheck = (labelIndex) => {
    return labelsChecked.map((isSelected, index) => {
      return (index === labelIndex) ? !isSelected : isSelected;
    });
  };

  const handleSubmit = (values) => {
    values.labels = getSelectedLabels();
    AsyncStorage.getItem('authToken')
      .then((token) => {
        if (editing) {
          return API.editIdea(moduleId, idea.pk, values, token);
        }
        else {
          return API.postIdea(moduleId, values, token);
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
            idea: data
          });
        }
        else if (statusCode == 400) {
          setError('Required fields are missing.');
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
    <ScrollView
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
      <Text style={styles.title}>Submit a new idea for this project</Text>
      <Formik
        validationSchema={ideaValidationSchema}
        initialValues={{
          ...(editing
            ? {
              name: idea.name,
              description: idea.description ,
            }
            : {
              name: '',
              description: '' ,
            }),

          labels: [],
          category: selectedCategory,
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
            <TextInputFormField
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
            />
            {categories.length > 0 &&
              <DropdownFormFieldContainer
                field='Idea Category'
                name='category'>
                <DropdownFormField
                  items={categories}
                  setItems={setCategories}
                  value={selectedCategory}
                  setValue={setSelectedCategory}
                  onChangeValue={() => setFieldValue('category', selectedCategory)}
                >
                </DropdownFormField>
              </DropdownFormFieldContainer>
            }
            {labels.length > 0 &&
              <CheckBoxFormFieldContainer
                field='Idea Labels'
                name='labels'
              >
                {labels.map((label, idx) => (
                  <CheckBoxFormField
                    key={`labelfield-${idx}`}
                    title={label.label}
                    value={label.value}
                    checked={labelsChecked[idx]}
                    onIconPress={() => setLabelsChecked(handleLabelCheck(idx))}
                  />)
                )}
              </CheckBoxFormFieldContainer>
            }
            <ImageChoiceFormFieldContainer
              field='Add Image'>
              {!clicked &&
                <Button
                  buttonStyle={styles.imageButton}
                  icon={<Icon name='cloud-upload' style={[styles.iconButton, styles.textLight]} />}
                  type='fill'
                  title='Add image'
                  titleStyle={styles.textLight}
                  clicked={props.clicked}
                  setClicked={props.setClicked}
                  onPress={setClicked}
                />
              }
              <Text style={styles.formLabel}>Visualize your idea. It must be min. 600 pixel wide and 400 pixel tall. Allowed file formats are png, jpeg, gif. The file size should be max. 5 MB.</Text>

              {clicked &&
                <ImagePickerFormField />
              }
            </ImageChoiceFormFieldContainer>
            <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

IdeaCreate.navigationOptions = {
  headerTitle: 'Submit your idea',
  // headerBackTitle only for iOS
  headerBackTitle: 'Back'
};
