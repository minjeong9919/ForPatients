import React from "react";
import {StyleSheet,View,Text,TouchableOpacity,Image, Modal} from "react-native";
import MapView, {Marker,AnimatedRegion,Polyline,PROVIDER_GOOGLE,animateMarkerToCoordinate} from "react-native-maps";
import haversine from "haversine";
import Geolocation from "@react-native-community/geolocation";
import firestore from '@react-native-firebase/firestore';
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import CancleBtn from "../component/CancleBtn";

const ModalTextBox = styled.View`
  width: 80%;
  //border: 1px;
  top: 70px;
  align-self: center;
`;
  const ModalText = styled.Text`
    align-self: center;
    font-size: 25px;
    font-weight: 700;
    color: blue;
  `;

class MyGPS extends React.Component {
    
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      LATITUDE_DELTA : 0.005,
      LONGITUDE_DELTA : 0.005,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      }),
    };
  }

  componentDidMount() {

    //location 값 확인하기
    this.watchID = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };
        //사용자의 위치 마커 표시하기
        if (this.marker) {
          this.marker.animateMarkerToCoordinate(
            newCoordinate,
            500
          );
        }
        //이동한 위치 확인
        this.setState({
          latitude,
          longitude,
        });
      },
      error => console.log(error),
      {enableHighAccuracy: true,timeout: 20000,maximumAge: 1000,distanceFilter: 2});}

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: this.state.LATITUDE_DELTA,
    longitudeDelta: this.state.LONGITUDE_DELTA
  });

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    const {latitude,longitude} = this.state;  // 사용자의 위치 값
      return (
        <>
        <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}
        >
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />
        </MapView>
      </View>
    </>
    )}}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});
export default MyGPS;