import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import * as Utilities from '../src/components/Utilities';

jest.mock('react-native-geolocation-service', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  inFocusDisplaying: jest.fn()
}));

describe('Utlities', () => {
  const { DayOfWeek } = Utilities;
  it('Should return Thursday', () => expect(DayOfWeek('2019/08/29 00:00:00')).toEqual('Thursday'));

  it('Should return Saturday', () => expect(DayOfWeek('2019/12/07 00:00:00')).toEqual('Saturday'));

  const { GetBackgroundByWeather } = Utilities;

  it('GetBackgroundByWeather with clear', () => expect(GetBackgroundByWeather('Clear')).toEqual('test-file-stub'));

  const { RectColor } = Utilities;

  it('should return #4a90e2s', () => {
    expect(RectColor('Clear')).toEqual('#4a90e2');
    expect(RectColor('Clouds')).toEqual('#628594');
    expect(RectColor('Rain')).toEqual('#686868');
  });
});
