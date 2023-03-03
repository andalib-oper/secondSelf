import { FlatList, StyleSheet, Text, View,Dimensions,ScrollView } from 'react-native'
import React,{useState} from 'react'
import SearchBar from "react-native-dynamic-search-bar";
import StackHeader from '../../../components/StackHeader'
import ChatData from '../../../assets/MockData/ChatData'
import ChatFlatlist from '../../../components/Chat/ChatFlatlist'

const Chat = () => {
  const [filteredData,setFilteredData]=useState(ChatData)
  const [ searchText,setSearchText]=useState('')
  const search = (text) =>{
    if (text) {
      const newData = ChatData.filter(function (item) {
        const itemData = item.placeName
          ? item.placeName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchText(text);
    } else {
      setFilteredData(ChatData);
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
      onPress={() => alert("onPress")}
      onChangeText={(text) => search(text)}
      />
      </View>
      <ScrollView>
      <View>
        <FlatList
         style={styles.flatlist}
         data={filteredData}
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