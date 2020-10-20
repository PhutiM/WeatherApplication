import React, { useEffect, useState } from "react";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MapDisplay from '../MapDisplay'
import * as Api from '../Api';
import Geolocation from 'react-native-geolocation-service';
import {
  TouchableOpacity, ScrollView, Image,
  View, ActivityIndicator, StyleSheet, Text
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

function Favourites(props) {
  const [location, setLocation] = useState([])
  const [addLocation, setAddLocation] = useState(false)
  const [pointers, setPointer] = useState([]);
  const [forecast, setForecast] = useState([]);
  let list = []
  let forecastList = []

  const GetCurrentLocation = (latitude, longitude) => {
    Api.GetCurrentLocation(latitude, longitude).then((res) => {
      console.log(res)
      forecastList.push(res)
      setForecast(forecastList);
    })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  useEffect(() => {
    Api.requestPermissions()

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        })
      },
      error => {
        alert(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    )

  }, [])

  const openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal({
      country: 'ZA',
      //type: 'establishment'
    }, ['placeID', 'location', 'name', 'address', 'types', 'openingHours', 'plusCode', 'rating', 'userRatingsTotal', 'viewport']
    )
      .then((place) => {
        list.push(place.location)
        GetCurrentLocation(place.location.latitude, place.location.longitude)

      })
      .catch(error => console.log(error.message));
  }

  const ForecastLists =
    forecast.map((f) => {
      return (
        <View style={styles.centurionRow}>
          <Text style={styles.centurion}>{f.name}</Text>
          <Text style={styles.centurion1}>{Math.round(f.main.temp)}</Text>
          <Text style={styles.o5}>o</Text>
          <MaterialCommunityIconsIcon
            name="plus"
            style={styles.icon2}
          ></MaterialCommunityIconsIcon>
        </View>
      )
    })

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.rect2Stack} onPress={() => openSearchModal()}>
        <View style={styles.rect2}>
          <IoniconsIcon name="md-add" style={styles.icon}></IoniconsIcon>
        </View>
        <Text style={styles.addFavourite}>Add Favourite</Text>
      </TouchableOpacity>
      {forecast.length > 0 &&
        <View style={styles.rect}>
          <ScrollView>
            {ForecastLists}
          </ScrollView>
        </View>}
      {forecast.length > 0  &&  <View style={styles.map}>
        {location.latitude ? (
          <>
            <MapDisplay {...props} pointers={pointers} location={location} />
          </>
        ) : (
            <View style={[styles.Activitycontainer, styles.horizontal]}>
              <ActivityIndicator size="large" color="#1e90ff" />
            </View>
          )}
      </View>}
      <View>
      {forecast.length < 1 && <Image
        source={require('../../../assets/images/favourites.png')}
        resizeMode="contain"
        style={[styles.FavouritesImage, styles.horizontal]}
      />}
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
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#000",
    color: "#fff",
    backgroundColor: "rgba(18,138,184,1)"
  },
  noFav: {
    width: 354,
    height: 124,
    fontSize: 20,
    alignSelf: "center"
  },
  centurion: {
    color: "#ffffff",
    fontSize: 20,
    marginTop: 9
  },
  centurion1: {
    color: "#ffffff",
    fontSize: 20,
     marginLeft: 80,
    marginTop: 9
  },
  o5: {
    color: "#ffffff",
    fontSize: 16,
    marginLeft: 1,
    marginTop: 7
  },
  icon2: {
    color: "#ffffff",
    fontSize: 26,
    height: 28,
    width: 26,
    marginLeft: 40,
    marginTop: 9
  },
  centurionRow: {
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 37
  },
  rect5: {
    width: 354,
    backgroundColor: "rgba(74,144,226,1)",
    marginTop: 50
  },
  midrand: {
    color: "#121212",
    fontSize: 20,
    marginTop: 11
  },
  o4: {
    top: 0,
    left: 22,
    position: "absolute",
    color: "#121212",
    fontSize: 16
  },
  centurion2: {
    top: 9,
    left: 0,
    position: "absolute",
    color: "#121212",
    fontSize: 20
  },
  o4Stack: {
    width: 31,
    height: 33,
    marginLeft: 145
  },
  icon3: {
    color: "rgba(128,128,128,1)",
    fontSize: 20,
    height: 23,
    width: 12,
    marginLeft: 29,
    marginTop: 12
  },
  midrandRow: {
    height: 35,
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 16,
    marginRight: 46
  },
  rect2: {
    top: 0,
    left: 0,
    width: 349,
    height: 45,
    position: "absolute"
  },
  icon: {
    color: "rgba(59,111,186,1)",
    fontSize: 22,
    height: 24,
    width: 13,
    marginTop: 8,
    marginLeft: 219
  },
  addFavourite: {
    top: 7,
    left: 238,
    position: "absolute",
    color: "rgba(38,121,220,1)",
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
    backgroundColor: "#E6E6E6",
    borderColor: "#000",
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
    justifyContent: "center"
  },
  FavouritesImage: {
    top: 80,
    left: 80,
    width: 256,
    height: 256,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default Favourites;

