import React, { useLayoutEffect, useState, useContext, useEffect } from 'react'
import { View, FlatList, Alert, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import ImagePicker from 'react-native-image-picker'
import {color} from '../../utility'
import { LogoutUser, UpdateUser } from '../../network'
import {clearAsyncStorage} from '../../asyncStorage'
import firebase from '../../firebase/config'
import {uuid, smallDeviceHeight} from '../../utility/constants'
import {LOADING_START, LOADING_STOP} from '../../context/actions/type'
import {Profile, ShowUsers, StickyHeader} from '../../components'
import { Store } from '../../context/store'
import { deviceHeight } from "../../utility/styleHelper/appStyle";

const Dashboard = ({navigation}) => {
    const [userDetail, setUserDetail] = useState({
        id: '',
        name: '',
        profileImg: '',
    });
    const globalState = useContext(Store);
    const {dispatchLoaderAction} = globalState;
    const {name, profileImg} = userDetail;
    const [allUsers, setAllUsers] = useState([]);
    const [getScrollPosition, setScrollPosition]= useState(0);

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight: () => (<Icon name="logout" size={26} color='#dfe6e9' style={{right:10}} 
            onPress={() => Alert.alert('Logout', 'Are you sure', [
                {
                    text: 'Yes',
                    onPress: ()=> Logout(), 
                },{
                    text: 'No'
                }
            ])}/>)
        })
    })
    
    useEffect (() => {
        dispatchLoaderAction({
            type: LOADING_START,
        });
        try {
            firebase.database().ref('users').on('value', (dataSnapShot) => {
                let users = [];
                let currentUser = {
                    id:'',
                    name: '',
                    profileImg: ''
                }
                dataSnapShot.forEach((child) => {
                    if(uuid === child.val().uuid){
                        currentUser.id = uuid;
                        currentUser.name = child.val().name;
                        currentUser.profileImg = child.val().profileImg;
                    }else{
                        users.push({
                            id:child.val().uuid,
                            name:child.val().name,
                            profileImg:child.val().profileImg,
                        });
                    }
                });
                setUserDetail(currentUser);
                setAllUsers(users);
                dispatchLoaderAction({
                    type: LOADING_STOP,
                });
            });
        } catch(error) {
            dispatchLoaderAction({
                type: LOADING_STOP,
            });
            alert(error);
        }
    }, []);

    const selectPhotoTapped = () => {
        const options = {
          storageOptions: {
            skipBackup: true,
          },
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            console.log("User cancelled photo picker");
          } else if (response.error) {
            console.log("ImagePicker Error: ", response.error);
          } else if (response.customButton) {
            console.log("User tapped custom button: ", response.customButton);
          } else {
            let source = "data:image/jpeg;base64," + response.data;
            dispatchLoaderAction({
              type: LOADING_START
            });
            UpdateUser(uuid, source)
              .then(() => {
                setUserDetail({
                  ...userDetail,
                  profileImg: source,
                });
                dispatchLoaderAction({
                  type: LOADING_STOP,
                });
              })
              .catch(() => {
                alert(err);
                dispatchLoaderAction({
                  type: LOADING_STOP,
                });
              });
          }
        });
      };
// ------------------------log out -----------------------------------
    const Logout = () => {
        LogoutUser()
        .then(() => {
            clearAsyncStorage()
            .then(()=> {
                navigation.replace('Login');
            }).catch ((err) => alert(err));
        }).catch((err) => alert(err));
    }
// ------------------------log out -----------------------------------

    const imgTap = (profileImg, name) => {
        if(!profileImg){
            navigation.navigate('ShowFullImg', {
                name,
                imgText: name.charAt(0)
            })
        }
        else {
            navigation.navigate('ShowFullImg', {
                name,
                img : profileImg,
            })
        }
    }

    const nameTap = (profileImg, name, guestUserId) => {
        if (!profileImg) {
          navigation.navigate("Chat", {
            name,
            imgText: name.charAt(0),
            guestUserId,
            currentUserId: uuid,
          });
        } else {
          navigation.navigate("Chat", {
            name,
            img: profileImg,
            guestUserId,
            currentUserId: uuid,
          });
        }
    }

    const deleteUser = (userId) => {
      firebase.database().ref('users/' + userId).remove()
    }

    const getOpacity = () => {
        if (deviceHeight < smallDeviceHeight) {
          return deviceHeight / 4;
        } else {
          return deviceHeight / 6;
        }
      };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.DASHBRD_DARK_PURPLE }}>
          {getScrollPosition > getOpacity() && (
            <StickyHeader name={name} img={profileImg} onImgTap={() => imgTap(profileImg, name)}/>
          )}
        <FlatList alwaysBounceVertical={false} data={allUsers} keyExtractor={(_, index) => index.toString()}
          onEditImgTap={() => selectPhotoTapped()} onScroll={(event) =>setScrollPosition(event.nativeEvent.contentOffset.y)
          }
          ListHeaderComponent={
            <View style={{opacity:getScrollPosition < getOpacity() ? (getOpacity() - getScrollPosition) / 100: 0}}>
              <Profile img={profileImg} onImgTap={() => imgTap(profileImg, name)} onEditImgTap={() => selectPhotoTapped()} name={name}/>
            </View>
          }
          renderItem={({ item }) => (
            <ShowUsers name={item.name} img={item.profileImg} onImgTap={() => imgTap(item.profileImg, item.name)} 
              onNameTap={() => nameTap(item.profileImg, item.name, item.id)} onDeleteUser={()=> deleteUser(item.id)}/>
          )}/>
    </SafeAreaView>
    )
}

export default Dashboard
