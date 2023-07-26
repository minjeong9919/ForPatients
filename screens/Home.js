import React from "react";
import { Text,TouchableOpacity, View,Modal, Animated} from "react-native";
import {useState} from 'react';
import styled from "styled-components/native";

import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import { RadioButton} from "react-native-paper";
import { useEffect } from "react";

//깜빡임 효과-------------------------------
//Animated.timing(this.state.x)
opa = 0;
//--------------------------------------------


const Container = styled.ScrollView.attrs(()=>({
    contentContainerStyle:{
        showVerticalScrollIndicator:false,
    }
}))`
    flex:1;
    margin-top: 10px;
    margin-bottom: 10px;
    background: white;
`;
//----------3초간 길게 눌러주세요.--------------------
//--------------------------------------------------
const TouchTextBox = styled.View`
    //border:1px;
    width: 91.6%;
    height: 50px;
    align-self: center;
    justify-content: center;
    margin-bottom: 30px;
`;
    const TouchText = styled.Text`
        align-self: center;
        font-size: 25px;
        font-weight: 700;
        color : black;
        font-Family : 'DoHyeon-Regular';
    `;
//---------------------------------------------
//------------긴급/일반 호출 버튼---------------
//---------------------------------------------
const CallBtnBox = styled.View`
    //border: 1px;
    align-self: center;
    justify-content: space-between;
    flex-direction: row;
`;
    const EmergencyBtnBox = styled.View`
        border: 2px;
        border-Radius: 15px;
        width: 70%;
        height: 100%;
        align-items: center;
        padding: 15px;
    `;
        const EmergencyBtn = styled.Pressable`
            border : 6px;
            width: 180px;
            height: 180px;
            border-radius: 90px;
            background: #BA1313;
            justify-content: center;
        `;
            const EmergencyBtnIcon = styled.Image`
                width: 60%;
                height: 60%;
                align-self: center;
            `;
        const EmergencyBtnText = styled.Text`
            font-size: 35px;
            font-weight: 600;
            color: #E91414;
            margin-top: 15px;
            margin-bottom: 15px;
        `;
        const EmergencyAddText = styled.Text`
            font-size: 15px;
            font-weight: 400;
            text-align: center;
            color: black;
        `;
        const EmergencyAddText2 = styled.Text`
            font-size: 15px;
            font-weight: 600;
            text-align: center;
            color: red;
        `;
        const EmergencyTextView = styled.View`
            flex-Direction: row;
            //border: 1px;
        `;

//---------------------------------------------
//------------------Modal----------------------
//---------------------------------------------
const ModalBackView = styled.View`
    position: absolute;
    background-color: black;
    opacity: 0.7;
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
            font-size: 20px;
            color : black;
            font-weight: 600;
            margin-bottom: 2.5%;
        `;
        const Text2 = styled.Text`
            text-align: center;
            font-size : 13px;
            font-weight: 400;
            margin-bottom: 2.5%;
        `;
    const SelectBtnBox = styled.View`
        border : 1px;
        width: 70%;
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
            `;
//------------------------------------------------------
//----------------------Radio Button--------------------
//------------------------------------------------------
const RadioView = styled.View`
    background-color: white;
    width:80%;
    top : 30%;
    border-radius: 15px;
    padding : 3%;
    padding-top: 5%;
    justify-content: space-between;
    align-self: center;
`;
const BtnBox = styled.View`
    //border: 1px;
    flex-direction: row;
    padding : 5px;
    justify-content: space-between;
    align-self: center;
    width : 90%;
    margin-bottom: 3%;
    margin-top: 15px;
`; 
    const RadioCompleteBtn = styled.TouchableOpacity`
        width: 40%;
        //border: 1px;
        border-radius: 5px;
        height: 30px;
        justify-content: center;
        background-Color: #2196F3;
    `;
    const RadioCancleBtn = styled.TouchableOpacity`
        width: 40%;
        border: 1px;
        border-radius: 5px;
        height: 30px;
        justify-content: center;
    `;
    const CalcleBtnText = styled.Text`
        font-size: 18px;
        text-align: center;
        color: #000000;
    `;
     const BtnText = styled.Text`
     font-size: 18px;
     text-align: center;
     color: #ffffff;
 `;
    const ChoiceText = styled.Text`
        font-size : 20px;
        text-align: center;
        font-weight: 600; 
        color: black;
    `;
    
    const BtnView = styled.View`
        width: 85%;
        //border: 1px;
        flex-Direction : row;
        align-self : center;
        margin-top : 7%;
        justify-Content: space-between;
    `;
        const TestBtn = styled.TouchableOpacity`
            border: 2px;
            border-Radius : 15px;
            width: 160px;
            height: 160px;
            align-self: center;
            //background-color: green;
            justify-content: center;
        `;
            const BtnTextView = styled.View`
                width: 100%;
                height: 25px;
                //border: 1px;
                margin-bottom : 15px;
            `;
            const TestBtnText = styled.Text`
                font-size: 18px;
                text-align: center;
                font-weight: 600;
                color: black;
            `;
            const TextBtnImage = styled.Image`
                width: 100px;
                height: 100px;
                align-self : center;
                margin-bottom : 5px;
            `;
