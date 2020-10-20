import React, { useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapDisplay = (props) => {
    const {navigation, location, pointers} = props
    const [region, setRegion] = useState({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
    });

    return (
        <MapView
            style={{ flex: 1 }}
            region={region}
            onRegionChangeComplete={region => setRegion(region)}>
           { pointers.length > 0 ? 
           <View>
           {pointers.map((pointer) =>
            <Marker coordinate={{ latitude: pointer.latitude, longitude: pointer.longitude }}
                onPress={() => navigation.navigate('Weather', {
                    forecast: []
                })} /> )}
            </View> : null}
        </MapView>
    )
}

export default MapDisplay