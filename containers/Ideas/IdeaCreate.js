import React, {useState} from 'react';
import { Button, View, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import { styles } from './Idea.styles';
import { TextInputFormField, CheckBoxFormFieldContainer, CheckBoxFormField, DropdownFormFieldContainer, DropdownFormField, ImagePickerFormField } from '../../components/formFields';

export const IdeaCreate = props => {

  const pressHandler = () => props.navigation.pop();

  const ideaValidationSchema = yup.object().shape({
    title: yup
      .string()
      .required('Idea title is Required'),
    description: yup
      .string()
      .min(20, ({ min }) => `Description must be at least ${min} characters`)
      .max(100, 'Description must be no longer then 100 characters')
      .required('Description is required'),
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Category 1', value: 'category1'},
    {label: 'Category 2', value: 'category2'}
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit a new idea for this project</Text>
      <Formik
        validationSchema={ideaValidationSchema}
        initialValues={{ title: '', description: '' }}
        onSubmit={values => console.log(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid
        }) => (
          <>
            <TextInputFormField
              field='Idea title'
              name='title'
              value={values.title}
              placeholder='Enter your idea title'
              returnKeyType='next'
              returnKeyLabel='next'
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              error={errors.title}
              touched={touched.title}
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
            <DropdownFormFieldContainer
              field='Idea Category'
              name='category'>
              <DropdownFormField
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              >
              </DropdownFormField>
            </DropdownFormFieldContainer>
            <CheckBoxFormFieldContainer
              field='Idea Labels'
            >
              <CheckBoxFormField
                title='Label 1'
              />
              <CheckBoxFormField
                title='Label 2'
              />
              <CheckBoxFormField
                title='Label 3'
              />
            </CheckBoxFormFieldContainer>
            <ImagePickerFormField />
            <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
          </>
        )}
      </Formik>
    </View>
  );
};

IdeaCreate.navigationOptions = {
  headerTitle: 'Submit your idea',
  // headerBackTitle only for iOS
  headerBackTitle: 'Back'
};
