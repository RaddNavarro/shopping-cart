import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, ScrollView, FlatList, Image, Dimensions, Animated, ImageBackground, ToastAndroid } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Props } from '../navigation/props'
import styles from "../styles/styles";
import { COLOURS, Products } from "../components/database/Database";
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { configureLayoutAnimationBatch } from "react-native-reanimated/lib/typescript/core";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProductInfo: React.FC<Props> = ({ route, navigation }) => {

    const {productID} = route.params

    const [product, setProduct] = useState({});

    const width = Dimensions.get('window').width;
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB()
        });

        return unsubscribe;
    }, [navigation])


    const getDataFromDB = async () => {
        
        for (let index = 0; index < Products.length; index++) {
            if (Products[index].id == productID) {
                await setProduct(Products[index])
                
                return;
            }
            
        }
    }

    const addToCart = async (id) => {
        
        let itemArray = await AsyncStorage.getItem('cartItems');
        itemArray = JSON.parse(itemArray);

        
        if (itemArray) {
            let array = itemArray;
            array.push(id);
            
            try {
                
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                ToastAndroid.show(
                    "Item Added Successfully to cart", ToastAndroid.SHORT
                );
                
                navigation.navigate('Home')
                
            } catch (error){
             
                console.log(error)
                return 
            }
            
        } else {
        
            let array = [];
            array.push(id);
            
            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                ToastAndroid.show(
                    "Item Added Successfully to cart", ToastAndroid.SHORT
                );
              
                navigation.navigate('Home')
                
            } catch(error) {
                console.log(error)
                return 
            }
        }
        
    }

    const renderProduct = ({ item, index }) => {
        return (
            <View style={{ width: width, height: 240, alignItems: 'center', justifyContent: 'center',  }}>
                <Image source={item} style={{ width: '100%', height: '100%', resizeMode: 'contain' }}/>
            </View>
        )
    }

    
    return (
        <View style={styles.productInfo_main_container}>
            <StatusBar backgroundColor={COLOURS.backgroundLight} barStyle="dark-content"/>
            <ScrollView>
                <View style={styles.productInfo_inner_container}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16, paddingLeft: 16 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Entypo name="chevron-left" style={{ fontSize: 18, color: COLOURS.backgroundDark, padding: 12, backgroundColor: COLOURS.white, borderRadius: 10 }}/>
                        </TouchableOpacity>
                    </View>
                    <FlatList data={product.productImageList ? product.productImageList : null}
                     horizontal renderItem={renderProduct} showsHorizontalScrollIndicator={false} decelerationRate={0.8} snapToInterval={width} bounces={false} onScroll={Animated.event([{ nativeEvent: {contentOffset : {x: scrollX}} }], {useNativeDriver: false})}/>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16, marginTop: 32 }}>
                        
                            {product.productImageList ? product.productImageList.map((data, index) => {
                                let opacity = position.interpolate({
                                    inputRange: [ index - 1, index, index + 1 ],
                                    outputRange: [0.2, 1, 0.2],
                                    extrapolate: 'clamp'
                                });
                                return (
                                    <Animated.View key={index} style={{ width: '16%', height: 2.4, backgroundColor: COLOURS.black, opacity, marginHorizontal: 4, borderRadius: 100 }}>

                                    </Animated.View>
                                )
                            }) 
                            : null }
                    </View>
                </View>
                <View style={{ paddingHorizontal: 16, marginTop: 6 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Entypo name="shopping-cart" style={{ fontSize: 18, color: COLOURS.blue, marginRight: 6 }}/>
                                <Text style={{ fontSize: 12, color: COLOURS.black }}>
                                    Shopping
                                </Text>
                            </View>
                        <View style={{ flexDirection: 'row', marginVertical: 4, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 24, fontWeight: '600', letterSpacing: 0.5, marginVertical: 4, color: COLOURS.black, maxWidth: '84%' }}>
                                {product.productName}
                            </Text>
                            <Ionicons name="link-outline" style={{ fontSize: 24, color: COLOURS.blue, backgroundColor: COLOURS.blue + 10, padding: 8, borderRadius: 100 }} />
                        </View>
                        <Text style={{ fontSize: 12, color: COLOURS.black, fontWeight: '400', letterSpacing: 1, opacity: 0.5, lineHeight: 20, maxWidth: '85%', maxHeight: 44, marginBottom: 18 }}>
                            {product.description}
                        </Text>
                        <View style={{ borderBottomColor: COLOURS.backgroundLight, borderBottomWidth: 1, marginBottom: 15 }}></View>
                        <View style={{ paddingHorizontal: 16 }}>
                            <Text style={{ fontSize: 18, fontWeight: '500', maxWidth: '85%', color: COLOURS.black, marginBottom: 4}}>
                                &#36;{product.productPrice}
                            </Text>
                        </View>
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 10, height: '8%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ width: '86%', height: '90%', backgroundColor: COLOURS.blue, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => product.id ? addToCart(product.id) : null}>
                            <Text style={{ fontSize: 12, fontWeight: '500', letterSpacing: 1, color: COLOURS.white, textTransform: 'uppercase' }}>Add to cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProductInfo; 