import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import React,{useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import StoriesData from '../../../assets/MockData/StoriesData';
import StackHeader from '../../../components/StackHeader';
import FeedsData from '../../../assets/MockData/FeedsData';
import FeedsFlatlist from '../../../components/Home/FeedsFlatlist';

const Feed = () => {
  const navigation = useNavigation();
  const [fileName, setFileName] = useState('');
  const [images, setImage] = useState('');
  const launchLibrary = () => {
    ImagePicker.openPicker({
      multiple: false,
    }).then(image => {
      console.log('img', image?.path?.slice(-23));
      setFileName(image?.path?.slice(-23));
      setImage(image);
    });
  };
  return (
    <View style={styles.container}>
      <StackHeader
        headerImage={true}
        headerName="Feeds"
        rightIcon={true}
        filterName="plussquareo"
        filterSize={26}
        filterColor={'#fff'}
        filterNavigation={() => {navigation.navigate('CreateActivity')}}
      />
      <ScrollView>
      <View style={styles.storiesContainer}>
        <Text style={styles.storiesText}>Stories</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <View style={styles.storiesView}>
            {StoriesData.map(i => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Stories', {stories: i.storiesImage})
                  }>
                  <ImageBackground
                    style={[styles.storyButton]
                    }>
                    <Image
                      source={{uri: i.storiesImage[0]}}
                      style={styles.image}
                    />
                  </ImageBackground>
                  <Text style={styles.storyName}>{i?.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.feedView}>
        <FlatList
          style={styles.flatlist}
          data={FeedsData}
          renderItem={({item}) => <FeedsFlatlist data={item} />}
          keyExtractor={item => item.id}
        />
      </View>
      </ScrollView>
    </View>
  );
};

export default Feed;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  storiesContainer: {
    alignSelf: 'flex-start',
    height: windowHeight / 6,
    marginTop: '2%',
  },
  storiesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: '5%',
  },
  storiesView: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  storyButton: {
    borderColor: 'green',
    borderRadius: 100 / 2,
    borderWidth: 3,
    height: 60,
    width: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 8,
    marginRight: 5,
  },
  storyName: {
    alignSelf: 'center',
    marginTop: 5,
    color:'#fff'
  },
  feedView: {
    width: windowWidth / 1,
    alignSelf: 'center',
    padding: 5,
  },
  flatlist: {
    padding: 5,
    alignSelf: 'center',
    width: windowWidth / 1,
  },
});
