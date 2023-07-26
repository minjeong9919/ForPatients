import React from "react";
import {StyleSheet,View,Text,TouchableOpacity,Image, Modal} from "react-native";
import MapView, {Marker,AnimatedRegion,Polyline,PROVIDER_GOOGLE,animateMarkerToCoordinate} from "react-native-maps";
import haversine from "haversine";
import Geolocation from "@react-native-community/geolocation";
import firestore from '@react-native-firebase/firestore';
import styled from "styled-components/native";

import { useNavigation } from "@react-navigation/native";
import { withNavigation } from 'react-navigation';

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
    text-align : center;
  `;

  const FinishBtn = styled.TouchableOpacity`
    width: 150px;
    height: 40px;
    //border: 1px;
    justify-content: center;
    border-radius: 5px;
    align-self: flex-end;
    margin: 5px;
    background-color: #2196F3;
    margin : 20px;
  `;
  const FinishBtnText = styled.Text`
    font-size: 20px;
    align-self: center;
    color: white;
    font-weight: 600;
  `;

class MapPage extends React.Component {
    
  goToNextScreen = () => {
    this.props.navigation.navigate('Finish');
  };
  restartScreen = () => {
    this.props.navigation.navigate('MapPage');
  };

  ChageState = () => {
    this.setState({pageState: true})
  }

  constructor(props) {
    super(props);

    this.ref = firestore().collection('Robot');
    this.interval = null;


    const Value = this.props.route.params.Latitude;
    const Value2 = this.props.route.params.Longitude;
    //로봇 초기 위치 값
    const Value3 = this.props.route.params.RBlatiude;
    const Value4 = this.props.route.params.RBlongitude;


    this.state = {
      latitude: parseFloat(Value),
      longitude: parseFloat(Value2),
      LATITUDE_DELTA : 0.03,
      LONGITUDE_DELTA : 0.04,
      routeCoordinates: [],
      routeRBlocations : [],
      newRBlocation : {},
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: parseFloat(Value),
        longitude: parseFloat(Value2),
        latitudeDelta: 0,
        longitudeDelta: 0
      }),
      //로봇 선으로 표시하기
      RBlocation: new AnimatedRegion({
        latitude: parseFloat(Value3),
        longitude: parseFloat(Value4),
        latitudeDelta: 0,
        longitudeDelta: 0
      }),
      //--------------------------
      //로봇의 위치정보 담기기
      RBlatitude : 0,
      RBlongitude : 0,
      //Modal
      ModalVisible : false,
      count : 0,
      //페이지 이동을 위한 변수
      pageState : false,
    };
  }

  componentDidMount() {
    const { coordinate } = this.state;
    const {RBlatitude, RBlongitude} = this.state;
    const { routeRBlocations } = this.state;
    const { routeCoordinates } = this.state;

    //로봇의 위치정보를 실시간을 가져오기
    
    // this.ref.onSnapshot(snapshot => {
    //     const tt = snapshot.docs.map(doc => ({
    //         id : doc.id,
    //         ...doc.data(),
    //     }));
    //     this.setState({RBlatitude:tt[0].latitude})
    //     this.setState({RBlongitude:tt[0].longitude})
    //     if(this.state.RBlatitude != null){
    //       //새로 가져옴
    //       const newloca = {
    //       "latitude" : this.state.RBlatitude,
    //       "longitude" : this.state.RBlongitude
    //       };
    //       //console.log(newloca)
    //       // this.setstate({newRBlocation: this.RBlatitude})
    //       // console.log("로봇의 현재 위치: ",this.state.newRBlocation)
    //       this.setState({
    //         routeRBlocations: routeRBlocations.concat([newloca]),
    //       });
    //       console.log("로봇 위치 저장 배열: ",this.state.routeRBlocations)
    //     }else{ return null } 
    // })

    this.ref.onSnapshot(snapshot => {
      const tt = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    
      if (tt.length > 0) {
        const newloca = {
          latitude: tt[0].latitude,
          longitude: tt[0].longitude
        };
    
        this.setState(prevState => ({
          RBlatitude: tt[0].latitude,
          RBlongitude: tt[0].longitude,
          routeRBlocations: prevState.routeRBlocations.concat([newloca])
        }));
      }
    });

    //텍스트 1초마다 깜빡이기
    this.interval = setInterval(()=>{
      const {count} = this.state;
      const {ModalVisible} = this.state;
      this.setState({count : count + 1})
      if(ModalVisible == false){
        this.setState({ModalVisible:true})
      }else{
        this.setState({ModalVisible:false})
      }
    },1000);

    //location 값 확인하기
    this.watchID = Geolocation.watchPosition(
      position => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;
        const {RBlatitude, RBlongitude} = this.state;
        const { ModalVisible } = this.state;
  
        const newCoordinate = {
          latitude,
          longitude,
        };
        //console.log("사용자" ,newCoordinate)
        //사용자의 위치 마커 표시하기
        if (this.marker) {
          this.marker.animateMarkerToCoordinate(
            newCoordinate,
            500
          );
        }

        this.ref.onSnapshot(snapshot => {
          const tt = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

            if(((this.state.RBlongitude > longitude-0.00005)&&(this.state.RBlongitude < longitude+0.00005))&&(this.state.RBlatitude > latitude-0.00005)&&(this.state.RBlatitude < latitude+0.00005)){
              // this.restartScreen()
              console.log("도착예정")
              this.timeout = setTimeout(() => {            
                clearInterval(this.interval);
                this.setState({ModalVisible:false})
                this.goToNextScreen()
              }, 8000);
            }
          }
        );



        //이동한 위치 확인
        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
        console.log("사용자 위치 저장 배열: ",routeCoordinates);

      },
      error => console.log(error),
      {enableHighAccuracy: true,timeout: 20000,maximumAge: 1000,distanceFilter: 2});}

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
    clearTimeout(this.timeout);
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: this.state.LATITUDE_DELTA,
    longitudeDelta: this.state.LONGITUDE_DELTA
  });
  getMapRegion2 = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: 0,
    longitudeDelta: 0
  });

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };


  render() {
    
    const {latitude,longitude} = this.state;  // 사용자의 위치 값
    const {RBlatitude, RBlongitude} = this.state; // 로봇의 위치 값
    const {ModalVisible} = this.state;
    
    
    if(((RBlongitude > longitude-0.00001)&&(RBlongitude < longitude+0.00001))&&(RBlatitude > latitude-0.00001)&&(RBlatitude < latitude+0.00001)){
      // return this.goToNextScreen(); //홈화면으로 넘어가기
      return(
      <View style={styles.container}>
        <Modal
            visible = {ModalVisible}
            transparent = {true}
            animationType = "fade"
          >
            <ModalTextBox>
              <ModalText>로봇이 환자 주변에 도착했습니다!{'\n'}로봇을 발견하면 머리 위로 원을 만들어주세요!</ModalText>
            </ModalTextBox>
        </Modal>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion2()}
        >
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
          <Polyline coordinates={this.state.routeRBlocations} strokeWidth={1} />

          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />
          <Marker
            coordinate={{ //로봇의 위치를 핀으로 표시
                latitude: RBlatitude,
                longitude: RBlongitude,
          }}>  
            <Image
              source = {require('../images/robotIcon.png')} 
              style = {{width:35, height:50}}
            />
          </Marker>
        </MapView>
        {/*<TouchableOpacity onPress={()=>{
            console.log("==================================================")
            console.log("로봇: ",RBlatitude,RBlongitude)
            console.log("USER: ",latitude,  longitude)

            }}>
              <Text>위치 log로 나타내기</Text>
          </TouchableOpacity> */}
          <View style={{flexDirection: 'row'}}>
            <FinishBtn onPress = {()=> { 
              clearInterval(this.interval);
              this.setState({ModalVisible:false})
              this.goToNextScreen() }}>
              <FinishBtnText>완료</FinishBtnText>
            </FinishBtn>
            <CancleBtn></CancleBtn>
          </View>
          </View>
      );
    }else{
        return(
          <View style={styles.container}>
            
          <Modal
            visible = {ModalVisible}
            transparent = {true}
            animationType = "fade"
          >
            <ModalTextBox>
              <ModalText>로봇이 오고있습니다.{'\n'}잠시만 기다려주세요.</ModalText>
            </ModalTextBox>
          </Modal>

          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={this.getMapRegion2()}
          >
            <Polyline coordinates={this.state.routeRBlocations} strokeWidth={2} />
            
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
              />
              <Marker
              coordinate={{ //로봇의 위치를 핀으로 표시
                  latitude: RBlatitude,
                  longitude: RBlongitude,
              }}>
              <Image
                source = {require('../images/robotIcon.png')} 
                style = {{width:35, height:50}}
              />
            </Marker>
          </MapView>
          <View style={{flexDirection: 'row'}}>
            <FinishBtn onPress = {()=> { 
              clearInterval(this.interval);
              this.setState({ModalVisible:false})
              this.goToNextScreen() }}>
              <FinishBtnText>완료</FinishBtnText>
            </FinishBtn>
            <CancleBtn></CancleBtn>
          </View>
        </View>
        )
    }
  }
}

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

export default withNavigation(MapPage);