import React from 'react';
import { render } from '@testing-library/react-native';
import { ModalItem } from '../ModalItem';

test('Test ModalItem', () => {
  const { toJSON} = render(<ModalItem item={{isCancel: false, isText:false}} />);
  expect(toJSON()).toMatchSnapshot();
});

test('Test ModalItem Action', () => {
  const { toJSON} = render(<ModalItem item={{isCancel: false, isText:false, action: () => {}}} />);
  expect(toJSON()).toMatchSnapshot();
});

test('Test ModalItem isCancel', () => {
  const { toJSON} = render(<ModalItem item={{isCancel: true, isText:false}} />);
  expect(toJSON()).toMatchSnapshot();
});

test('Test ModalItem isText', () => {
  const { toJSON} = render(<ModalItem item={{isCancel: false, isText:true}} />);
  expect(toJSON()).toMatchSnapshot();
});

test('Test ModalItem isCancel isText', () => {
  const { toJSON} = render(<ModalItem item={{isCancel: true, isText:true}} />);
  expect(toJSON()).toMatchSnapshot();
});
