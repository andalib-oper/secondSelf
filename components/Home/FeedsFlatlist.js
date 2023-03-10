import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SliderBox} from 'react-native-image-slider-box';
import {useDispatch, useSelector} from 'react-redux';
import {like} from '../../redux/Feeds/actions';
import {useNavigation} from '@react-navigation/native';
import {postDislike, postLike} from '../../redux/Post/actions';

const FeedsFlatlist = ({data, city}) => {
  const navigation = useNavigation();
  const authState = useSelector(state => state.authState);
  const postState = useSelector(state => state.postState);
  const dispatch = useDispatch();
  const feedState = useSelector(state => state.feedState);
  const likeFunc = (postId, authId) => {
    if (findId.includes(authState.id)) {
      dispatch(postDislike(postId, authId, city));
    } else {
      dispatch(postLike(postId, authId, city));
    }
  };
  const findId = data.likes.map((i)=>i._id)
  return (
        <View style={styles.container}>
          <View style={styles.profileDetailsView}>
            <Image
              style={styles.profileImage}
              source={{uri: data?.userId?.profilePicture}}
            />
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.profileName}>{data?.userId?.name}</Text>
              <Text style={styles.profileName}>{data?.city}</Text>
            </View>
          </View>
          <View>
            <Image source={{uri: data?.content}} style={styles.sliderBoxView} />
          </View>
          <View style={styles.optionView}>
            <TouchableOpacity
              onPress={() => {
                likeFunc(data._id, authState.id);
              }}
              style={styles.likeStyle}>
              <AntDesign
                name={findId.includes(authState.id) ? 'heart' : 'hearto'}
                size={24}
                color={findId.includes(authState.id) ? 'red' : '#fff'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Comments', {id: data._id,comments: data?.comments.map((i)=>i)});
              }}
              style={styles.likeStyle}>
              <FontAwesome name={'comment-o'} size={24} color={'#fff'} />
            </TouchableOpacity>
          </View>
          <View style={styles.likeView}>
            <Text style={styles.likeText}>
              {data.likes.length}
              {'  '}likes
            </Text>
          </View>
          <View style={styles.bioView}>
            <Text style={styles.bioText}>
              {data?.userId?.name}
              {'  '}
              <Text style={[styles.bioText, {fontWeight: '400'}]}>
                {data?.description}
              </Text>
            </Text>
          </View>
        </View>
  );
};

export default FeedsFlatlist;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 10,
    width: windowWidth / 1.1,
  },
  profileDetailsView: {
    padding: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  profileImage: {
    height: 50,
    width: 50,
    marginLeft: '2%',
    borderRadius: 100 / 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    // margin: 10,
  },
  sliderBoxView: {
    width: windowWidth / 1.2,
    height: windowHeight / 3,
    // marginRight: '7%',
    borderRadius: 15,
    marginTop: 5,
    alignSelf: 'center',
  },
  optionView: {
    padding: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  likeStyle: {
    marginLeft: '3%',
    marginRight: '2%',
    marginTop: '3%',
  },
  likeView: {
    marginLeft: '6%',
    marginRight: '2%',
    marginTop: '1%',
  },
  likeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  bioView: {
    marginLeft: '6%',
    marginRight: '2%',
    marginTop: '1%',
  },
  bioText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  noPostText: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'center',
  },
});
