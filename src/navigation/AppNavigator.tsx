import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import { Button, TouchableOpacity, Text, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import ProductInfo from "../screens/ProductInfo";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Cart" component={Cart}/>
                <Stack.Screen name="Checkout" component={Checkout} />
                <Stack.Screen name="ProductInfo" component={ProductInfo} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;

