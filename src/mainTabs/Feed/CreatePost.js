import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import {useDispatch, useSelector} from 'react-redux';
import {createPostByUserId} from '../../../redux/Post/actions';

const CreatePost = ({navigation}) => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.authState);
  const [text, setText] = useState('');
  const [content, setContent] = useState('');
  const [contentPic, setContentPic] = useState('');
  const [Location, setLocation] = useState('');
  const launchLibrary = () => {
    ImagePicker.openPicker({
      multiple: false,
    }).then(image => {
      // setContentPic(image.path);
      setContent(image);
      ImgToBase64.getBase64String(image.path)
      .then(base64String => setContentPic(`data:image/jpeg;base64,${base64String}`))
      .catch(err => console.log(err));
    });
  };
  const onSubmit = () => {
    dispatch(createPostByUserId(authState?.id, text, contentPic, Location));
    setLocation('');
    setText('');
    setContent('');
    setContentPic('');
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* location view */}
        <View>
          <Text style={styles.headerText}>Location</Text>
          <TextInput
            style={styles.input}
            value={Location}
            onChangeText={text => setLocation(text)}
            keyboardType={'default'}
            placeholder="PLace You want to visit"
            placeholderTextColor={'grey'}
          />
        </View>
        {/* description section */}
        <View>
          <Text style={styles.headerText}>Description</Text>
          <TextInput
            style={[styles.input, {height: 100}]}
            value={text}
            onChangeText={text => setText(text)}
            multiline={true}
            textAlignVertical={'top'}
            keyboardType={'default'}
            placeholder="Description of your journey"
            placeholderTextColor={'grey'}
          />
        </View>
        {/* image section */}
        <View>
          <Text style={styles.headerText}>Image For Post</Text>
          <TouchableOpacity
            style={[
              styles.input,
              {height: windowHeight / 3, justifyContent: 'center'},
            ]}
            onPress={() => launchLibrary()}>
            {contentPic !==''? (
              <Image
                source={{uri: contentPic}}
                style={[
                  styles.input,
                  {height: windowHeight / 3, justifyContent: 'center',marginTop:0,width:'100%',marginLeft:0},
                ]}
              />
            ) : (
              <Text style={styles.text}>Click Here To Add Image</Text>
            )}
          </TouchableOpacity>
        </View>
        {/* create button */}
        <TouchableOpacity
          onPress={() => {
            onSubmit();
          }}
          style={styles.createActivityButton}>
          <Text style={styles.createActivityText}>Create Activity</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreatePost;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: '5%',
  },
  text: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginTop: '4%',
    width: '90%',
    borderRadius: 10,
    color: 'grey',
    marginLeft: '5%',
    marginTop: '5%',
    backgroundColor: '#fff',
    padding: 10,
  },
  createActivityButton: {
    alignSelf: 'center',
    width: windowWidth / 1.2,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: '10%',
    marginBottom: '2%',
    borderRadius: 10,
  },
  createActivityText: {
    fontSize: 16,
    padding: 10,
    alignSelf: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignSelf: 'center',
    width: windowWidth / 1.1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    height: '50%',
    marginTop: '4%',
  },
});
