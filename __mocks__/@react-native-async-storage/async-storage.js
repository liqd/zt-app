import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';

AsyncStorageMock.getItem = jest.fn((key) => {
  if (key === 'authToken') {
    return Promise.resolve('test-authToken')
  }
})

export default AsyncStorageMock;
