/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import marker from './src/asset/marker.png';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
const ItemMarker = (props) => {
  return (
    <Marker
      coordinate={{
        latitude: props.latitude,
        longitude: props.longitude,
      }}
      title={props.title}
      description={props.description}
    >
      <Image source={marker} style={{ width: 50, height: 50 }} />
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
  const initDistance = {
    minute: null,
    kilometer: null,
  };
  const initPosition = {
    lat: null,
    long: null,
  };
  const [distance, setDistance] = useState(initDistance);
  const [location, setLocation] = useState(initialLocation);
  const [position, setPosition] = useState(initPosition);
  useEffect(() => {
    
    Geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
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
  console.log(position);
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
  const origin = { latitude: location.latitude, longitude: location.longitude };
  const destination = { latitude: 16.050422, longitude: 108.230482 };
  //const GOOGLE_MAPS_APIKEY = 'AIzaSyDGZOhb6qWmy1PLYJrLmtBho18Vasw0C_U';
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBed1ww2kXGTtFyI5B3uEitxhEjjQyKBSU';
  
  const getPositionByAndress = (andress) => {
    Geocoder.init(GOOGLE_MAPS_APIKEY, {language : "vi"}); 
    Geocoder.from(andress)
		.then(json => {
      setPosition({
        lat: json.results[0].geometry.location.lat,
        long: json.results[0].geometry.location.lng,
      })
      console.log(position);
      console.log("run");
		})
		.catch(error => console.warn(error));
  }

  return location.latitude ? (
    <View style={styles.container}>
      <MapView
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location}
      >
        {markers.map((item, index) => (
          <ItemMarker
            key={index}
            latitude={item.latitude}
            longitude={item.longitude}
            title={item.title}
            description={item.description}
          />
        ))}
          {/* <Marker
        coordinate={{
          latitude: position.lat,
          longitude: position.long,
        }}
        title={"test get  andress"}
        description={"props.description"}
      /> */}
        {/* <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="hotpink"
          onReady={(result) => {
            setDistance({
              minute: Math.round(result.duration),
              kilometer: Math.round(result.distance * 100) / 100,
            });
          }}
        /> */}
      </MapView>
      <View style={styles.viewAndress}>
          <TextInput placeholder="Enter andress you want to go" />
          <TouchableOpacity onPress={ () => getPositionByAndress}><Text>Tìm kiếm</Text></TouchableOpacity>
      </View>
      <View style={styles.viewDistance}>
        <View style={styles.containDistance}>
          <Text style={styles.textMinute}>{distance.minute} min </Text>
          <Text style={styles.textDistance}> ({distance.kilometer} km)</Text>
        </View>
        <TouchableOpacity style={styles.buttonStart}>
          <Text style={styles.textStart}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <ActivityIndicator style={{ flex: 1 }} size="large" color="green" />
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  viewAndress: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  viewDistance: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    height: 100,
    width: 360,
    padding: 15,
    alignItems: 'center',
  },
  containDistance: {
    flexDirection: 'row',
  },
  textMinute: {
    fontSize: 25,
  },
  textDistance: {
    fontSize: 25,
  },
  buttonStart: {
    marginTop: 5,
    borderRadius: 25,
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 70,
  },
  textStart: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
});

export default App;
