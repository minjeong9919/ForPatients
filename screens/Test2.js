import React from "react";
import { Text,TouchableOpacity} from "react-native";
import {useState} from 'react';
import styled from "styled-components/native";

import firestore from '@react-native-firebase/firestore';

import CancleBtn from "../component/CancleBtn";


const Container = styled.ScrollView.attrs(()=>({
    contentContainerStyle:{
        showVerticalScrollIndicator:false,
    }
}))`
    flex:1;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const MapImage = styled.Image`
   width: 100%;
   height: 400px;
   align-self: center;
`;
const MarkerImage = styled.Image`
    width:30px;
    height: 30px;
    bottom: ${(props)=>props.RBbottom}px;
    left: ${(props)=>props.RBleft}px;
`;


class Test2 extends React.Component {

    constructor(props) {
        super(props);
    
        this.ref = firestore().collection('Hard_test');
        this.stateNumRef = firestore().collection('Robot');
    
        this.state = {
          number : 0,
          //로봇 위치에 대한 변수
          bottom : 0,
          left : 0,
          //로봇의 위치 number
          GPSnumber : 0,
          //로봇의 state 변수
          RBstate : ""
        };
    }


    componentDidMount() {
        const {number} = this.state;

        setInterval(()=>{
            const {number} =  this.state;
            const {RBstate} = this.state;

            //db의 number(로봇의 stop 위치 값)불러오기
            firestore().collection('Robot')
                .doc('state')
                .onSnapshot(documentSnapshot => {
                    this.setState({RBstate:documentSnapshot.data().state})
                });
            console.log(RBstate);
            
            if(number == 0){
                this.setState({left:80});
                this.setState({bottom:110});
            }else if(number == 1){
                this.setState({left:120});
                this.setState({bottom:110});
            }else if(number == 2){
                this.setState({left:160});
                this.setState({bottom:110});
            }else if(number == 3){
                this.setState({left:200});
                this.setState({bottom:110});
            }else if(number == 4){
                this.setState({left:200});
                this.setState({bottom:150});
            }else if(number == 5){
                this.setState({left:200});
                this.setState({bottom:200});
            }else if(number == 6){
                this.setState({left:200});
                this.setState({bottom:250});
            }else if(number == 7){
                this.setState({left:200});
                this.setState({bottom:300});
            }else if(number == 8){
                this.setState({left:160});
                this.setState({bottom:300});
            }else if(number == 9){
                this.setState({left:120});
                this.setState({bottom:300});
            }else{null}

            //로봇의 상태 신호에 따른 위치 변화
            if(RBstate == "go"){
                this.setState({number:number+1})
            }else if(RBstate == "stop"){
                this.setState({number:number})
            }else if(RBstate == "finish"){
                this.setState({number:number-1})
            }

        },5000);

    }
    
    render(){
        const {number} = this.state;

        return (
            <Container>
                <MapImage source={require('../images/mapView.png')} resizeMode="cover"></MapImage>
                <MarkerImage
                    RBbottom={this.state.bottom}
                    RBleft={this.state.left} 
                    source={require('../images/robotIcon.png')}>
                </MarkerImage>
                <MarkerImage
                    RBbottom={340}
                    RBleft={100} 
                    source={require('../images/patientIcon.png')}>
                </MarkerImage>
                <TouchableOpacity onPress={()=>{
                        
                }} >
                    <Text>누르기</Text>
                </TouchableOpacity>
                <CancleBtn></CancleBtn>
            </Container>         
        )
    }
}
export default Test2;