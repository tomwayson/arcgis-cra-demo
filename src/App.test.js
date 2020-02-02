import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  // TODO: demonstrate how to **not** load the ArcGIS JS API nor render the map
  const { getByText } = render(<App />);
  const buttonElement = getByText(/Dark/i);
  expect(buttonElement).toBeInTheDocument();
  // TODO: click the button and verify that the them was updated
});
