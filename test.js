import React, {useEffect} from 'react';
import MapView, {Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {View, Text, StyleSheet} from 'react-native';

const MyComponent = () => {
  useEffect(() => {
    const mode = 'driving'; // 'walking';
    const origin = 'coords or address';
    const destination = 'coords or address';
    const APIKEY = 'AIzaSyBed1ww2kXGTtFyI5B3uEitxhEjjQyKBSU';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('====================================');
        console.log(responseJson);
        console.log('====================================');
        // if (responseJson.routes.length) {
        //   this.setState({
        //     coords: this.decode(
        //       responseJson.routes[0].overview_polyline.points,
        //     ), // definition below
        //   });
        // }
      })
      .catch((e) => {
        console.warn(e);
      });
  }, []);
  return <MapView />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default MyComponent;
