import { useEffect, useState } from 'react'
import * as FileSystem from 'expo-file-system'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import mime from 'mime'

const MAX_UPLOAD_FILE_SIZE_BYTES = 5e6
const IMAGE_WIDTH_PX = 1400
const IMAGE_COMPRESSION_NORM = 1 // normalized range from 0 to 1

export const useImageResize = () => {
  const [input, setInput] = useState()
  const [output, setOutput] = useState()

  useEffect(() => {
    if (input) {
      resizeImage(input)
        .then(resized => {
          setOutput(makeOutput(resized))
        })
    }
  }, [input])

  const getFileSize = async (fileUri) => {
    const fileMeta = await FileSystem.getInfoAsync(fileUri)
    return fileMeta
  }

  const getImageFileSize = async (imgObj) => {
    if (imgObj?.fileSize) {
      return imgObj.fileSize
    } else {
      const imgMeta = await getFileSize(imgObj.uri)
      return imgMeta.size
    }
  }

  const resizeImage = async (imageFromExpo) => {
    const inputImageSize = await getImageFileSize(imageFromExpo)
    if (inputImageSize < MAX_UPLOAD_FILE_SIZE_BYTES) {
      return imageFromExpo
    }
    const resizedImage = await manipulateAsync(
      imageFromExpo.localUri || imageFromExpo.uri,
      [{ resize: { width: IMAGE_WIDTH_PX } }],
      { compress: IMAGE_COMPRESSION_NORM, format: SaveFormat.JPEG }
    )
    resizedImage.size = await getImageFileSize(resizedImage)
    return resizedImage
  }

  const makeOutput = (image) => {
    const outputImage = {
      type: '',
      name: '',
      size: 0,
      uri: ''
    }

    const nameRegex = /[^/]*$/
    const imgName = image.uri.match(nameRegex)
    const extRegex = /\w+$/
    const imgExt = imgName[0].match(extRegex)

    outputImage.type = imgExt ? mime.getType(imgExt[0]) : 'image/jpeg'
    outputImage.name = imgName ? imgName[0] : 'unnamed'
    outputImage.size = image.fileSize || image.size
    outputImage.uri = image.uri

    return outputImage
  }
  return [output, setInput]
}
