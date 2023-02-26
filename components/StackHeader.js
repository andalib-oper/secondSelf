import { Dimensions, Pressable, StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import OptionsMenu from "react-native-option-menu";

const StackHeader = (prop) => {
    const navigation = useNavigation()
    const myIcon = (<Feather name="more-vertical" size={24} color="#000" />)
    const addPro = () => {
        console.log("first")
        navigation.navigate('addnew')
    }
    return (
        <View>
            <View style={styles.header}>
                <View>
                    {prop.headerImage?
                    <Image source={require('../assets/Images/png/logo-no-background.png')} style={styles.image}/>
                    :
                    null
                }
                </View>
                <View style={styles.nameView}>
                    <Text {...prop} style={styles.name}>{prop.headerName}</Text>
                </View>
                <TouchableOpacity style={styles.iconFilter} onPress={prop.filterNavigation}>
                    {prop.rightIcon?
                    <AntDesign name={prop.filterName} size={prop.filterSize} color={prop.filterColor} />
                    :
                    null
                }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default StackHeader

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    header: {
        width: width / 1,
        backgroundColor: '#fff',
        height: height / 13,
        elevation: 5,
        flexDirection: 'row'
    },
    icon: {
        marginTop: '4%',
        marginLeft: '3%',
        width: '8%'
    },
    nameView: {
        alignSelf: 'center',
        marginLeft: '3%',
        width:'73%'
    },
    name: {
        fontSize: 20,
        color: 'black',
        fontWeight: '600'
    },
    iconFilter: {
       alignSelf: 'center'
    },
    iconMenu: {
        margin: '3%'
    },
    image: {
        height:45,
        width:45,
        marginLeft:10,
        marginTop: 5
      },
      addButton:{
        marginRight: '5%'
      }
})
