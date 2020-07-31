import React, { useState, useContext } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, Keyboard,TouchableWithoutFeedback, SafeAreaView } from 'react-native'
import {globalStyle, color} from '../../utility'
import {Logo, InputField, RoundCornerButton} from '../../components'
import { Store } from '../../context/store'
import { LOADING_START, LOADING_STOP } from '../../context/actions/type'
import { SignUpReq, AddUser } from '../../network'
import { setAsyncStorage, keys } from '../../asyncStorage'
import { setUniqueValue, keyboardVerticalOffset } from '../../utility/constants'
import firebase from '../../firebase/config'

const Signup = ({navigation}) =>  {

    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;
    const [showLogo, toggleLogo] = useState(true);

    const [credential, setCredential] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
    });
    const {name, email, password, confirmpassword} = credential;

    const setInitialState = () => {
        setCredential({ email: "", password: "", confirmPassword: "" });
      };

    const handleOnChange = (name, value) =>{
        setCredential({ ...credential, [name]:value });
    };

    const onSignUpPress = () => {
        if(!name){
            alert('Name is required')
        }else if(!email){
            alert('email required')
        }else if(!password){
            alert('password required')
        }else if(password !== confirmpassword){
            alert('Password not match')
        }else {
            dispatchLoaderAction({ type: LOADING_START});
            SignUpReq(email, password)
            .then((res) =>{ 
                if(!res.additionalUserInfo){
                    console.log('first err');
                    dispatchLoaderAction({type: LOADING_STOP});
                    alert(res);
                    return;
                }
                console.log(firebase.auth().currentUser);
                let uid = firebase.auth().currentUser.uid;
                let profileImg = '';
                AddUser(name, email, uid, profileImg)
                .then(()=>{ 
                    setAsyncStorage(keys.uuid, uid);
                    setUniqueValue(uid);
                    dispatchLoaderAction({type: LOADING_STOP});
                    setInitialState();
                    navigation.navigate('Login');
                })
                .catch((err) => {
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                    })
                })
            })
            .catch((err)=>{ 
                alert(err)
                dispatchLoaderAction({
                    type: LOADING_STOP
                });
            })
        }
    };

    const handleFocus = () => {
        setTimeout(() => {
            toggleLogo(false);
        },200);
    }

    const handleBlur = () => {
        setTimeout(() => {
            toggleLogo(true);
        },200);
    }

    return (
        <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[globalStyle.flex1, { backgroundColor: color.DARK_PURPLE }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: color.DARK_PURPLE }}>
          {showLogo && (
            <View style={[globalStyle.containerCentered]}>
              <Logo />
            </View>
          )}

          <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
            <InputField
              placeholder="Enter name"
              value={name}
              onChangeText={(text) => handleOnChange("name", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            <InputField
              placeholder="Enter email"
              value={email}
              onChangeText={(text) => handleOnChange("email", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            <InputField
              placeholder="Enter password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => handleOnChange("password", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            <InputField
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmpassword}
              onChangeText={(text) => handleOnChange("confirmpassword", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />

            <RoundCornerButton
              title="Sign Up"
              onPress={() => onSignUpPress()}
            />
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: color.LOGIN_SIGNUP_PURPLE,
              }}
              onPress={() => {
                setInitialState();
                navigation.navigate("Login");
              }}
            >
              Login
            </Text>
          </View>
        </View>
       </TouchableWithoutFeedback>
     </KeyboardAvoidingView>
    )
}


export default Signup;
