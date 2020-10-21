import React, { useEffect, useState } from 'react';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import {
  TouchableOpacity, ScrollView, Image,
  View, ActivityIndicator, StyleSheet, Text
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import * as Api from '../Api';
import MapDisplay from '../MapDisplay';

function Favourites(props) {
  const [location, setLocation] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [added, setAdded] = useState(true);
  const [currentLocation, setCurrentLocation] = useState([]);

  const list = [];
  const forecastList = [];

  const GetCurrentLocation = (latitude, longitude) => {
    Api.GetCurrentLocation(latitude, longitude).then((res) => {
      forecastList.push(res);
      setCurrentLocation(forecastList)
      
      let A = forecastList.concat(forecast)
      setForecast(A);
    })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  const getStoredData = (key) => {
    Api.RetrieveData(key).then((res) => {
      if (res !== null) {
        setForecast(JSON.parse(res));
      }
    })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  const addToStorage = (key, current) => {
    const data = [];
    let newData = [];
    Api.RetrieveData(key).then((res) => {
      if (res === null) {
        data.push(current);
        Api.StoreData(key, current);
        setAdded(true);
      } else {
        newData = JSON.parse(res);
        if (Array.isArray(newData)) {
          newData.push(current);
          Api.StoreData(key, newData);
        } else {
          data.push(newData);
          data.push(current);
          Api.StoreData(key, data);
        }
        setAdded(true);
      }
    })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  useEffect(() => {
    getStoredData('forecast');

    Api.requestPermissions();

      Geolocation.getCurrentPosition(
        (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        alert(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  const openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal({
      country: 'ZA',
      // type: 'establishment'
    }, ['placeID', 'location', 'name', 'address', 'types', 'openingHours', 'plusCode', 'rating', 'userRatingsTotal', 'viewport'])
      .then((place) => {
        setAdded(false)
        list.push(place.location)
        GetCurrentLocation(place.location.latitude, place.location.longitude)
      
      })  
      .catch((error) => console.log(error.message));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.rect2Stack} onPress={() => openSearchModal()}>
        <View style={styles.rect2}>
          <IoniconsIcon name="md-search" style={styles.icon} />
        </View>
        <Text style={styles.addFavourite}>Search Location</Text>
      </TouchableOpacity>
      { forecast.length > 0 || forecast !== undefined
        ? (
          <View style={styles.rect}>
           {added ? <ScrollView>
              {forecast?.map((f, index) => (
                <View style={styles.locationRow}>
                  <Text style={styles.location}>{f.name}</Text>
                  <Text style={styles.centurion1}>{Math.round(f.main.temp)}</Text>
                  <Text style={styles.o5}>o</Text>
                   <MaterialCommunityIconsIcon
                        name="delete"
                        style={styles.icon2}
                        onPress={() => remove()}
                      />
                </View>
              ))}
            </ScrollView>
              : 
              <View>
                {currentLocation?.map((c, i) => (
                  <View style={styles.c}>
                    <Text style={styles.location}>{c.name}</Text>
                    <Text style={styles.centurion1}>{Math.round(c.main.temp)}</Text>
                    <Text style={styles.o5}>o</Text>
                    <MaterialCommunityIconsIcon
                      name="plus"
                      style={styles.icon2}
                      onPress={() => addToStorage('forecast', c)}
                    />
                  </View>))}
              </View>}
          </View>
        ) : null}
      {forecast.length > 0 && (
      <View style={styles.map}>
        {location.latitude ? (
          <>
            <MapDisplay {...props} pointers={forecast} location={location} />
          </>
        ) : (
          <View style={[styles.Activitycontainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#1e90ff" />
          </View>
        )}
      </View>
      )}
      <View>
        {forecast.length < 1 && (
        <Image
          source={require('../../assets/images/favourites.png')}
          resizeMode="contain"
          style={[styles.FavouritesImage, styles.horizontal]}
        />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    height: 80,
    width: 350,
    marginLeft: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#000',
    color: '#fff',
    backgroundColor: 'rgba(18,138,184,1)'
  },
  noFav: {
    width: 354,
    height: 124,
    fontSize: 20,
    alignSelf: 'center'
  },
  location: {
    color: '#ffffff',
    fontSize: 14,
    width: 100,
    marginTop: 9
  },
  centurion1: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 80,
    marginTop: 9
  },
  o5: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 1,
    marginTop: 7
  },
  icon2: {
    color: '#ffffff',
    fontSize: 20,
    height: 28,
    width: 26,
    marginLeft: 40,
    marginTop: 9
  },
  locationRow: {
    width: 350,
    marginLeft: 10,
    flexDirection: 'row',
  },
  rect5: {
    width: 354,
    backgroundColor: 'rgba(74,144,226,1)',
    marginTop: 50
  },
  midrand: {
    color: '#121212',
    fontSize: 20,
    marginTop: 11
  },
  o4: {
    top: 0,
    left: 22,
    position: 'absolute',
    color: '#121212',
    fontSize: 16
  },
  centurion2: {
    top: 9,
    left: 0,
    position: 'absolute',
    color: '#121212',
    fontSize: 20
  },
  o4Stack: {
    width: 31,
    height: 33,
    marginLeft: 145
  },
  icon3: {
    color: 'rgba(128,128,128,1)',
    fontSize: 20,
    height: 23,
    width: 12,
    marginLeft: 29,
    marginTop: 12
  },
  midrandRow: {
    height: 35,
    flexDirection: 'row',
    marginTop: 7,
    marginLeft: 16,
    marginRight: 46
  },
  rect2: {
    top: 0,
    left: 0,
    width: 349,
    height: 45,
    position: 'absolute'
  },
  icon: {
    color: 'rgba(59,111,186,1)',
    fontSize: 22,
    height: 24,
    width: 13,
    marginTop: 8,
    marginLeft: 200
  },
  addFavourite: {
    top: 7,
    left: 220,
    position: 'absolute',
    color: 'rgba(38,121,220,1)',
    fontSize: 18
  },
  rect2Stack: {
    width: 354,
    height: 45,
    marginTop: 20,
    marginLeft: 24
  },
  map: {
    width: 350,
    height: 420,
    backgroundColor: '#E6E6E6',
    borderColor: '#000',
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 30
  },
  rect6: {
    width: 354,
    height: 46,
    marginTop: -580,
    marginLeft: 24
  },
  Activitycontainer: {
    flex: 1,
    justifyContent: 'center'
  },
  FavouritesImage: {
    top: 80,
    left: 80,
    width: 256,
    height: 256,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

export default Favourites;
