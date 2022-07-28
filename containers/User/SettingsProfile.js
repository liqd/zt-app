import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import * as yup from 'yup'

import API from '../../BaseApi'
import { AvatarCircle } from '../../components/ButtonAvatar'
import { ButtonSubmit } from '../../components/ButtonSubmit'
import { Header } from '../../components/Header'
import { ListContainer, ListItem } from '../../components/List'
import { TextInputFormField } from '../../components/formFields'
import { TextSourceSans } from '../../components/TextSourceSans'

import { styles } from './SettingsProfile.styles'


export const SettingsProfile = props => {

  const {userId, userName, userImage} = props.route.params
  const [user, setUser] = useState()

  const userNameValidationSchema = yup.object().shape({
    username: yup
      .string()
      .max(60, 'Required. 60 characters or fewer. Letters, digits, spaces and @/./+/-/_ only.')
  })

  const handleSubmit = (values) => {
    const username = values.username
    const userimage = userImage
    AsyncStorage.getItem('authToken')
      .then((token) => {
        return API.editUser({username, userimage}, token)
      })
      .then((response) => {
        const {statusCode, data} = response
        if (statusCode == 200) {
          Alert.alert('You\'re Username has been updated')
          props.navigation.navigate({
            name: 'SettingsOverview',
            params: {
              userName: username,
              userImage: userimage
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
    <View style={styles.container}>
      <Formik
        validationSchema={userNameValidationSchema}
        initialValues={{username: userName}}
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
            <View>
              <Header navigation={props.navigation} />
              <ListContainer
                title='Edit Profile'>
                <ListItem>
                  <AvatarCircle
                    imgSource={user && {uri: user._avatar}}
                    avatarStyles={styles.avatarStyles}
                  />
                </ListItem>
                <TextInputFormField
                  field='Username'
                  username='username'
                  value={values.username}
                  placeholder={user && user.username}
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
    </View>
  )
}
