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
import { useNavigation } from '@react-navigation/native';

const FeedsFlatlist = ({data}) => {
  const navigation=useNavigation()
  const dispatch = useDispatch();
  const feedState = useSelector(state => state.feedState);
  const likeFunc = id => {
    if (feedState.like.includes(id)) {
      dispatch(like(feedState.like.filter(val => val !== id)));
    } else {
      dispatch(like([...new Set([...feedState.like, id])]));
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileDetailsView}>
        <Image style={styles.profileImage} source={{uri: data?.profileImg}} />
        <Text style={styles.profileName}>{data?.name}</Text>
      </View>
      <View>
        <SliderBox
          images={data.postImages}
          sliderBoxHeight={200}
          resizeMode={'cover'}
          ImageComponentStyle={styles.sliderBoxView}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
        />
      </View>
      <View style={styles.optionView}>
        <TouchableOpacity
          onPress={() => {
            likeFunc(data.id);
          }}
          style={styles.likeStyle}>
          <AntDesign
            name={feedState.like.includes(data.id) ? 'heart' : 'hearto'}
            size={24}
            color={feedState.like.includes(data.id) ? 'red' : '#fff'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('Comments')}} style={styles.likeStyle}>
          <FontAwesome name={'comment-o'} size={24} color={'#fff'} />
        </TouchableOpacity>
      </View>
      <View style={styles.likeView}>
        <Text style={styles.likeText}>
          {data.likes}
          {'  '}likes
        </Text>
      </View>
      <View style={styles.bioView}>
        <Text style={styles.bioText}>
          {data?.name}
          {'  '}
          <Text style={[styles.bioText, {fontWeight: '400'}]}>
            {data?.profileBio}
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
    alignSelf: 'center',
    margin: 10,
  },
  sliderBoxView: {
    width: windowWidth / 1.2,
    height: windowHeight / 3,
    marginRight: '10%',
    borderRadius: 15,
    marginTop: 5,
    backgroundColor: 'red',
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
});
