import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {Login, Dashboard, Signup, Splash, ShowFullImg, Chat} from '../container'
import {color} from '../utility'

const Stack = createStackNavigator();

function NavContainer() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialNavigator="Splash" 
            screenOptions={{headerShown: true, headerStyle:{backgroundColor: color.DARK_GRAY}, headerTitleAlign:'center', headerTitleStyle:{fontWeight:'bold', fontSize:20}}}>
                <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/> 
                <Stack.Screen name="Dashboard" component={Dashboard} options={{headerLeft: null}}/>
                <Stack.Screen name="ShowFullImg" component={ShowFullImg} options={{headerBackTitle: null}}/>
                <Stack.Screen name="Chat" component={Chat} options={{headerBackTitle: null}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default NavContainer;