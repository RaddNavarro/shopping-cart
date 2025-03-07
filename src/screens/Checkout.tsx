import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, ToastAndroid } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { Props } from '../navigation/props'
import styles from "../styles/styles";
import { COLOURS, Products } from "../components/database/Database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';  


const Checkout: React.FC<Props> = ({ navigation }) => {
    
    const [product, setProduct] = useState();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB()
        });

        return unsubscribe;
    }, [navigation])

    const getDataFromDB = async () => {
        let items = await AsyncStorage.getItem('cartItems')
        items = JSON.parse(items);
        let productData = [];
        
        if (items) {
            console.log("items got for checkout")
            Products.forEach(data => {
                if (items.includes(data.id)) {
                    productData.push(data)
                    return
                } 
            })

            setProduct(productData)
            getTotal(productData)
        } else {
            
            setProduct(false)
            getTotal(false)
        }
        
        
    };

    const getTotal = productData => {
        let total = 0;
        for (let index = 0; index < productData.length; index++) {
            let productPrice = productData[index].productPrice * productData[index].quantity
            total = total + productPrice

        }
        setTotal(total.toFixed(2))
    }

    const removeItemFromCart = async id => {
        let itemArray = await AsyncStorage.getItem('cartItems')
        itemArray = JSON.parse(itemArray)

        let productData = []
        if (itemArray) {
            let array = itemArray

            

            for (let index = 0; index < array.length; index++) {
                if (array[index] == id) {
                    array.splice(index, 1);
                }
                
                await AsyncStorage.setItem('cartItems', JSON.stringify(array))
                getDataFromDB();
            }

            product.forEach(data => {
                if (data.id === id) {
                    data.quantity = 1
                    productData.push(data)
                    console.log(productData)
                    return
                } 
            })
        }
    }

    const checkout = async () => {
        let itemArray = await AsyncStorage.getItem('cartItems')
        itemArray = JSON.parse(itemArray)

        let productData = []
        try {
            console.log(itemArray?.length)
            if (itemArray?.length > 0){
                await AsyncStorage.removeItem('cartItems')
                product.forEach(data => {
  
                    data.quantity = 1
                    productData.push(data)
                    console.log(productData)
                    return
                
                })
              
                getDataFromDB();
            ToastAndroid.show("Successful Transaction!", ToastAndroid.SHORT)

            navigation.navigate('Home')
            } else {
                ToastAndroid.show("Add more items to your cart!", ToastAndroid.SHORT)
            }

        
            

        } catch (error) {
            return error
        }
        
        
        
    }

    const renderProducts = (data, index) => {

        
        return (
            <TouchableOpacity key={data.key} style={{ width: '100%', height: 100, marginVertical: 6, flexDirection: 'row', alignItems: 'center',  }}>
                <View style={{ width: '30%', height: 100, padding: 14, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOURS.backgroundLight, borderRadius: 10, marginRight: 22 }}>
                    <Image source={data.productImage} style={{ width: '100%', height: '100%', resizeMode: 'contain' }}/>
                </View>
                <View style={{ flex: 1, height: '100%', justifyContent: 'space-around' }}>
                    <View>
                        <Text style={{ fontSize: 14, maxWidth: '100%', color: COLOURS.black, fontWeight: '600', letterSpacing: 1 }}>{data.productName}</Text>
                        <View style={{ marginTop: 4, flexDirection: 'column', alignItems: 'flex-start', opacity: 0.6, marginBottom: 4 }}>
                            <Text style={{ fontSize: 14, fontWeight: '400', maxWidth: '85%', marginRight: 4 }}>
                            &#36;{data.productPrice}
                            </Text>
                            <View>
                            <Text>
                                Quantity: {data.quantity}
                            </Text>
                            </View>
                            
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                 
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ borderRadius: 100, marginRight: 20, padding: 4, borderWidth: 1, borderColor: COLOURS.backgroundMedium, opacity: 0.5 }}>
                            <MaterialCommunityIcons name="minus" style={{ fontSize: 16, color: COLOURS.backgroundDark }}/>
                        </View>
                        <Text>1</Text>
                        <View style={{ borderRadius: 100, marginLeft: 20, padding: 4, borderWidth: 1, borderColor: COLOURS.backgroundMedium, opacity: 0.5 }}>
                            <MaterialCommunityIcons name="plus" style={{ fontSize: 16, color: COLOURS.backgroundDark }}/>
                        </View>
                    </View> */}
                    <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
                        <MaterialCommunityIcons name="delete-outline" style={{ fontSize: 16, color: COLOURS.backgroundDark, backgroundColor: COLOURS.backgroundLight, padding: 8, borderRadius: 100 }}/>
                    </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
            
        )
    }



    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: COLOURS.white, position: 'relative' }}>
            <ScrollView>
                <View style={{ width: '100%', flexDirection: 'row', paddingTop: 16, paddingHorizontal: 16, justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="chevron-left" style={{ fontSize: 18, color: COLOURS.backgroundDark, padding: 12, backgroundColor: COLOURS.backgroundLight, borderRadius: 12 }}/>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 14, color: COLOURS.black, fontWeight: '400' }}>
                        Order Details
                    </Text>
                    <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <MaterialCommunityIcons name="home" style={styles.icon_style2}/>
                    </TouchableOpacity>
                    </View>
                </View>
                <Text style={{ fontSize: 20, color: COLOURS.black, fontWeight: '500', letterSpacing: 1, paddingTop: 20, paddingLeft: 16, marginBottom: 10 }}>
                    My Cart
                </Text>
                <View style={{ paddingHorizontal: 16 }}>
                    {product ? product.map(renderProducts) : <Text>No items in cart</Text>}
                </View>
                <View>
                    <View style={{ paddingHorizontal: 16, marginTop: 40, marginBottom: 80 }}>
                        <Text style={{ fontSize: 18, color: COLOURS.black, fontWeight: '500', letterSpacing: 1, marginBottom: 20 }}>
                            Order Info
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={{ fontSize: 12, fontWeight: 400, maxWidth: '80%', color: COLOURS.black, opacity: 0.5 }}>
                                Total
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: COLOURS.black }}>
                            &#36;{total}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

             <View style={{ position: 'absolute', bottom: 10, height: '8%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ width: '86%', height: '90%', backgroundColor: COLOURS.blue, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => (total >= 0 ? checkout() : null)}>
                            <Text style={{ fontSize: 12, fontWeight: '500', letterSpacing: 1, color: COLOURS.white, textTransform: 'uppercase' }}>CHECKOUT (&#36;{total})</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Checkout;