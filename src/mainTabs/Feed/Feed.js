import {StyleSheet, Text, View, Image, ScrollView,TouchableOpacity, ImageBackground} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import StoriesData from '../../../assets/MockData/StoriesData';
import StackHeader from '../../../components/StackHeader';

const Feed = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StackHeader 
      headerImage={true}
      headerName='Feeds'
      rightIcon={true}  
      filterName='plussquareo'
      filterSize={26}
      filterColor={'#000'}
      filterNavigation={()=>{}}
      />
      <View style={styles.storiesContainer}>
        <Text style={styles.storiesText}>Stories</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <View style={styles.storiesView}>
          {StoriesData.map(i => {
            return (
              <TouchableOpacity onPress={()=>navigation.navigate('Stories',{stories:i.storiesImage})}>
                <ImageBackground style={i.seen?[styles.storyButton,{borderColor: 'grey'}]: [styles.storyButton]}>
                <Image source={{uri: i.storiesImage[0]}} style={styles.image}/>
                </ImageBackground>
                <Text style={styles.storyName}>{i?.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  storiesContainer: {
    alignSelf: 'flex-start',
    marginTop: '2%',
  },
  storiesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
    marginLeft: '5%',
  },
  storiesView: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 100 / 2,
    alignSelf: 'center'
  },
  storyButton:{
    borderColor: 'green',
    borderRadius:100/2,
    borderWidth:3,
    height: 60,
    width: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 8,
    marginRight: 5,
  },
  storyName:{
    alignSelf: 'center',
    marginTop: 5
  }
});
