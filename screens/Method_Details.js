import React from "react";
import {useState} from 'react';
import { Text, TouchableOpacity, View,Modal, FlatList } from "react-native";
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
    padding-top: 15px;
    padding-bottom: 10px;
    background: white;
`;

const TitleText = styled.Text`
    width: 100%;
    height: 50px;
    align-self: center;
    justify-content: center;
    margin-bottom: 15px;
    align-self: center;
    font-size: 25px;
    font-weight: 700;
    color : #2B2B97;
    text-align: center;
`;
const PictureView = styled.View`
    //border: 1px;
    width: 100%;
    height: 200px;
    justify-Content:center;
    margin-bottom : 15px
`;
const PictureImage = styled.Image`
    align-self : center;
`;
const TextView = styled.View`
    width: 91.6%;
    //border: 1px;
    align-self : center;
    flex-Direction : row;
    margin-bottom : 3px;
`;
    const Number = styled.Text` 
        color: red;
        font-size : 25px;
        font-weight : 600;
    `;
    const ContentText = styled.Text`
        color: black;
        font-size : 14px;
        margin-left: 7px;
        margin-top : 7px;
        margin-right : 7px
    `;



const Method_Details =({navigation:{navigate},route})=>{
    const navigation = useNavigation();
    const DataValue = firestore().collection('users');
    const RobotGPS = firestore().collection('Robot');

    const [Image, setImage] = useState("");

    const item = route.params.item;

    return(
    <Container>
        <TitleText>{item.title}</TitleText>
        <PictureView>
            <PictureImage source = {item.picture} ></PictureImage>
        </PictureView>
        <TextView>
            <Number>1.</Number>
            <ContentText>{item.content1}</ContentText>
        </TextView>
        <TextView>
            <Number>2.</Number>
            <ContentText>{item.content2}</ContentText>
        </TextView>
        {
            item.content3 == null?
            null
            :
            <TextView>
                <Number>3.</Number>
                <ContentText>{item.content3}</ContentText>
            </TextView>
        }
        {
            item.content4 == null?
            null
            :
            <TextView>
                <Number>4.</Number>
                <ContentText>{item.content4}</ContentText>
            </TextView>
        }
        
    </Container>
    );
};
export default Method_Details;