import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {BASE_URL} from '@env'
import CommentCompo from '../../../components/Home/CommentCompo';
import io from 'socket.io-client';
var socket, selectedChatCompare;

const Comments = () => {
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const authState = useSelector(state => state.authState);
  const [modalVisible, setModalVisible] = useState(false);
  const getCommentByPostId = async () => {
    try {
      setLoading(true);
      console.log('id', id);
      const response = await axios.get(
        BASE_URL + `/api/post-comment/post/${id}`,
      );
      console.log('yo yo', response.data);
      setComment(response.data);
      setLoading(false);

      socket.emit('join chat', authState.userId);
    } catch (error) {
      console.log('err', error.message);
      Alert.alert('error');
    }
  };
  // useEffect(() => {
  //   // socket = io(BASE_URL);
  //   socket.emit('setup', authState);
  //   socket.on('connected', () => setSocketConnected(true));
  //   socket.on('typing', () => setIsTyping(true));
  //   socket.on('stop typing', () => setIsTyping(false));
  // }, []);
  // useEffect(() => {
  //   // getCommentByPostId();
  //   selectedChatCompare = authState;
  // }, [authState.userId]);
  // useEffect(() => {
  //   console.log('new msg', selectedChatCompare);
  //   socket.on('message recieved', newMessageRecieved => {
  //     setComment([...comment, newMessageRecieved]);
  //     console.log('new msg', newMessageRecieved);
  //     console.log('new msg inside ', newMessageRecieved);
  //   });
  // }, []);
  var userId = authState.userId;
  const typingHandler = event => {
    setNewComment(event);
    console.log(event);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', authState.userId);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', authState.userId);
        setTyping(false);
      }
    }, timerLength);
  };
  var commentData = {
    name: authState.name,
    // lastName: user.lastName,
    userId: authState.userId,
  };
  const sendMessage = async event => {
    if (newComment) {
      socket.emit('stop typing', authState.userId);
      try {
        setNewComment('');
        console.log('cu', id);
        await axios
          .post(BASE_URL + `/api/post-comment`, {
            postId: id,
            userId: authState.userId,
            comment: newComment,
          })
          .then(async response => {
            if (response.status == 200) {
              await socket.emit('comment', {
                userId: userId,
                comment: newComment,
                users: commentData,
              });
              console.log('comment log', response.data);
              setComment([...comment, response.data]);
            }
          });
      } catch (error) {
        console.log(
          'error at send message',
          error.response.data.msg,
          error.response,
        );
        Alert.alert('error of send message');
      }
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* {comment.map(item => {
          return (
            <> */}
              <CommentCompo
                send={1}
                pic={{
                  uri:
                    // item?.users.profilePicture == ''
                    //   ?
                       'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'
                      // : item?.users.profilePicture,
                }}
                // username={item.users.name}
                username={'Andalib'}
                // message={item.comment}
                message='Hello brother'
              />
            {/* </>
          );
        })} */}
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
        <TouchableOpacity style={styles.postButton}>
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