//경고문을 위한 modal창
const WarningModalView = styled.View`
    background-color: white;
    width:85%;
    border-radius: 7px;
    align-self: center;
    padding : 3%;
    justify-content: space-between;
    margin-top: 60%;
`;
    const WarningTextView1 = styled.View`
        //border: 1px;
        flex-direction: row;
        margin-bottom: 20px;
        width: 100px;
        align-self: center;
    `;
        const WarningIcon = styled.Image`
            width: 40px;
            height: 40px;
        `;
        const WarningText = styled.Text`
            color: black;
            text-align: center;
            align-self: center;
            font-size: 20px;
            font-weight: 700;
            margin-left: 10px;
        `;
        const WarningText2 = styled.Text`
            color: black;
            text-align: center;
            align-self: center;
            font-size: 15px;
            font-weight: 700;
            margin-left: 10px;
            margin-bottom: 5px;
        `;
        const WarningText3 = styled.Text`
            color: black;
            text-align: center;
            align-self: center;
            font-size: 13px;
            font-weight: 500;
            margin-left: 10px;
            margin-bottom: 27px;
        `;
        const WarningBtnBox = styled.View`
            //border: 1px;
            flex-direction: row;
            width: 70%;
            justify-content: space-between;
            align-self: center;
            height: 30px;
            margin-bottom: 10px;
        `;
            const WaningBtn = styled.Pressable`
                border: 1px;
                width: 40%;
                border-radius: 5px;
                padding-top: 4px;
                padding-bottom: 4px;
            `;  
                const WarningBtnText = styled.Text`
                    font-size: 16px;
                    font-weight: 600;
                    color: black;
                    text-align: center;
                `;


