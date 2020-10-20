import React from 'react';
import {
  StyleSheet, View, Image, TouchableOpacity, Text
} from 'react-native';

function LandingScreen(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.buttonFiller}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Weather')}
          style={styles.button}
        >
          <Text style={styles.text}>My Lastest Weather</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Favourites')}
          style={styles.button}
        >
          <Text style={styles.text}>My Favourites</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonFiller: {
    bottom: 10
  },
  button: {
    height: 59,
    width: 356,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: '#993800',
    borderRadius: 3,
    justifyContent: 'center',
    marginLeft: 20,
    bottom: 10,
  },
  text: {
    color: '#993800',
    alignSelf: 'center'
  },
  image: {
    width: 356,
    height: 356,
    marginTop: 60,
    marginLeft: 20
  }
});

export default LandingScreen;
