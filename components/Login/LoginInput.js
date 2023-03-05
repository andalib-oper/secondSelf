import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LoginInput = props => {
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
      {props.visible ? (
        <AntDesign
          name={props.name}
          onPress={props.onPress}
          color="#fff"
          style={props.visibleStyle}
          size={24}
        />
      ) : null}
      {!props.inputIsValid && props.inputIsTouched && (
        <Text style={styles.error}>{props.error}</Text>
      )}
    </View>
  );
};

export default LoginInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    margin: 10,
  },
  error:{
    color:'red',
    alignSelf:'center',
    margin:3,
    fontSize:14,
    fontWeight:'500'
  }
});
