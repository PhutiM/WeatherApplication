import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Image, ActivityIndicator, Text, ImageBackground
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import * as Api from '../Api';
import * as Utilities from '../Utilities';

const WeatherScreen = (props) => {
  const [forecasts, setForcast] = useState([]);

  const GetWeather = (latitude, longitude) => {
    Api.GetWeather(latitude, longitude).then((res) => {
      setForcast(Utilities.BuildLastUpdated(res.list));
    })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  useEffect(() => {
    if (props.route.params === undefined) {
      console.log(props?.route);
      Api.requestPermissions();

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          GetWeather(latitude, longitude);
        },
        (error) => {
          alert(error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } else {
      GetWeather(props.route.params.forecast.latitude, props.route.params.forecast.longitude);
    }
  }, []);

  return (

    <View style={styles.container}>
      {forecasts.length > 0 ? (
        <>
          <View style={styles.imageStack}>
            <ImageBackground
              source={Utilities.GetBackgroundByWeather(forecasts[0].weather[0].main)}
              resizeMode="contain"
              style={styles.image}
              imageStyle={styles.image_imageStyle}
            >
              <View style={styles.loremIpsumStackStack}>
                <View style={styles.loremIpsumStack}>
                  <Text style={styles.loremIpsum}>{Math.round(forecasts[0].main.temp)}</Text>
                  <Text style={styles.type}>{forecasts[0].weather[0].main}</Text>
                </View>
                <Text style={styles.o3}>o</Text>
              </View>
            </ImageBackground>
            <View style={[styles.rect, {
              backgroundColor:
              Utilities.RectColor(forecasts[0].weather[0].main)
            }]}
            >
              <View style={styles.loremIpsum3RowColumnRow}>
                <View style={styles.loremIpsum3RowColumn}>
                  <View style={styles.loremIpsum3Row}>
                    <Text style={styles.loremIpsum3}>{Math.round(forecasts[0].main.temp_min)}</Text>
                    <Text style={styles.o7}>o</Text>
                  </View>
                  <Text style={styles.min}>min</Text>
                </View>
                <View style={styles.loremIpsum4RowColumn}>
                  <View style={styles.loremIpsum4Row}>
                    <Text style={styles.loremIpsum4}>{Math.round(forecasts[0].main.temp)}</Text>
                    <Text style={styles.o8}>o</Text>
                  </View>
                  <Text style={styles.current}>current</Text>
                </View>
                <View style={styles.maxStackStack}>
                  <View style={styles.maxStack}>
                    <Text style={styles.max}>max</Text>
                    <Text style={styles.loremIpsum5}>{Math.round(forecasts[0].main.temp_max)}</Text>
                  </View>
                  <Text style={styles.o9}>o</Text>
                </View>
              </View>
              <View style={styles.rect2} />
              {forecasts.map((forecast, index) => (
                <View key={index}>
                  <View style={styles.dayRow}>
                    <Text style={styles.day}>{Utilities.DayOfWeek(forecast.dt_txt)}</Text>
                    <Image
                      source={Utilities.GetWeatherIcon(forecast.weather[0].main)}
                      resizeMode="contain"
                      style={styles.image2}
                    />
                    <Text style={styles.loremIpsum2}>{Math.round(forecast.main.temp)}</Text>
                    <Text style={styles.o10}>o</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </>
      ) : (
        <View style={[styles.Activitycontainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#1e90ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    top: 0,
    left: 0,
    width: '100%',
    height: 389,
    position: 'absolute'
  },
  maxStackStack: {
    width: 50,
    height: 57,
    marginLeft: 72,
    marginTop: 2
  },
  loremIpsum: {
    top: 15,
    left: 34,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 70
  },
  current: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20
  },
  type: {
    top: 94,
    left: 20,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 50
  },
  o8: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    marginLeft: 1
  },
  loremIpsumStack: {
    top: 0,
    left: 0,
    width: '100%',
    height: 132,
    position: 'absolute'
  },
  o3: {
    top: 0,
    left: 114,
    position: 'absolute',
    color: '#ffffff',
    fontSize: 50
  },
  loremIpsum3: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    marginTop: 9
  },
  loremIpsumStackStack: {
    height: 150,
    marginTop: 118,
    marginLeft: 121
  },
  loremIpsum4: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    marginTop: 12
  },
  rect: {
    top: 360,
    width: '100%',
    height: 470,
    position: 'absolute',
  },
  imageStack: {
    width: '100%',
    height: 836,
    marginTop: -24,
  },
  loremIpsum3RowColumnRow: {
    height: 60,
    flexDirection: 'row',
    marginTop: 4,
    marginLeft: 45,
    marginRight: 32
  },
  rect2: {
    width: '100%',
    height: 3,
    backgroundColor: '#E6E6E6',
    marginTop: 14
  },
  day: {
    color: 'rgba(255,255,255,1)',
    fontSize: 16,
    width: 101,
    marginTop: 23
  },
  image2: {
    width: 32,
    height: 73,
    marginLeft: 72
  },
  loremIpsum2: {
    color: 'rgba(255,255,255,1)',
    fontSize: 16,
    marginLeft: 95,
    marginTop: 23
  },
  o7: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    marginLeft: 1
  },
  loremIpsum3Row: {
    height: 33,
    flexDirection: 'row'
  },
  min: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20
  },
  o10: {
    color: 'rgba(255,255,255,1)',
    fontSize: 16,
    marginLeft: 3,
    marginTop: 15
  },
  dayRow: {
    height: 45,
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 31,
    marginRight: 35
  },
  loremIpsum4RowColumn: {
    width: 73,
    marginLeft: 100
  },
  o9: {
    top: 0,
    left: 27,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 20
  },
  loremIpsum4Row: {
    height: 36,
    flexDirection: 'row',
    marginLeft: 13,
    marginRight: 16
  },
  max: {
    top: 23,
    left: 0,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 20
  },
  loremIpsum5: {
    top: 0,
    left: 4,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 20
  },
  maxStack: {
    top: 10,
    left: 0,
    height: 47,
    position: 'absolute'
  },
  Activitycontainer: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

export default WeatherScreen;
