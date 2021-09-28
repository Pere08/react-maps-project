import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { render, screen } from './utils/test.utils';
import Map from './Map';

jest.mock('@react-google-maps/api');

describe('Given a map component', () => {
  describe('When is rendered and isLoaded is true', () => {
    test('Title is showed', () => {
      useJsApiLoader.mockReturnValue({
        isLoaded: true,
      });
      render(
        <Map />,
      );
      expect(screen.getByTestId('Title')).toBeInTheDocument();
    });
  });
});
