import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import { testToken } from '../../tests/TestData'

AsyncStorageMock.getItem = jest.fn((key) => {
  if (key === 'authToken') {
    return Promise.resolve(testToken)
  }
})

export default AsyncStorageMock
