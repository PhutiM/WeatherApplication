import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid } from 'react-native';
import { AsyncStorage } from 'react-native';

const key = '2b9e0a7e9edbac7f28ef0b62cacf07c1';

export const GetWeather = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
  try {
    const resp = await axios.get(url);
    return resp.data;
  }
  catch (err) {
    return err;
  }
}

export const GetCurrentLocation = async (latitude, longitude) => {
  console.log(latitude, "lat")

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`
  try {
    const resp = await axios.get(url);
    return resp.data;
  }
  catch (err) {
    return err;
  }
}

export async function requestPermissions() {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization('whenInUse');
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
    });
  }

  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
}

export const SaveToStorage = (key, data) => {
  storage.save({
    key: key,
    data: data,
    expires: 1000 * 3600
  });
}

export const LoadDataFromStorage = (key) => {
  storage.load({
    key: key,
    autoSync: true,
    syncInBackground: true,
    syncParams: {
      extraFetchOptions: {
        // blahblah
      },
      someFlag: true
    }
  })  .then(ret => {
      return ret
    })
    .catch(err => {
      console.warn(err.message);
    });

}

export const _storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify(data)
    );
  } catch (error) {
    // Error saving data
  }
};

export const _retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value
  } catch (error) {
    // Error retrieving data
  }
}

export const _removeItem =  async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return true;
  } catch (error) {
    return false
  }
}