const Home =({navigation:{navigate}})=>{
    const [emermodalVisible,emersetModalVisible] = useState(false);
    const [CommodalVisibal, ComsetModalVisible] = useState(false);
    const [warningModal, setWarningModal] = useState(false);
    const [radioVisible, setRadioVisible] = useState(false);
    const [callState, setCallState] = useState("");


    const[saveName, setSaveName] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLogitude] = useState(null);

    const date = new Date;

    const [value, setValue] = useState('first');

    const addValue = firestore().collection('GPS');
    const RobotDB = firestore().collection('Robot');
    const MusicDB = firestore().collection('Music');
    const navigation = useNavigation();

    const [blogs, setBlogs] = useState([]);
    const [Nweets, setNweets] = useState([]);

    //로봇의 위치가 업데이트 될 때마다 위치 정보를 받은 변수 선언
    const [robotLatitude, setRobotLatitude] = useState(null);
    const [robotLongitude, setRobotLongitude] = useState(null);

    function Counter(){
        const [count, setCount] = useState(0);
    
        useInterval(()=>{
            setCount(count+1);
        },1000);
    }
    //특정 document의 데이터 가져오기
    /* useEffect(()=> {
        addValue.where('Name','==','민정').onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({
                id : doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray);
        });
    }, []); */
    
    useEffect(()=> {
        RobotDB.onSnapshot(snapshot => {
        const nweetArray = snapshot.docs.map(doc => ({
            id : doc.id,
            ...doc.data(),
        }));
        setNweets(nweetArray);
        console.log(nweetArray);
        // setRobotLatitude(nweetArray[0].latitude);
        // setRobotLongitude(nweetArray[0].longitude);
        // console.log(robotLatitude,robotLongitude);
        });
    },[]);

    /* const GetValue = async()=>{
        const data = await addValue.orderBy("Date","asc").get();
        data.docs.forEach(item=>{
            setBlogs([...blogs,item.data()])
        })
        blogs && blogs.map(blog=>{
            //console.log(blog.Name,blog.latitude);
            //console.log(blog)
        })
        blogs.length = 2;
        //console.log(blogs);
        //blogs.length = 0;
    } */

    const geoLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const latitude = JSON.stringify(position.coords.latitude);
                const longitude = JSON.stringify(position.coords.longitude);

                setLatitude(latitude);
                setLogitude(longitude);
            },
            error => { console.log(error.code, error.message); },
            {enableHighAccuracy:true, timeout: 15000},
        );
    }
    //사용자 정보 지우기
    const DeleteValue = () => {
        const ID = addValue.doc(saveName).id;
        console.log(ID)
        addValue.doc(ID).delete();
    }

    return (
        <Container>
            <Modal
                animationType="fade"
                transparent={true}
                visible={radioVisible}
            >
                <ModalBackView></ModalBackView>
                <RadioView>
                    <ChoiceText>증상을 선택해주세요.</ChoiceText>
                    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                    <RadioButton.Item label="심정지" value = "1" />
                    <RadioButton.Item label="온열질환" value = "2" />
                    <RadioButton.Item label="골절 및 염좌" value = "3"/>  
                    </RadioButton.Group>
                    <BtnBox>
                        <RadioCompleteBtn onPress={()=>{
                            geoLocation();
                            if (latitude != null){
                                navigation.navigate("MapPage",{Name: saveName, Latitude: latitude, Longitude: longitude, RBlatitude: robotLatitude, RBlongitude: robotLongitude});
                                addValue.doc(saveName).set({
                                    Name : saveName,
                                    latitude : latitude,
                                    longitude : longitude,
                                    symptom : value,
                                    Date : date
                                })
                                MusicDB.doc("Music").set({
                                    state : "stop"
                            })}
                            else{return console.log("위치 못받음");}
                            setRadioVisible(false);
                            ComsetModalVisible(false);
                        }}
                            >
                            <BtnText>완료</BtnText>
                        </RadioCompleteBtn>
                        <RadioCancleBtn onPress={()=>setRadioVisible(false)}>
                            <CalcleBtnText>취소</CalcleBtnText>
                        </RadioCancleBtn>
                    </BtnBox>
                </RadioView>
            </Modal>
        <Modal
            animationType="fade"
            transparent={true}
            visible={CommodalVisibal}
        >
            <ModalBackView></ModalBackView>
            <ModalView>
             <Text1Box>
                <Text1>일반 호출을 하시겠습니까?</Text1>
                <Text2>일반 호출 시 사용자의 위치로{'\n'}로봇이 이동합니다.</Text2>
                    </Text1Box>
                    <SelectBtnBox>
                        <ModalYesPressable onPress={()=>{
                                setRadioVisible(true);
                        }}>
                            <ModelYesText>네</ModelYesText></ModalYesPressable>
                        <ModalNoPressable onPress={()=>ComsetModalVisible(false)}>
                            <ModelNoText>아니요</ModelNoText>
                        </ModalNoPressable>
                    </SelectBtnBox>
                </ModalView>
        </Modal>
        <Modal
            animationType="fade"
            transparent={true}
            visible={warningModal}
        >
            <ModalBackView></ModalBackView>
            <WarningModalView>
                <WarningTextView1>
                    <WarningIcon source={require('../images/warning.jpg')}></WarningIcon>
                    <WarningText>경고</WarningText>
                </WarningTextView1>
                <WarningText2>정말 신고하시겠습니까?</WarningText2>
                <WarningText3>허위 신고 시 소방기본법 제56조 제 19조제1항에 의거 최대 500만원의 과태료의 벌금에 처합니다. </WarningText3>
                <WarningBtnBox>
                    <WaningBtn onPress={()=>{
                        setWarningModal(false);
                        setRadioVisible(true)
                    }}>
                        <WarningBtnText>확인</WarningBtnText>
                    </WaningBtn>
                    <WaningBtn onPress={()=>setWarningModal(false)}>
                        <WarningBtnText>취소</WarningBtnText>
                    </WaningBtn>
                </WarningBtnBox>
                </WarningModalView>

        </Modal>
            <TouchTextBox>
                <TouchText>3초간 길게 눌러주세요.</TouchText>
            </TouchTextBox>
            <CallBtnBox>
                <EmergencyBtnBox>
                    <EmergencyBtn
                        ConfigureBtn onLongPress={()=>{
                            setCallState("emergency")
                            setWarningModal(true)
                        }}>
                        <EmergencyBtnIcon source={require('../images/emergency.png')}></EmergencyBtnIcon>
                    </EmergencyBtn>
                    <EmergencyBtnText>응급 호출</EmergencyBtnText>
                    <EmergencyTextView>
                        <EmergencyAddText>응급상황의 경우</EmergencyAddText>
                        <EmergencyAddText2> 빨간 버튼을 </EmergencyAddText2>
                    </EmergencyTextView>
                    <EmergencyAddText>눌러주세요.</EmergencyAddText>
                </EmergencyBtnBox>
            </CallBtnBox>
            <BtnView>
            {
                // <TestBtn onPress={()=> navigation.navigate("Method")}>
                //     <TestBtnText>기본 처치 방법</TestBtnText>
                // </TestBtn>
                // <TestBtn onPress={()=> DeleteValue()}>
                //     <TestBtnText>정보 지우기</TestBtnText>
                // </TestBtn>
                // <TestBtn onPress={()=> navigation.navigate("Finish")}>
                //     <TestBtnText>넘어가기</TestBtnText>
                // </TestBtn>
            }
            <TestBtn onPress={()=> navigation.navigate("Method")}>
                <BtnTextView><TestBtnText>기본 처치 방법</TestBtnText></BtnTextView>
                <TextBtnImage source={require('../images/cross.png')}></TextBtnImage>
            </TestBtn>
            <TestBtn onPress={()=> navigation.navigate("MyGPS")}>
                <BtnTextView><TestBtnText>지금 나의 위치</TestBtnText></BtnTextView>
                <TextBtnImage source={require('../images/cross.png')}></TextBtnImage>
            </TestBtn>
            </BtnView>
        </Container>
      );}
export default Home;