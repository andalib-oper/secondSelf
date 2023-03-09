import { FlatList, StyleSheet, Text, View,Dimensions,ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import SearchBar from "react-native-dynamic-search-bar";
import StackHeader from '../../../components/StackHeader'
import ChatData from '../../../assets/MockData/ChatData'
import ChatFlatlist from '../../../components/Chat/ChatFlatlist'
import { useDispatch, useSelector } from 'react-redux';
import { filtering, getChatByUserId } from '../../../redux/Chat/actions';

const Chat = () => {
  const dispatch=useDispatch()
  const chatState = useSelector((state)=>state.chatState)
  const authState = useSelector((state)=>state.authState)
  const [ searchText,setSearchText]=useState('')
  const [filteredData,setFilteredData]=useState(chatState.chats)
  useEffect(()=>{
     dispatch(getChatByUserId(authState.id))
  },[authState.id])
  const search = (text) =>{
    if (text) {
      const newData = chatState.chats.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      dispatch(filtering(newData));
      setSearchText(text);
    } else {
      dispatch(filtering(chatState.chats));
      setSearchText(text);
    }
  }
  return (
    <View style={styles.container}>
      <StackHeader
        headerName="Chat"
        rightIcon={false}
      />
      <View style={styles.searchbarView}>
      <SearchBar
      style={styles.searchbar}
      placeholder="Search here"
      onClearPress={()=>{setSearchText(''),dispatch(getChatByUserId(authState.id))}}
      onChangeText={(text) => search(text)}
      />
      </View>
      <ScrollView>
      <View>
        <FlatList
         style={styles.flatlist}
         data={chatState.filtered}
         renderItem={({item}) => <ChatFlatlist data={item}/>}
         keyExtractor={item => item.id}
        />
      </View>
      </ScrollView>
    </View>
  )
}

export default Chat
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#000'
  },
  searchbarView:{
    margin:'5%'
  },
  searchbar:{
    width:windowWidth/1.1
  },
  flatlist: {
    padding: 10,
    width: windowWidth / 1,
  },
})