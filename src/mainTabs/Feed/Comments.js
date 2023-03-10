import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BASE_URL} from '@env'
import axios from 'axios';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay'
import CommentCompo from '../../../components/Home/CommentCompo';
import io from 'socket.io-client';
var socket, selectedChatCompare;

const Comments = ({route}) => {
  const {id,comments} = route.params
  const scrollViewRef = useRef()
  const [comment, setComment] = useState(comments);
  const postState = useSelector((state)=>state.postState)
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const authState = useSelector(state => state.authState);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    socket = io(BASE_URL)
    socket.emit('setup', authState);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
  }, [authState,BASE_URL]);
  useEffect(() => {
    selectedChatCompare = authState;
  }, [authState]);
  useEffect(() => {
    socket.on('message recieved', newMessageRecieved => {
      setComment([...comment, newMessageRecieved]);
    });
  }, [comment]);
  const typingHandler = event => {
    setNewComment(event);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', authState.id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', authState.id);
        setTyping(false);
      }
    }, timerLength);
  };
  var commentData = {
    name: authState.name,
    _id: authState.id,
  };
  const sendMessage = async id => {
    if (newComment) {
      setLoading(true)
      socket.emit('stop typing', authState.id);
      try {
        await axios
          .put(BASE_URL + `/api/post/${id}/user/${authState.id}/comment`, {
            content: newComment,
          })
          .then(async response => {
            if (response.status == 200) {
              await socket.emit('comments', {
                comment: newComment,
                user: commentData,
              });
              // console.log('comment log', response.data.comments);
              setComment(response.data.comments);
              setNewComment('')
              setLoading(false)
            }
          });
        } catch (error) {
          console.log(
            'error at send message',
            // error.response.data.msg,
            error.message,
            );
            
            Alert.alert('error of send message');
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
      <ScrollView  ref={scrollViewRef}
    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
        <View style={{marginBottom:'15%'}}>
        {comment.map(item => {
          return (
              <CommentCompo
                send={item?.user?._id?item?.user?._id:item.user}
                pic={{
                  uri:
                    item?.user?.profilePicture===undefined
                      ?
                       'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'
                      : item?.user?.profilePicture,
                }}
                username={item?.user?.name?item?.user?.name:authState.name}
                // username={'Andalib'}
                message={item?.content?item?.content:'waps try kro'}
                // message='Hello brother'
              />
              );
            })}
            </View>
      </ScrollView>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#000"
          placeholder="Type here"
          value={newComment}
          onChangeText={e => typingHandler(e)}
          // onKeyPress={sendMessage}
        />
        <TouchableOpacity style={styles.postButton} onPress={()=>sendMessage(id)}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;

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
  postButton:{
    alignSelf: 'center'
  },
  postButtonText:{
    fontSize:14,
    color:'blue',
    fontWeight:'600'
  }
});
