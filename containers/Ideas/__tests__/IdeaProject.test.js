import React from 'react'
import '@testing-library/jest-native/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { IdeaProject } from '../IdeaProject'
import API from '../../../BaseApi'

API.getModule = jest.fn(() => Promise.resolve())

jest.mock('../../../components/Richtext', () => ({
  __esModule: true,
  Richtext: () => (<></>)
}))

test('Contact Infos', async () => {
  const mockProject = {
    route: {
      params: {
        project: {
          has_contact_info: true,
          contact_name: 'some name',
          contact_address_text: 'some address',
          contact_phone: '1234',
          contact_email: 'some@email.com',
          contact_url: 'someurl.com',
        }
      },
    },
    navigation: {
      addListener: jest.fn(),
      goBack: jest.fn(),
      navigate: jest.fn()
    }
  }

  const { getByText } = render(<IdeaProject {...mockProject} />)
  const infoTabBtn = getByText('Information')
  fireEvent(infoTabBtn, 'press')
  const contactName = getByText('some name')
  expect(contactName).toBeTruthy()
  const contactAddress = getByText('some address')
  expect(contactAddress).toBeTruthy()
  const contactPhone = getByText('1234')
  expect(contactPhone).toBeTruthy()
  const contactMail = getByText('some@email.com')
  expect(contactMail).toBeTruthy()
  const contactWeb = getByText('someurl.com')
  expect(contactWeb).toBeTruthy()
  await waitFor(() => {
    expect(API.getModule).toHaveBeenCalled()
  })
})
