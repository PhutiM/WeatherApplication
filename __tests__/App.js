import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

// Note: test renderer must be required after react-native.

jest.mock('react-native-geolocation-service', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  inFocusDisplaying: jest.fn()
}));

it('renders correctly', () => {
  renderer.create(<App />);
});
