import React from "react";
import {Background, LoadingText} from './Styles';
import { Text, TouchableOpacity, View,Modal } from "react-native";
import Spinner from '../images/LoadingCircle.gif';
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const LoadingView = styled.View`
    width: 100%;
    height: 100%;
    background-Color: white;
`;
  const LoadingText1 = styled.Text`
    font-size: 24px;
    font-weight: 700;
    color : #3B67FF;
    text-align: center;
  `;
  const LoadingText2 = styled.Text`
    font-weight: 400;
    font-size: 20px;
    text-align: center;
    margin-top: 5px;
  `;
  const SpinnerView = styled.Image`
    margin-top: 34%;
    margin-bottom: 4.7%;
    width: 200px;
    height: 200px;
    align-self: center;
  `;

  export default () => {

  return (
    <LoadingView>
      <SpinnerView  
        source={require('../images/loading.png')}>
      </SpinnerView>
      <LoadingText1>잠시만 기다려주세요.</LoadingText1>
    </LoadingView>
  );
};