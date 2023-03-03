import { ScrollView, StyleSheet, Text, TextInput, Image, TouchableOpacity, Alert, View, Dimensions } from 'react-native';
import React,{useState} from 'react';
import ChatInnerItem from '../../../components/Chat/ChatInnerItem';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client'
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
var socket, selectedChatCompare;
import StackHeader from '../../../components/StackHeader';
import { useNavigation } from '@react-navigation/native';

const ChatDetails = ({route}) => {
  const navigation=useNavigation()
  const {data} = route.params;
  const chatState = useSelector((state) => state.chatState)
  const dispatch = useDispatch()
  const authState = useSelector((state)=> state.authState)
  const [video, setVideo] = useState('')
  const [messages, setMessages] = useState([]);
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
      // sendMessage(video);
    });

  }

// let g = group.users.map((i)=>i.userId)
// const itemToRemove = authId
// const originalArray = g
// const newArray = originalArray.filter(item => item !== itemToRemove)

  const getMessagesByChatId = async () => {
    // if (!selectedChat) return;

    try {

      setLoading(true);
      const response = await axios.get(
       BASE_URL +
        `/api/message/chat/${group.chatId}?userId=${authId}`,
      );
      // console.log("res", response.data)
      setMessages(response.data);
      setLoading(false);

      socket.emit("join chat", group.chatId);
    } catch (error) {
      console.log("err", error.message)
      Alert.alert("error")
    }
  };
  // useEffect(() => {
  //   socket = io(BASE_URL);
  //   socket.emit("setup", authState);
  //   socket.on("connected", () => setSocketConnected(true));
  //   socket.on("typing", () => setIsTyping(true));
  //   socket.on("stop typing", () => setIsTyping(false));
  // }, []);
  // useEffect(() => {
  //   dispatch(getGroupDetailsbyChatId(group.chatId));
  // }, [dispatch,group.chatId]);
  // useEffect(() => {
  //   getMessagesByChatId()
  // }, [group.chatId])
  // useEffect(() => {
  //   socket.on("message recieved", (newMessageRecieved) => {
  //     if (
  //       !selectedChatCompare || // if chat is not selected or doesn't match current chat
  //       selectedChatCompare.chatId !== newMessageRecieved.chatId
  //     ) {
  //       if (!notification.includes(newMessageRecieved)) {
  //         setNotification([newMessageRecieved, ...notification]);
  //         setFetchAgain(!fetchAgain);
  //       }
  //     }
  //     else {
  //       setMessages([...messages, newMessageRecieved]);
  //     }
  //   });
  // }, []);
  // const typingHandler = (event) => {
  //   setNewMessage(event);
  //   console.log(event)
  //   if (!socketConnected) return;

  //   if (!typing) {
  //     setTyping(true);
  //     socket.emit("typing", group.chatId);
  //   }
  //   let lastTypingTime = new Date().getTime();
  //   var timerLength = 3000;
  //   setTimeout(() => {
  //     var timeNow = new Date().getTime();
  //     var timeDiff = timeNow - lastTypingTime;
  //     if (timeDiff >= timerLength && typing) {
  //       socket.emit("stop typing", group.chatId);
  //       setTyping(false);
  //     }
  //   }, timerLength);
  // };
  // const sendMessage = async (video) => {
  //   if (newMessage) {
  //     socket.emit("stop typing", group.chatId);
  //     try {
  //       // console.log('send to group', newArray);
  //       setNewMessage("");
  //       await axios.post(
  //         BASE_URL +
  //         `/api/message/chat/${group.chatId}/user/${authId}`,
  //         {
  //           content: newMessage,
  //           createdAt: moment().toISOString(),
  //           // firstName: user.firstName,
  //           // lastName: user.lastName,
  //           name: authState.name,
  //           profilePicture: authState.profilePicture,
  //           sentTo:newArray
  //         },
  //       ).then(async (response) => {
  //         if (response.status == 200) {
  //           // console.log("re", messages)
  //           // console.log(response.data)
  //           await socket.emit("new message", response.data);

  //           // await messages.push(response.data)
  //           setMessages([...messages, response.data]);

  //         }
  //       })


  //     } catch (error) {
  //       console.log("error at send message", error.response.status)
  //       Alert.alert("error of send message")
  //     }
  //   }
  //   else if (video) {
  //     // socket.emit('stop typing', group.chatId);
  //     // console.log("before try")
  //     try {
  //       // console.log('form data',formData);
  //       setNewMessage('');
  //       const formData = new FormData();
  //       // video.forEach((item, i) => {
  //       formData.append('content', {
  //         uri: video.path,
  //         type: video.mime,
  //         name: video.filename || `filename${video.size}.${video.path.slice(-3)}`,
  //       });
  //       // });
  //       formData.append('createdAt', moment().toISOString())
  //       formData.append('profilePicture', authState.profilePicture)
  //       formData.append('name', authState.name)
  //       newArray.forEach(
  //         newArray => formData.append('sentTo[]', newArray)
  //         )
  //       // formData.append('lastName', user.lastName)
  //       await axios
  //         .post(BASE_URL + `/api/message/chat/${group.chatId}/user/${authId}`,
  //           formData,
  //           {
  //             headers: {
  //               Accept: 'application/json',
  //               'Content-Type': 'multipart/form-data'
  //             }
  //           }
  //         )
  //         .then(async response => {
  //           // console.log("res", response)
  //           if (response.status == 200) {
  //             // console.log("re", messages)
  //             // console.log("video res",response.data);
  //             await socket.emit('new message', response.data);

  //             // await messages.push(response.data)
  //             setMessages([...messages, response.data]);
  //           }
  //         });
  //     } catch (error) {
  //       console.log('error at send message', error);
  //       Alert.alert('error of send message');
  //     }
  //   }
  // };
  return (
    <View style={styles.container}>
      <StackHeader
        headerImage={true}
        headerIcon={true}
        headerName={data.placeName}
        rightIcon={false}
      />
      <ScrollView>
        {/* {messages.map(item => {
          return ( */}
            <ChatInnerItem
              navigation={navigation}
              send={1}
              pic={'https://assets.telegraphindia.com/telegraph/2021/Jun/1622577021_02metmall_4col.jpg'}
              username={'Andalib'}
              message={'hey bro'}
              time={moment().format("hh:mm a")}
            />
          {/* );
        })} */}
      </ScrollView>
      <View>
        <View style={styles.inputView}>
          <TextInput style={styles.input}
            placeholderTextColor='#000'
            placeholder='Type here'
            value={newMessage}
            onChangeText={(e) => setNewMessage(e)}
            // onChangeText={(e) => typingHandler(e)}
            // onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.emoticon} onPress={() => launchCameraPhoto()}>
            <MaterialIcons
              name='add-a-photo' size={24} color={'#000'}
              style={{ height: 27, width: 27, marginTop: '19%', marginLeft: '7%', }}
            />
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
    width: windowWidth / 1.33,
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
});
