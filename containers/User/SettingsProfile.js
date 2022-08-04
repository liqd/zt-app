import React from 'react'
import { Alert, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import * as yup from 'yup'

import API from '../../BaseApi'
import { ButtonSubmit } from '../../components/ButtonSubmit'
import { TextInputFormField } from '../../components/formFields'
import { Header } from '../../components/Header'
import { AvaterImageAddButton } from '../../components/imageFormField'
import { ListContainer, ListItem } from '../../components/List'

import { styles } from './SettingsProfile.styles'

export const SettingsProfile = props => {

  const {userName, userImage} = props.route.params

  const userNameValidationSchema = yup.object().shape({
    username: yup
      .string()
      .max(60, 'Required. 60 characters or fewer. Letters, digits, spaces and @/./+/-/_ only.')
  })

  const makeFormData = (values) => {
    // do not send null image on create
    if ('image' in values && values.image == null) {
      delete values['image']
    }
    let formData = new FormData()
    for (let key in values) {
      Array.isArray(values[key])
        ? values[key].forEach((value) => formData.append(key, value))
        : formData.append(key, values[key])
    }
    return formData
  }

  const handleSubmit = (values) => {
    const formData = makeFormData(values)
    AsyncStorage.getItem('authToken')
      .then((token) => {
        return API.editUser(formData, token)
      })
      .then((response) => {
        const {statusCode, data} = response
        if (statusCode == 200) {
          Alert.alert('You\'re profile has been updated')
          props.navigation.navigate({
            name: 'SettingsOverview',
            params: {
              userName: values.username,
              userImage: values.image.uri
            },
            merge: true,
          })
        } else {
          const errorMessage = 'That did not work.'
          let errorDetail
          if (statusCode==403) {
            errorDetail = data.detail
          } else if (statusCode == 400) {
            errorDetail = 'Bad request'
          }
          Alert.alert(errorMessage, errorDetail)
        }
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        validationSchema={userNameValidationSchema}
        initialValues={
          {username: userName},
          {image: userImage}
        }
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
          <>
            <View>
              <Header transparent={true} navigation={props.navigation} />
              <ListContainer
                title='Edit Profile'>
                <ListItem>
                  <AvaterImageAddButton
                    name='image'
                    values={values.image}
                    field='Change profile picture'
                    fieldPreview='Profile picture'
                    labelText='change profile image'
                    title='profile image'
                    onSetImage={(img) => {
                      setFieldValue('image', img)
                    }}
                    imgSource={{uri: userImage}}
                    image={values.image ? values.image.uri : userImage}
                  />
                </ListItem>
                <TextInputFormField
                  username='username'
                  field='Username'
                  value={values.username}
                  placeholder={userName}
                  returnKeyType='next'
                  returnKeyLabel='next'
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  error={errors.username}
                  touched={touched.username}
                  textInputContainer={styles.textInputList}
                />
              </ListContainer>
            </View>
            <ButtonSubmit
              title='Save'
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </>
        )}
      </Formik>
    </SafeAreaView>
  )
}
