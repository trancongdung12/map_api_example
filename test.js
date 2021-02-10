import React from 'react';
import { View, StyleSheet} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  return (
    <View style={styles.container}>
        <GooglePlacesAutocomplete
      placeholder='Search'
      fetchDetails={true}
      onPress={(data, details = null) => {
        console.log(details);
      }}
      query={{
        key: 'AIzaSyDGZOhb6qWmy1PLYJrLmtBho18Vasw0C_U',
        language: 'vi',
      }}
    />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default GooglePlacesInput;