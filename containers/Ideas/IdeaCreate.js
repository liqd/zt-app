import React, {useState, useEffect} from 'react';
import { Alert, View, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-elements';
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
  ImageCaptureFormField,
  ImageChoiceFormFieldContainer } from '../../components/imageFormField';
import API from '../../BaseApi';

export const IdeaCreate = props => {

  const [error, setError] = useState();
  const {moduleId, project} = props.route.params;
  const arrowLeftIcon = (
    <IconSLI name='arrow-left' size={22} />
  );

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{ text: 'Ok' }]);
    }
    else {
      fetchLabelsAndCategories();
    }
  }, [error, categories, labels]);

  const handleSubmit = (values) => {
    values.labels = getSelectedLabels();
    AsyncStorage.getItem('authToken')
      .then((token) => API.postIdea(moduleId, values, token))
      //error handling is provisional and should probably go somewhere else eventually
      .then(response => {
        if (response.statusCode == 201) {
          Alert.alert('Your idea was added.', 'Thank you for participating!',  [{ text: 'Ok' }]);
          props.navigation.navigate('IdeaProject', {
            project: project
          });
        }
        else if (response.statusCode == 400) {
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
    return labelsChecked.map((isSelected,index) => {
      return (index === labelIndex) ? !isSelected : isSelected;
    });
  };

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

  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [labels, setLabels] = useState([]);
  const [labelsChecked, setLabelsChecked] = useState([]);

  const fetchLabelsAndCategories = async() => {
    const fetchedItems = await API.getModule(moduleId);

    // mapping fetched list to structure for view
    const flattenedCategories =
      fetchedItems && fetchedItems.categories &&
        fetchedItems.categories.map(cat => ({value: cat[0], label: cat[1]})) || [];
    const flattenedLabels =
      fetchedItems && fetchedItems.categories &&
        fetchedItems.labels.map(lab => ({value: lab[0], label: lab[1]})) || [];

    // checking if not fetchedItems false, then setCategories and setLabels
    if (flattenedCategories.length > 0) {
      setCategories(prevCategories => [...prevCategories, ...flattenedCategories]);
      setSelectedCategory(flattenedCategories[0].value);
    }
    if (flattenedLabels.length > 0) {
      setLabels(prevLabels => [...prevLabels, ...flattenedLabels]);
      setLabelsChecked(new Array(flattenedLabels.length).fill(false));
    }
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
          name: '',
          description: '' ,
          labels: [],
          ...(categories.length>0 && { category: '' }),
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
                  open={open}
                  setOpen={setOpen}
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
            {clicked &&
              <ImageChoiceFormFieldContainer
                field='Add image'
              >
                <ImageCaptureFormField />
                <ImagePickerFormField />
              </ImageChoiceFormFieldContainer>
            }
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
