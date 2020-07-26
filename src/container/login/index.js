import React, { useState, useContext } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, Keyboard,TouchableWithoutFeedback, SafeAreaView } from 'react-native'
import {globalStyle, color} from '../../utility'
import {Logo, InputField, RoundCornerButton} from '../../components'
import { Store } from '../../context/store'
import { LOADING_START, LOADING_STOP } from '../../context/actions/type'
import { LoginReq } from '../../network'
import { setAsyncStorage, keys } from '../../asyncStorage'
import { setUniqueValue, keyboardVerticalOffset } from '../../utility/constants'

const Login = ({navigation}) =>  {
    
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [showLogo, toggleLogo] = useState(true);
   
    const [credential, setCredential] = useState({
        email: '',
        password: '',
    });
    const {email, password} = credential;

    const handleOnChange = (name, value) =>{
        setCredential({ ...credential, [name]:value });
    };

    const OnLoginPress = () => {

        if(!email){
            alert('email required')
        }else if(!password){
            alert('password required')
        }else{
            dispatchLoaderAction({ type: LOADING_START});
            LoginReq(email, password)
            .then((res) => {
                if(!res.additionalUserInfo){
                    dispatchLoaderAction({type: LOADING_STOP});
                    alert( res);
                    return;
                }
                setAsyncStorage(keys.uuid, res.user.uid);
                setUniqueValue(res.user.uid);
                dispatchLoaderAction({ type: LOADING_STOP});
                navigation.navigate('Dashboard');
            }).catch((err) => {
                dispatchLoaderAction({ type: LOADING_STOP});
                alert( err);
            });
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
        style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView
            style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
          >
            {showLogo && (
              <View style={[globalStyle.containerCentered]}>
                <Logo />
              </View>
            )}
            <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
              <InputField
                placeholder="Enter email"
                value={email}
                onChangeText={(text) => handleOnChange("email", text)}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
              />
              <InputField
                placeholder="Enter password"
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => handleOnChange("password", text)}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
              />
  
              <RoundCornerButton title="Login" onPress={() => OnLoginPress()} />
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: color.LIGHT_GREEN,
                }}
                onPress={() => {
                  // setInitialState();
                  navigation.replace("Signup");
                }}
              >
                Sign Up
              </Text>
            </View>
          </SafeAreaView>
     </TouchableWithoutFeedback> 
 </KeyboardAvoidingView>
    );
    
    
}

export default Login
