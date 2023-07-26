import React from "react";
import { Text,TouchableOpacity} from "react-native";
import {useState} from 'react';
import styled from "styled-components/native";

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";

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


class Test extends React.Component {

    constructor(props) {
        super(props);
    
        this.ref = firestore().collection('Hard_test');
    
        this.state = {
          number : 0,
          //로봇 위치에 대한 변수
          bottom : 0,
          left : 0
        };
    }


    componentDidMount() {
        const {number} = this.state;
        //상태 숫자 값 실시간으로 가져오기
        this.ref.onSnapshot(snapshot => {
            const tt = snapshot.docs.map(doc => ({
                id : doc.id,
                ...doc.data(),
            }));
            this.setState({number:tt[0].number})
            //console.log(tt[0].number)
            if(tt[0].number == 0){
                this.setState({left:80});
                this.setState({bottom:110});
            }else if(tt[0].number == 1){
                this.setState({left:120});
                this.setState({bottom:110});
            }else if(tt[0].number == 2){
                this.setState({left:160});
                this.setState({bottom:110});
            }else if(tt[0].number == 3){
                this.setState({left:200});
                this.setState({bottom:110});
            }else if(tt[0].number == 4){
                this.setState({left:200});
                this.setState({bottom:150});
            }else if(tt[0].number == 5){
                this.setState({left:200});
                this.setState({bottom:200});
            }else if(tt[0].number == 6){
                this.setState({left:200});
                this.setState({bottom:250});
            }else if(tt[0].number == 7){
                this.setState({left:200});
                this.setState({bottom:300});
            }else if(tt[0].number == 8){
                this.setState({left:160});
                this.setState({bottom:300});
            }else if(tt[0].number == 9){
                this.setState({left:120});
                this.setState({bottom:300});
            }else{
               null
            }
        })

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
                    this.props.navigation.navigate('Test2')
                }} >
                    <Text>시간에 따라 움직이는 hardcoding</Text>
                </TouchableOpacity>
                <CancleBtn></CancleBtn>
            </Container>
                
        )

    }
}
export default Test;