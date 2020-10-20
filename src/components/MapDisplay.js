import React, { useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapDisplay = (props) => {
  const { navigation, location, pointers } = props;
  const [region, setRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.90,
    longitudeDelta: 0.90
  });

  return (
    <MapView
      style={{ flex: 1 }}
      region={region}
      onRegionChangeComplete={(regions) => setRegion(regions)}
    >
      { pointers.length > 0
        ? (
          <View>
            {pointers.map((pointer) => (
              <Marker
                coordinate={{ latitude: pointer.coord.lat, longitude: pointer.coord.lon }}
                onPress={() => navigation.navigate('Weather', {
                  forecast: { latitude: pointer.coord.lat, longitude: pointer.coord.lon }
                })}
              />
            ))}
          </View>
        ) : null}
    </MapView>
  );
};

export default MapDisplay;
