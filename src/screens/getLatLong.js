import React from 'react';
import { View } from 'react-native';
import Geocoder from 'react-native-geocoding';

const Map = () => {
    Geocoder.init("AIzaSyDGZOhb6qWmy1PLYJrLmtBho18Vasw0C_U", {language : "vi"}); 
    Geocoder.from("Trường Cao đẳng Lương thực - Thực phẩm, Lê Hữu Trác, Phước Mỹ, Sơn Trà, Đà Nẵng")
		.then(json => {
			var location = json.results[0].geometry.location;
			console.log(location);
		})
		.catch(error => console.warn(error));
  return <View />;
}

export default Map;