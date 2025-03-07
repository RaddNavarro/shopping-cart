import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, ScrollView, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Props } from '../navigation/props'
import styles from "../styles/styles";
import { COLOURS, Products } from "../components/database/Database";
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';  

// const Stack = createNativeStackNavigator();

const Home: React.FC<Props> = ({ navigation }) => {

    const [maleProducts, setMaleProducts] = useState([]);
    const [femaleProducts, setFemaleProducts] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB()
        });

        return unsubscribe;
    }, [navigation])

    const getDataFromDB = () => {
        let maleProductList = [];
        let femaleProductList = [];

        for (let index = 0; index < Products.length; index++) {
            if (Products[index].category == 'men') {
                maleProductList.push(Products[index]);
            } else if (Products[index].category == 'women') {
                femaleProductList.push(Products[index]);
            }
            
        }
        
        setMaleProducts(maleProductList)
        setFemaleProducts(femaleProductList)
    }

    const ProductsCard = ({data}) => {

        
        return (
            <TouchableOpacity style={{ width: '40%', marginVertical: 14}} onPress={() => navigation.navigate('ProductInfo', {productID: data.id})}>
                <View style={{ width: '100%', height: 100, borderRadius: 10, backgroundColor: COLOURS.backgroundLight, position: 'relative', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                    <Image source={data.productImage} style={{
                        width: '80%', height: '80%', resizeMode: 'contain'
                    }} />
                </View>
                <Text style={{ fontSize: 12, color: COLOURS.black, fontWeight: '600', marginBottom: 2 }}>
                    {data.productName}
                </Text>
                {data.category == 'women' ? null : null}
                <Text>
                    &#36;{data.productPrice}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.main_home_container}>
            <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content"/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.inner_home_container}>
                    <TouchableOpacity>
                        <Entypo name="shopping-bag" style={styles.icon_style}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <MaterialCommunityIcons name="cart" style={styles.icon_style2}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.inner_home_container2}>
                    <Text style={styles.shop_title}>
                        Tom's Shoes
                    </Text>
                    <Text style={styles.shop_subtitle}>
                        This shop offers shoe products for men and women
                    </Text>
                </View>
                <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: COLOURS.black, fontWeight: '500', letterSpacing: 1 }} >Men's Shoes</Text>
                        <Text style={{ fontSize: 14, color: COLOURS.black, fontWeight: '400', opacity: 0.5, marginLeft: 10 }} >41</Text>
                    </View>
                    <Text style={{ fontSize: 14, color: COLOURS.blue, fontWeight: '400' }}>
                        See All
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {
                        maleProducts.map((data) => {
                            return <ProductsCard data={data} key={data.id}/>
                        })
                    }
                </View>
                <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: COLOURS.black, fontWeight: '500', letterSpacing: 1 }} >Women's Shoes</Text>
                        <Text style={{ fontSize: 14, color: COLOURS.black, fontWeight: '400', opacity: 0.5, marginLeft: 10 }} >41</Text>
                    </View>
                    <Text style={{ fontSize: 14, color: COLOURS.blue, fontWeight: '400' }}>
                        See All
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {
                        femaleProducts.map((data) => {
                            return <ProductsCard data={data} key={data.id}/>
                        })
                    }
                </View>
            </ScrollView>

        </View> 
    )
}

export default Home;