import React, { useEffect,useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Image, Platform,View } from 'react-native'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import { Button } from '@rneui/base'
import * as Device from 'expo-device'
import * as ImagePicker from 'expo-image-picker'
import mime from 'mime'

import { CheckBoxFormField } from './formFields'
import { FormLabel } from './FormLabel'
import { styles } from './imageFormField.styles'
import { TextSourceSans } from './TextSourceSans'

export const ImagePickerFormField = (props) => {
  const { t } = useTranslation()
  const [capturedImage, setCapturedImage] = useState(null)
  const [image, setImage] = useState(props.initialImage)
  const isSimulator = Device.brand === 'Apple' && !Device.isDevice

  const makePayload = (imageFromExpo) => {
    const imagePayload = {
      type: '',
      name: '',
      size: 0,
      uri: ''
    }

    const nameRegex = /[^/]*$/
    const imgName = imageFromExpo.uri.match(nameRegex)
    const imgSize = imageFromExpo.fileSize
    const extRegex = /\w+$/
    const imgExt = imgName[0].match(extRegex)

    imagePayload.type = imgExt ? mime.getType(imgExt[0]) : 'image/jpeg'
    imagePayload.name = imgName ? imgName[0] : 'unnamed'
    imagePayload.size = imgSize ? imgSize : 1
    imagePayload.uri = imageFromExpo.uri

    return imagePayload
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          Alert.alert(t('Sorry, we need camera roll permissions to make this work!'))
        }
      }
    })()
  }, [capturedImage, image])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    })

    const payload = makePayload(result.assets[0])

    if (!result.canceled) {
      setImage(payload.uri)
      props.onSetImage(payload)
    }
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!')
        }
      }
    })()
  }, [capturedImage, image])

  const captureImageHandler = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    })

    const payload = makePayload(result.assets[0])

    if (!result.canceled) {
      setCapturedImage(payload.uri)
      props.onSetImage(payload)
    }
  }

  const deleteImageHandler = async () => {
    setCapturedImage(null)
    setImage(null)
    props.onSetImage(null)
  }

  const closeIcon = <IconSLI name='close' style={styles.iconRemoveButton} />
  const cameraIcon = <IconSLI name='camera' style={styles.iconButton} />
  const pictureIcon = <IconSLI name='picture' style={styles.iconButton} />

  const imagePreview = (
    <>
      <Button
        buttonStyle={styles.imageRemoveButton}
        onPress={deleteImageHandler}
        icon={closeIcon}
        type='clear'
      />
      <Image
        style={styles.formImagePreview}
        source={ image ? {uri: image} : {uri: capturedImage}}
        resizeMode="contain"
        accessibilityIgnoresInvertColors={true}
      />
    </>
  )

  return (
    <>
      <View
        style={capturedImage || image ?
          styles.formImagePickerFull : styles.formImagePicker
        }
      >
        {!capturedImage && !image &&
        <Button
          buttonStyle={[styles.imageAddButton, styles.imageAddButtonLeft]}
          title={isSimulator ? 'Camera - not available' : 'Camera'}
          onPress={captureImageHandler}
          icon={cameraIcon}
          type='clear'
          titleStyle={styles.textDark}
          imageUri={capturedImage}
          disabled={isSimulator}
        />}
        {capturedImage && props.imagePreview && imagePreview}
      </View>
      <View style={capturedImage || image ?
        styles.formImagePickerFull : styles.formImagePicker
      }>
        {!capturedImage && !image &&
        <Button
          buttonStyle={[styles.imageAddButton, styles.imageAddButtonRight]}
          title='Library'
          onPress={pickImage}
          type='clear'
          icon={pictureIcon}
          titleStyle={styles.textDark}
          imageUri={image}
        />}
        {image && props.imagePreview && imagePreview}
      </View>
    </>
  )
}

export const ImageChoiceFormFieldContainer = (props) => {
  const cloudUploadIcon = (
    <IconSLI
      name='cloud-upload'
      style={[styles.imageButtonIcon, styles.textLight]} />
  )

  const [clicked, setClicked] = useState(false)

  return (
    <View style={styles.formRow}>
      <FormLabel>{props.field}</FormLabel>
      {(!clicked && !props.image) &&
                <Button
                  buttonStyle={styles.imageButton}
                  icon={cloudUploadIcon}
                  type='fill'
                  title='Add image'
                  titleStyle={styles.textLight}
                  clicked={props.clicked}
                  setClicked={props.setClicked}
                  onPress={setClicked}
                />
      }
      <TextSourceSans style={styles.imageInfo}>
        Visualize your idea. It must be min. 600 pixel wide and 400 pixel tall.
        Allowed file formats are png, jpeg, gif. The file size should be
        max. 5 MB.
      </TextSourceSans>
      {(clicked || props.image) &&
        <>
          <ImagePickerFormField
            onSetImage={props.onSetImage}
            initialImage={props.image}
            imagePreview={true}
          />
          <CheckBoxFormField
            field='Image Copyright'
            name='imageCopyrightChecked'
            onIconPress={props.onIconPress}
            checked={props.checked}
            title='I hereby confirm that the copyrights for this photo are with
            me or that I have received rights of use from the author.
            I also confirm that the privacy rights of depicted third persons
            are not violated.'
          />
        </>
      }
    </View>
  )
}
