import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Richtext } from '../Richtext';

test('Test <Richtext>', () => {
  const testHtml = '<div><span>test text</span></div>';
  render(<Richtext project={{ information: testHtml }} />);
  expect(screen.getByText('test text')).toBeTruthy();
});

test('Test <Richtext> with collapsibles', () => {
  const testHtml = '<div class="collapsible-item"><div class="collapsible-title">test title</div><div class="collapsible-body"><p>test body</p></div></div>';
  render(<Richtext project={{ information: testHtml }} />);
  expect(screen.getByText('test title')).toBeTruthy();
});
