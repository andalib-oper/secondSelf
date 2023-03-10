import {StyleSheet, Text, View, Dimensions, Image,TouchableOpacity} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ChatFlatlist = ({data}) => {
  const navigation  = useNavigation()
  return (
    <>
    <TouchableOpacity style={styles.conatiner} onPress={()=>{navigation.navigate('ChatDetails',{data:data.messages.map((i)=>i),group:data})}}>
      <View style={styles.innerView}>
        <Image source={{uri: data?.placeImg?data?.placeImage:'https://st3.depositphotos.com/9987990/16313/i/600/depositphotos_163131326-stock-photo-local-seo-marketing-banner-icon.jpg'}} style={styles.placeImage} />
        <View style={styles.chatDatailsView}>
        <Text style={styles.placeText}>{data?.name}</Text>
        {/* <Text style={styles.placeText}>{data?.messages[0]?.text}</Text> */}
        </View>
        {/* {data.seen ? null : (
          <View style={styles.seenView}>
            <Text style={styles.seenText}>{data?.unseenMessage}</Text>
          </View>
        )} */}
      </View>
    </TouchableOpacity>
    </>
  );
};

export default ChatFlatlist;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  conatiner: {
    width: windowWidth / 1,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c4c4c4',
    padding: 10,
  },
  innerView: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  placeImage: {
    height: 40,
    width: 40,
    borderRadius: 100 / 2,
    alignSelf: 'flex-start',
  },
  chatDatailsView:{
    width:'75%',
    marginLeft: '4%',
    justifyContent:'center'
  },
  placeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'flex-start',
  },
  seenView: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    borderRadius: 100 / 2,
    backgroundColor: '#fff',
    justifyContent:'center'
  },
  seenText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center'
  },
});
