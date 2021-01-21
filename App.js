/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Image, Text} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import marker from './src/asset/marker.png';
import MapViewDirections from 'react-native-maps-directions';

const ItemMarker = (props) => {
  return (
    <Marker
      coordinate={{
        latitude: props.latitude,
        longitude: props.longitude,
      }}
      title={props.title}
      description={props.description}>
      <Image source={marker} style={{width: 50, height: 50}} />
    </Marker>
  );
};

const App = () => {
  const initialLocation = {
    latitude: null,
    longitude: null,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  };

  const [location, setLocation] = useState(initialLocation);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const {longitude, latitude} = position.coords;
        setLocation({
          ...location,
          latitude,
          longitude,
        });
      },
      (error) => alert(error.message),
      {
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }, []);

  let markers = [
    {
      latitude: 16.073679,
      longitude: 108.245257,
      title: 'Xe 1',
      description: '1234 Foo Drive',
    },
    {
      latitude: 16.0600967,
      longitude: 108.2407769,
      title: 'Xe 2',
      description: '1234 Foo Drive',
    },
    {
      latitude: 16.050422,
      longitude: 108.230482,
      title: 'Xe 3',
      description: '1234 Foo Drive',
    },
    {
      latitude: 16.06108,
      longitude: 108.223098,
      title: 'Xe 4',
      description: '1234 Foo Drive',
    },
    {
      latitude: 16.079944,
      longitude: 108.233982,
      title: 'Xe 5',
      description: '1234 Foo Drive',
    },
  ];
  const origin = {latitude: location.latitude, longitude: location.longitude};
  const destination = {latitude: 16.050422, longitude: 108.230482};
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDGZOhb6qWmy1PLYJrLmtBho18Vasw0C_U';
  return location.latitude ? (
    <View style={styles.container}>
      <MapView
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location}>
        {markers.map((item, index) => (
          <ItemMarker
            key={index}
            latitude={item.latitude}
            longitude={item.longitude}
            title={item.title}
            description={item.description}
          />
        ))}
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
        />
      </MapView>
    </View>
  ) : (
    <ActivityIndicator style={{flex: 1}} size="large" color="green" />
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
