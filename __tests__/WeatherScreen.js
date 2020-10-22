import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WeatherScreen from '../src/components/screens/WeatherScreen';

jest.mock('react-native-geolocation-service', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  inFocusDisplaying: jest.fn()
}));

configure({ adapter: new Adapter() });

function shallowSetup(props) {
  return shallow(<WeatherScreen {...props} />);
}

it('should render current state', () => {
  const wrapper = shallowSetup(defaultProps);
  expect(wrapper.find(View).length).toBe(2);
  expect(wrapper.find(ActivityIndicator).length).toBe(1);
});

const defaultProps = {
  onRegionChangeComplete: jest.fn(),
  locations: {
    latitude: 23.987888,
    longitude: -23.44343
  },
  pointers: [{
    coord: {
      lat: 23.987888,
      lon: -23.44343
    }
  },
  {
    coord: {
      lat: 23.987888,
      lon: -23.44343
    }
  }
  ]
};
