import 'react-native';
import React from 'react';
import {
  TouchableOpacity, Image,
  View, Text
} from 'react-native';
import { shallow, configure } from 'enzyme';
import LandingScreen from '../src/components/screens/LandingScreen';
import Adapter from 'enzyme-adapter-react-16';
// Note: test renderer must be required after react-native.

jest.mock('react-native-geolocation-service', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  inFocusDisplaying: jest.fn()
}));


configure({ adapter: new Adapter() });

function shallowSetup(props) {
  return shallow(<LandingScreen {...props} />);
}

it('should render current state', () => {
  const wrapper = shallowSetup(defaultProps);
  expect(wrapper.find(View).length).toBe(3);
  expect(wrapper.find(Text).length).toBe(2);
  expect(wrapper.find(Image).length).toBe(1);
  expect(wrapper.find(TouchableOpacity).length).toBe(2);
});

const defaultProps = {
 
}
