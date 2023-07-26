import React from "react";
import {StyleSheet,View,Text,TouchableOpacity,} from "react-native";
import firestore from '@react-native-firebase/firestore';
import styled from "styled-components/native";

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
    top : 36%;
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
        margin-bottom: 2%;
    `;
        const Text1 = styled.Text`
            font-size: 24px;
            color : black;
            font-weight: 600;
            margin-bottom: 2%;
        `;
        const Text2 = styled.Text`
            text-align: center;
            font-size : 17px;
            font-weight: 400;
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

const Modal=({title,content,visible})=>{

    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <ModalBackView></ModalBackView>
            <ModalView>
            <Text1Box>
                <Text1>{title}</Text1>
                <Text2>{content}.</Text2>
            </Text1Box>
            <SelectBtnBox>
                <ModalYesPressable onPress={()=> {

                }}>
                <ModelYesText>네</ModelYesText>
                </ModalYesPressable>
                <ModalNoPressable onPress={()=>{
                    
                }}>
                <ModelNoText>아니요</ModelNoText>
                </ModalNoPressable>
            </SelectBtnBox>
            </ModalView>
        </Modal>
    )
}
export default Modal;