import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { globalStyle, color, appStyle } from '../../utility';
import ImagePicker from 'react-native-image-picker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList } from 'react-native-gesture-handler';
import styles from './styles';
import { InputField, ChatBox } from '../../components';
import firebase from '../../firebase/config'

const Chat = ({route, navigation}) => {
  const {params} = route;
  const {name, img, imgText, guestUsersid, currentUserId} = params;
  const [msgValue, setMsgValue] = useState('');
  const [messages, setMesseges] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
    headerTitle: <Text>{name}</Text>
    });
  }, [navigation])

  useEffect(() => {
    try{
      firebase.database().ref('messeges').child(currentUserId).child(guestUsersid)
      .on('value', (dataSnapshot) => {
        let msgs = [];
        dataSnapshot.forEach((child) =>{
          msgs.push({
            sendBy: child.val().messages.sender,
            recievedBy: child.val().messege.reciever,
            msg: child.val().msg,
            img: child.val().img,
          });
        });
        setMesseges(msgs);
      })
    } catch (error) {

    }
  }, []);

  const handleSend = () => {
    if(msgValue){

    }
    setMsgValue('');
  }

  const handleCamera = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = "data:image/jpeg;base64," + response.data;
      }
    });
  };

  const handleOnChange = (text) => {
    setMsgValue(text);
  }

  return (
    <SafeAreaView style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
      <FlatList inverted data={messages} keyExtractor={(_, index) => index.toString()} 
        renderItem={({item}) => ( 
        <ChatBox msg={item.msg} userId= {item.sendBy} img={item.img} onImgTap={() => imgTap(item.img)}/>
        )}
        
      />
    <View style={styles.sendMessageContainer}>
      <InputField placeholder="Type here" numberOfLines={10} inputStyle={styles.input} onChangeText={(text) => handleOnChange(text)}/>
      <View style={styles.sendBtnContainer}>
        <MaterialCommunityIcons name="camera" color={color.WHITE} size={appStyle.fieldHeight} onPress={() => handleCamera()}/>
        <MaterialCommunityIcons name="send-circle" color={color.WHITE} size={appStyle.fieldHeight} onPress={() => handleSend()}/>
      </View>
    </View>

    </SafeAreaView>
  )
}

export default Chat
