import { StyleSheet, Text, View,TextInput,Dimensions } from 'react-native'
import React from 'react'

const ProfileInput = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={props.onChangeText}
        editable={props.editable}
        style={props.style}
        secureTextEntry={props.secureTextEntry}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        keyboardType={props.keyboardType}
        value={props.value}
      />
    </View>
  )
}

export default ProfileInput
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        alignSelf:'flex-start',
        marginLeft:"5%",
        marginBottom:'2%',
        width:windowWidth/1.1
      },
})