import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MapView, { Circle, Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

export default function App() {
  const [pin, setPin]=React.useState({
    latitude: -0.4329942,
    longitude: 36.9609916
  });
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
        latitude: pin.latitude,
        longitude: pin.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      showsUserLocation={true}
      onUserLocationChange={(e)=>{
        console.log(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);

        setPin({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
        });
      }}
      >
        <Marker 
        title="Chairman's location"
        description="master"
        pinColor="red"
        coordinate={pin}>
        </Marker>

        <Circle
        center ={pin}
        radius={30}
        strokeColor='gold'
        fillColor="gold"
        ></Circle>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});