import React from "react";
import { Text, TouchableOpacity, View,Modal } from "react-native";
import styled from "styled-components/native";
import {Image} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';

const Container = styled.ScrollView.attrs(()=>({
    contentContainerStyle:{
        showVerticalScrollIndicator:false,

    }
}))`
    flex:1;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const CheckIcon = styled.Image`
    width: 200px;
    height: 200px;
    align-self: center;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 25px;
    margin-left: 40px;
`;
const CompleteText = styled.Text`
    align-self: center;
    color: #3B67FF;
    font-size: 25px;
    font-weight: 800;
    margin-bottom: 30px;
`;
const ThanksText = styled.Text`
    align-self: center;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 15px;
    color: black;
`;
const ThanksAddText = styled.Text`
    align-self: center;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    color: black;
`;
const HomeBtn = styled.TouchableOpacity`
    border: 1px;
    border-color: gray;
    width: 80%;
    height: 50px;
    align-self: center;
    margin-top: 15%;
    border-radius: 10px;
    background-color: #E6E6E6;
    justify-content: center;
`;
    const HomeText = styled.Text`
        font-size : 20px;
        align-self: center;
        font-weight: 700;
        color: gray;
    `;

const Finish =({navigation:{navigate}})=>{
    const navigation = useNavigation();
    const DataValue = firestore().collection('users');
    const RobotGPS = firestore().collection('Robot');


    return(
    <Container>
        <CheckIcon
            source={require('../images/check.png')}>
        </CheckIcon>
        <CompleteText>도착완료!</CompleteText>
        <ThanksText>어플을 이용해주셔서 감사합니다.</ThanksText>
        <HomeBtn onPress={()=> {
            navigation.navigate("Home");
            RobotGPS.doc('GPS').set({
                latitude : 1,
                longitude : 1,
            })
        }}>
            <HomeText>홈으로 돌아가기</HomeText>
        </HomeBtn>
    </Container>
);
    };

export default Finish;