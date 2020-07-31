import React, { Component, useEffect } from 'react'
import { View } from 'react-native'
import { globalStyle } from '../../utility'
import {color} from '../../utility'
import { Logo } from '../../components'
import { getAsyncStorage, keys } from '../../asyncStorage'
import { setUniqueValue } from '../../utility/constants'

const Splash = ({navigation}) => {
    useEffect(()=>{
        const redirect = setTimeout(()=> {
            getAsyncStorage(keys.uuid)
            .then((uuid) =>{
                if(uuid){
                    setUniqueValue(uuid);
                    navigation.navigate('Dashboard');
                }else {
                    navigation.replace('Login');
                }
            })
            .catch((err) =>{
                console.log(err);
                navigation.replace('Login');
            });
        }, 3000);
        return () => clearTimeout(redirect);
    }, [navigation])
        return (
            <View style={[globalStyle.containerCentered, {backgroundColor:color.DARK_PURPLE}]}>
                <Logo />
            </View>
        )
}

export default Splash;
