import {
  TouchableOpacity, Image,
  View, ActivityIndicator, Text
} from 'react-native';
import React from 'react';

import MapView, { Marker } from 'react-native-maps';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Favourites from '../src/components/screens/Favourites';
// Note: test renderer must be required after react-native.

jest.mock('react-native-geolocation-service', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  inFocusDisplaying: jest.fn()
}));

configure({ adapter: new Adapter() });

function shallowSetup(props) {
  return shallow(<Favourites {...props} />);
}

function setup(props) {
  const renderer = new ShallowRenderer();
  renderer.render(<Favourites {...props} />);
}

it('renders', () => {
  const wrapper = setup(defaultProps);
  expect(wrapper).toMatchSnapshot();
});

it('should render current state', () => {
  const wrapper = shallowSetup(defaultProps);
  expect(wrapper.find(View).length).toBe(4);
  expect(wrapper.find(Text).length).toBe(1);
  expect(wrapper.find(Image).length).toBe(1);
  expect(wrapper.find(TouchableOpacity).length).toBe(1);
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
