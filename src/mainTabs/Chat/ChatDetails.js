import { ScrollView, StyleSheet, Text, TextInput, Image, TouchableOpacity, Alert, View, Dimensions } from 'react-native';
import React,{useState,useEffect,useRef} from 'react';
import ChatInnerItem from '../../../components/Chat/ChatInnerItem';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client'
import moment from 'moment';
import {BASE_URL} from '@env'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
var socket, selectedChatCompare;
import StackHeader from '../../../components/StackHeader';
import { useNavigation } from '@react-navigation/native';

const ChatDetails = ({route}) => {
  const navigation=useNavigation()
  const {data,group} = route.params;
  const scrollViewRef = useRef()
  const authState = useSelector((state)=> state.authState)
  const [video, setVideo] = useState('')
  const [messages, setMessages] = useState(data);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const launchCameraPhoto = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.openPicker({
      mediaType: 'photo',
      // multiple: true
    }).then(img => {
      console.log(img);
      setVideo(img);
      sendMessage(img);
    });

  }

  useEffect(() => {
    socket = io(BASE_URL);
    socket.emit("setup", authState);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [authState,BASE_URL]);
  useEffect(() => {
    selectedChatCompare = authState;
  }, [authState]);
  useEffect(() => {
    socket.on('message recieved', newMessageRecieved => {
      setMessages([...messages, newMessageRecieved]);
    });
  }, [messages]);
  const typingHandler = (event) => {
    setNewMessage(event);
    console.log(event)
  };
  const sendMessage = async (video) => {
    if (newMessage) {
      socket.emit("stop typing", group._id);
      setLoading(true)
      try {
        await axios.post(
          BASE_URL +
          `/api/groupChats/${group._id}/user/${authState.id}/message`,
          {
           text:newMessage
          },
        ).then(async (response) => {
          if (response.status == 201) {
            await socket.emit("new message", response.data);
            setMessages([...messages,response.data]);
            setLoading(false)
            setNewMessage('')
          }
        })


      } catch (error) {
        console.log("error at send message", error.response.status)
        Alert.alert("error of send message",error.message)
      }
    }
  };
  return (
    <View style={styles.container}>
       <OrientationLoadingOverlay
        visible={loading}
        color="white"
        indicatorSize="large"
        messageFontSize={24}
      />
      <StackHeader
        headerImage={true}
        headerIcon={true}
        headerName={group?.name}
        rightIcon={false}
      />
      <ScrollView 
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        <View style={{marginBottom:'15%'}}> 
        {messages.map(item => {
          return (
            <ChatInnerItem
              navigation={navigation}
              send={item?.sender?._id?item?.sender._id:item?.sender}
              pic={
                item?.sender?.profilePicture===undefined
                  ?
                   'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'
                  : item?.user?.profilePicture}
              username={item?.sender?.name?item?.sender?.name:authState.name}
              message={item?.text}
              time={moment(item?.timestamp).format("hh:mm a")}
            />
           );
        })} 
        </View>
      </ScrollView>
      <View>
        <View style={styles.inputView}>
          <TextInput style={styles.input}
            placeholderTextColor='#000'
            placeholder='Type here'
            value={newMessage}
            // onChangeText={(e) => setNewMessage(e)}
            onChangeText={(e) => typingHandler(e)}
            // onSubmitEditing={sendMessage}
          />
          {/* <TouchableOpacity style={styles.emoticon} onPress={() => launchCameraPhoto()}>
            <MaterialIcons
              name='add-a-photo' size={24} color={'#000'}
              style={{ height: 27, width: 27, marginLeft: '1%', }}
            />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.postButton} onPress={()=>sendMessage()}>
          <Text style={styles.postButtonText}>send</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatDetails;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  input: {
    height: 45,
    borderRadius: 20,
    width: windowWidth / 1.4,
    marginLeft: '3%',
    marginBottom: '3%',
    marginTop: '3%',
    color: '#000',
    alignSelf: 'center',
  },
  inputView: {
    flexDirection: 'row',
    height: 50,
    alignSelf: 'center',
    // justifyContent: 'center',
    width: windowWidth / 1.1,
    // borderWidth: 1,
    bottom: 10,
    borderRadius: 10,
    // borderColor: '#5d6afe',
    backgroundColor: '#EDF0FE',
    position: 'absolute',
  },
  emoticon: {
    // marginLeft: '1%',
    // marginTop: '3%',
    width: 26,
    height: 26,
    alignItems: 'flex-end',
    alignSelf:'center',
    justifyContent: 'flex-end',
    borderRadius: 100 / 2,
  },
  postButton:{
    alignSelf: 'center',
    marginLeft:'2%'
  },
  postButtonText:{
    fontSize:14,
    color:'blue',
    fontWeight:'600'
  }
});
