import {StyleSheet, Text, View, TouchableOpacity,Dimensions} from 'react-native';
import React from 'react';

const JoiningActCompo = props => {
  return (
    <View>
      {props.join ? (
        <TouchableOpacity style={styles.JoinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default JoiningActCompo;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  JoinButton: {
    width: windowWidth/7,
    padding: 10,
    alignSelf: 'flex-end',
    borderRadius:10,
    backgroundColor: '#000',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign:'center',
    fontSize: 14,
  },
});
