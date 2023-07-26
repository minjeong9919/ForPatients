import React from "react";
import { Text, TouchableOpacity, View,Modal, FlatList, StyleSheet, Platform } from "react-native";
import styled from "styled-components/native";
import {Image} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import {shadow} from 'react-native-shadow2'

const Container = styled.View.attrs(()=>({
    contentContainerStyle:{
        showVerticalScrollIndicator:false,
    }
}))`
    flex:1;
    padding-top: 30px;
    padding-bottom: 10px;
    background: white;
    padding-left : 5%;
    padding-right : 5%;
    align-Items:center;
`;


const DATA = [
    {
        id : '1',
        title : '상처가 난 경우',
        content1 : '깨끗한 물이나 식염수를 이용하여 상처부위를 1~2분간 씻는다.',
        content2 : '알코올 또는 소독약을 이용하여 상처부위 주변으로부터 먼 곳으로 두드리듯이 닦아내며 소독한다.',
        content3 : '소독이 완료되면 깨끗한 천이나 거즈를 이용하여 싸고, 붕대가 있는 경우 지혈이 될 정도로 지그시 압박하며 감싸준다.',
        content4 : '피가 지속적으로 흐르는 경우에는 지그시 압박하여 지혈을 유지하고, 상처부위를 심장보다 높게 하는 것이 도움이 된다',
        picture : require("../images/injury.jpg"),
        icon : require("../images/tape2.png")
    },
    {
        id : '3',
        title : '목의 이물감',
        content1 : '환자를 일으킨 상태로 등을 두들겨준다.',
        content2 : '이물질이 안나오는 경우 엄지와 인지(가운데 손가락)를 목구멍에 집어넣고, 구토를 유발시킨다.',
        content3 : '그럼에도 안나오는 경우 환자의 배를 팔로 감싸고 순간적으로 강하게 조인다.',
        picture : require("../images/neck.jpg"),
        icon : require("../images/neckicon.png")
    },
    {
        id : '4',
        title : '복부 충격',
        content1 : '겉보기에 상처가 없어도 내부 장기의 손상이 있을 수 있다',
        content2 : '허리띠나 바지가 배를 조이고 있다면 풀어준다.',
        picture : require("../images/colic.png"),
        icon : require("../images/stomach.png")
    },
    {
        id : '5',
        title : '화상',
        content1 : '너무 차가운 물이나 얼음으로 열기를 식히면 저체온증으로 빠지므로 주의한다.',
        content2 : '옷 또는 장신구가 몸에 붙었다면 억지로 제거하지 말고 병원에서 제거해야한다.',
        content3 : '터지지 않는 수포는 일부러 터뜨리지 않는다.',
        content4 : '솜 등은 화상부위에 직접 붙을 수가 있으므로 소독 시에 사용하지 않는 것이 좋다.',
        picture : require("../images/burn.jpg"),
        icon : require("../images/burnicon.png")
    },
    {
        id : '6',
        title : '눈 손상',
        content1 : '안구의 이물질이 박힌 경우가 아니라면 위,아래,양 옆으로 눈이 잘 움직이고 잘 보이는지 확인한다.',
        content2 : '양쪽 눈을 되도록이면 움직이지 않도록 안정한다. 특히 안구에 이물질이 박힌 경우 안구의 운동을 최소화한다.  이때 환자는 심리적으로 상당히 불안할 수가 있으므로, 자세한 설명과 함께 환자를 심리적으로 안정시켜 주어야 한다.',
        content3 : '이물질이 없는 경우에는 멸균 패드로 압력 없이 눈 위에 덮는다.',
        content4 : '눈의 타박상인 경우 눈에 압력이 가해지지 않도록 아이스 팩을 수건으로 싸서 덮을 수 있다.',
        picture : require("../images/eye.jpg"),
        icon : require("../images/eyeicon.png")
    },
    {
        id : '7',
        title : '경련, 발작',
        content1 : '담요 또는 옷을 사용하여 머리가 손상받지 않도록 보호한다. 기도를 막을 수 있으므로 머리 아래에 두지 않고, 옆에 놓는다.',
        content2 : '발작을 한 뒤, 구토물 등에 기도폐쇄를 막기 위해 환자를 옆으로 눕히고, 머리를 뒤로 기울인다.',
        picture : require("../images/seizure.jpg"),
        icon : require("../images/muscle.png")
    },
]

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
const FlatView = styled.TouchableOpacity`
    border : 2px;
    border-Radius : 15px;
    width: 175px;
    height: 175px;
    justify-content : space-between;
    align-Items : center;
    align-self : center;
    padding: 15px;
    margin-right : 20px;
    margin-bottom : 7px;
     
`;
    const IconImg = styled.Image`
        width: 90px;
        height: 90px;
    `;
    const ListText = styled.Text`
        font-size : 20px;
        margin-left : 10px ;
        color : black;
    `;

const Method =({navigation:{navigate}})=>{
    const navigation = useNavigation();
    const DataValue = firestore().collection('users');
    const RobotGPS = firestore().collection('Robot');

    return(
        <Container>
        <TitleText>기본처치 이렇게해주세요!</TitleText>
            <View style={{
                flexDirection:'row',
            }}>
            <FlatList
                data = {DATA}
                renderItem={({item})=>(
                    <FlatView onPress = {()=> navigation.navigate("Method_Details",{item: item})}>
                        <IconImg source={item.icon}></IconImg>
                        <ListText>{item.title}</ListText>
                    </FlatView>
                )}
                keyExtractor={(item) => (item.id)}
                numColumns={2}
                />
            </View>
        </Container>
    );
};
export default Method;