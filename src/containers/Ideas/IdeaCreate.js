import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'
import * as yup from 'yup'

import API from '../../BaseApi'
import { ButtonTextInput, ButtonTextInputFieldContainer } from '../../components/ButtonTextInput'
import { DropdownFormField, TextInputFormField } from '../../components/formFields'
import { Header } from '../../components/Header'
import {
  ImageChoiceFormFieldContainer } from '../../components/imageFormField'
import { KeyboardScrollView } from '../../components/KeyboardScrollView'
import { LabelList,LabelListContainer } from '../../components/LabelForm'
import { StatusBarStyled } from '../../components/StatusBarStyled'
import { TextSourceSans } from '../../components/TextSourceSans'
import { VirtualScrollView } from '../../components/VirtualScrollView'

import { styles } from './IdeaCreate.styles'

export const IdeaCreate = props => {
  const { t } = useTranslation()
  const {idea, module, editing, descriptionText } = props.route.params
  const ideaValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required(t('Idea title is Required')),
    description: yup
      .string()
      .required(t('Description is required')),
    imageChecked: yup
      .boolean()
      .when('image', {
        is: (image) => !!image,
        then: yup.boolean()
          .oneOf([true], t('Please confirm the copyright'))
      })
  })

  const [error, setError] = useState()
  const [categories, setCategories] = useState([])
  const [labelChoices, setLabelChoices] = useState([])
  const [initialCategory, setInitialCategory] = useState('')
  const [initialLabels, setInitialLabels] = useState([])
  const [description, setDescription] = useState(() => editing ? idea.description : '')
  const [prevValues, setPrevValues] = useState('')
  const [submitPending, setSubmitPending] = useState(false)

  useEffect(() => {
    if (error) {
      Alert.alert(t('An error occured'), error, [{ text: t('Ok') }])
    }
  }, [error])

  useEffect(() => {
    if (descriptionText) {
      setDescription(descriptionText)
    }
  }, [descriptionText])

  useEffect(() => {
    setLabelsAndCategories()
  }, [module])

  const setLabelsAndCategories = () => {
    if (module.categories) {
      // map property names to format needed for formik
      // Example: [{value: 9, label: 'catname1'}]
      setCategories(module.categories.map(category => ({value: category.id, label: category.name})))
      if (editing && idea.category) {
        setInitialCategory(idea.category.id)
      } else {
        setInitialCategory(module.categories[0].id)
      }
    }
    if (module.labels) {
      setLabelChoices(module.labels)

      if (editing) {
        setInitialLabels(idea.labels)
      } else {
        setInitialLabels([])
      }
    }
  }

  const mapLabels = (exLabels) => {
    return exLabels.map(el => el.id)
  }

  const processImageData = (values) => {
  // only send image data if different image was uploaded
  // if image was deleted, send image_deleted = true
    if (values.image) {
      editing && idea.image && (idea.image == values.image) && delete values['image']
    } else {
      delete values['image']
      editing && idea.image && (values.image_deleted = true)
    }
    return values
  }

  const makeFormData = (values) => {
    const extractedLabels = [...values.labels]
    extractedLabels && (values.labels = mapLabels(extractedLabels))
    let formData = new FormData()
    for (let key in values) {
      Array.isArray(values[key])
        ? values[key].forEach((value) => formData.append(key, value))
        : formData.append(key, values[key])
    }
    return formData
  }

  const handleSubmit = (values) => {
    setSubmitPending(true)
    values.description = description
    const processedValues = processImageData(values)
    const formData = makeFormData(processedValues)
    return (editing
      ? API.editIdea(module.pk, idea.pk, formData)
      : API.postIdea(module.pk, formData)
    )
    //error handling is provisional and should probably go somewhere else eventually
      .then(response => {
        const {statusCode, data} = response
        if (statusCode === 201) {
          Alert.alert(t('Your idea was added.'), t('Thank you for participating!'),
            [{ text: t('Ok') }])
          props.navigation.goBack()
        } else if (editing && statusCode === 200) {
          Alert.alert(t('Your idea was updated.'), '',  [{ text: t('Ok') }])
          props.navigation.navigate({
            name: 'IdeaDetail',
            params: { idea: data },
            merge: true,
          })
        } else if (statusCode === 400) {
          let errorMsg
          if (data && data.image) {
            errorMsg = data.image.reduce((acc, curr) => {
              return `${acc}\n${curr}`
            }, t('Please try again.\n'))
          } else {
            errorMsg = (t('Required fields are missing.'))
          }
          return Promise.reject(errorMsg)
        } else if (statusCode === 403) {
          return Promise.reject(data.detail)
        } else {
          return Promise.reject(t('Try again.'))
        }
      })
      .catch(error => {
        setError(error)
        setSubmitPending(false)
      })
  }

  const getInitialValues = () => {
    const initialValues = prevValues
      ? {
        name: prevValues.name ? prevValues.name : '',
        description: description ? description : '',
        labels: prevValues.labels ? prevValues.labels : initialLabels,
        category: prevValues.category ? prevValues.category : initialCategory,
        imageChecked: prevValues.imageChecked ? prevValues.imageChecked : false,
        image: prevValues.image ? prevValues.image : null
      }
      : {
        name: editing ? idea.name : '',
        description: editing ? idea.description : '',
        labels: initialLabels,
        category: initialCategory,
        imageChecked: editing ? !!idea.image : false,
        image: (editing && idea.image) ? idea.image : null
      }
    return initialValues
  }

  const toDescription = (values) => {
    setPrevValues(values)
    props.navigation.navigate('IdeaCreateDescription', {
      description: description,
    })
  }

  return (
    <SafeAreaView
      style={styles.flexContainer}
    >
      <StatusBarStyled />
      <View style={styles.header}>
        <Header
          navigation={props.navigation} />
      </View>
      <VirtualScrollView
        contentContainerStyle={styles.flexContainer}
        listHeaderStyle={styles.flexContainer}
      >
        <TextSourceSans style={styles.title}>{t('Submit a new idea for this project')}</TextSourceSans>
        <Formik
          validationSchema={ideaValidationSchema}
          initialValues={getInitialValues()}
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
            setFieldValue
          }) => (
            <KeyboardScrollView
              handleSubmit={handleSubmit}
              isValid={isValid && !submitPending}
              buttonText={t('Submit')}
            >
              <View style={styles.container}>
                <TextInputFormField
                  field={t('Idea title')}
                  name='name'
                  value={values.name}
                  placeholder={t('Enter your idea title')}
                  returnKeyType='next'
                  returnKeyLabel={t('next')}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  error={errors.name}
                  touched={touched.name}
                />
                <ButtonTextInputFieldContainer
                  field={t('Idea Description')}
                  name='description'>
                  <ButtonTextInput
                    title={description ? description : t('Enter your idea description')}
                    onPress={() => toDescription(values)}
                    textInputButtonTitle={description ?
                      styles.textInputButtonTitleDark :
                      styles.textInputButtonTitleLight}
                  >
                  </ButtonTextInput>
                </ButtonTextInputFieldContainer>
                {categories.length > 0 &&
                  <DropdownFormField
                    field={t('Idea Category')}
                    name='category'
                    items={categories}
                    setItems={setCategories}
                    value={values.category}
                    onChangeValue={(selCat) => setFieldValue('category', selCat)}
                  >
                  </DropdownFormField>
                }
                {labelChoices.length > 0 && initialLabels &&
                  <LabelListContainer
                    field={t('Idea Labels')}
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
                  field={t('Add Image')}
                  name='image'
                  onSetImage={(img) => {
                    setFieldValue('image', img)
                    img && setFieldValue('imageChecked', false)
                  }}
                  onIconPress={() => setFieldValue('imageChecked', !values.imageChecked)}
                  checked={values.imageChecked}
                  image={(values.image && values.image.uri)
                    ? values.image.uri
                    : (values.image && values.image)}
                />
              </View>
            </KeyboardScrollView>
          )}
        </Formik>
      </VirtualScrollView>
    </SafeAreaView>
  )
}
