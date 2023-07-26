import React, { useState } from "react";
import {StyleSheet,View,Text,TouchableOpacity,Modal} from "react-native";
import firestore from '@react-native-firebase/firestore';
import styled from "styled-components/native";


import { useNavigation } from "@react-navigation/native";

const Btn = styled.TouchableOpacity`
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
  const BtnText = styled.Text`
    font-size: 20px;
    align-self: center;
    color: white;
    font-weight: 600;
  `;

//---------------------------------------------
//------------------Modal----------------------
//---------------------------------------------
const ModalBackView = styled.View`
    position: absolute;
    background-color: black;
    opacity: 0.5;
    width: 100%;
    height: 100%;
`;
const ModalView = styled.View`
    background-color: white;
    width:80%;
    border-radius: 15px;
    top : 40%;
    left : 10%;
    padding-top: 3%;
    padding-bottom: 4%;
    justify-content: space-between;
`; 
    const Text1Box = styled.View`
        //border : 1px;
        width: 100%;
        align-items: center;
        justify-content: center;
        margin-bottom: 5%;
    `;
        const Text1 = styled.Text`
            font-size: 24px;
            color : black;
            font-weight: 600;
            margin-bottom: 2%;
        `;
    const SelectBtnBox = styled.View`
        //border : 1px;
        width: 90%;
        height: 35px;
        flex-direction: row;
        justify-content: space-between;
        align-self: center;
    `;
        const ModalYesPressable = styled.Pressable`
            border-radius: 10px;
            background-color: #3C67FF;
            width:40%;
            height: 100%;
            justify-content: center;
            align-items: center;
        `;
            const ModelYesText = styled.Text`
                color : white;
                font-size: 16px;
                font-weight: 600;
            `;
        const ModalNoPressable = styled.Pressable`
            border-radius: 10px;
            background-color: lightgray;
            width:40%;
            height: 100%;
            justify-content: center;
            align-items: center;
            margin-right: 3.33%;
        `;
            const ModelNoText = styled.Text`
                color : black;
                font-size: 16px;
                font-weight: 600;
            `;


const CancleBtn=()=>{

  const navigate = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

    return(
      <>
      <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <ModalBackView></ModalBackView>
            <ModalView>
            <Text1Box>
                <Text1>호출을 취소하시겠습니까?</Text1>
            </Text1Box>
            <SelectBtnBox>
                <ModalYesPressable onPress={()=> {
                    navigate.navigate("Home")
                }}>
                <ModelYesText>네</ModelYesText>
                </ModalYesPressable>
                <ModalNoPressable onPress={()=>{
                    setModalVisible(false)
                }}>
                <ModelNoText>아니요</ModelNoText>
                </ModalNoPressable>
            </SelectBtnBox>
            </ModalView>
        </Modal>
      <Btn onPress={()=> setModalVisible(true)}>
          <BtnText>호출 취소</BtnText>
      </Btn>
      </>
    )
}
export default CancleBtn;