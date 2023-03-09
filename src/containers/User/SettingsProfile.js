import React, { useContext } from 'react'
import { Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik'
import * as yup from 'yup'

import API from '../../BaseApi'
import { ButtonAvatar } from '../../components/ButtonAvatar'
import { TextInputFormField } from '../../components/formFields'
import { Header } from '../../components/Header'
import { KeyboardScrollView } from '../../components/KeyboardScrollView'
import { ListContainer, ListItem } from '../../components/List'
import { StatusBarStyled } from '../../components/StatusBarStyled'
import { ProfileContext } from '../../contexts/ProfileContext'

import { styles } from './SettingsProfile.styles'

export const SettingsProfile = props => {
  const [profileContext, setProfileContext] = useContext(ProfileContext)

  const userNameValidationSchema = yup.object().shape({
    username: yup
      .string()
      .max(60, 'Required. 60 characters or fewer. Letters, digits, spaces and @/./+/-/_ only.')
  })

  const makeFormData = (values) => {
    // do not send image data if not changed
    if (!values['user_image']) {
      delete values['user_image']
    } else if (values['user_image'] === profileContext?.newUserImage) {
      delete values['user_image']
    } else if (values['user_image'] !== profileContext?.newUserImage) {
      // instead of setFieldValue (Formik), assigning "manually" here
      values['user_image'] = profileContext.newUserImage
      setProfileContext({
        ...profileContext,
        userImage: profileContext.newUserImage,
        newUserImage: null
      })
    }

    // update profile context if username changed
    if (values['username'] !== profileContext?.userName) {
      setProfileContext({...profileContext, userName: values['username']})
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
    return API.editUser(formData)
      .then((response) => {
        const {statusCode, data} = response
        if (statusCode == 200) {
          Alert.alert('You\'re profile has been updated')
          props.navigation.navigate('SettingsOverview')
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

  const toProfileSettingsAvatar = () => {
    props.navigation.navigate('SettingsProfileAvatar')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarStyled />
      <Formik
        validationSchema={userNameValidationSchema}
        initialValues={{
          username: profileContext.userName,
          user_image: profileContext.userImage
        }}
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
          isValid
        }) => (
          <>
            <Header transparent={true} navigation={props.navigation} />
            <KeyboardScrollView
              handleSubmit={handleSubmit}
              isValid={isValid}
              buttonText='Save'
            >
              <ListContainer
                title='Edit Profile'>
                <ListItem>
                  <ButtonAvatar
                    imgSource={{uri:
                      profileContext?.newUserImage?.uri ||
                      profileContext?.userImage?.uri ||
                      profileContext?.userImageFallback?.uri
                    }}
                    a11yLabelText="Change profile picture"
                    a11yHintText="Click to navigate to change or add your profile image"
                    avatarStyles={styles.avatarStyles}
                    onPress={() => toProfileSettingsAvatar()}
                  >
                    {profileContext.userImage
                      ? 'Change profile picture'
                      : 'Add profile picture'
                    }
                  </ButtonAvatar>
                </ListItem>
                <TextInputFormField
                  username='username'
                  field='Username'
                  value={values.username}
                  placeholder={profileContext?.userName}
                  returnKeyType='next'
                  returnKeyLabel='next'
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  error={errors.username}
                  touched={touched.username}
                  textInputContainer={styles.textInputList}
                />
              </ListContainer>
            </KeyboardScrollView>
          </>
        )}
      </Formik>
    </SafeAreaView>
  )
}
