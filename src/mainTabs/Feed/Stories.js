import {StyleSheet, Text, View, Alert} from 'react-native';
import {StoryContainer} from 'react-native-stories-view';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Stories = ({route}) => {
  const navigation = useNavigation();
  const {stories,i} = route.params;
  return (
    <View>
      <StoryContainer
        visible={true}
        enableProgress={true}
        images={stories}
        onComplete={() => navigation.goBack()}
        duration={5}
        headerComponent={<View/>}
        userProfile={{
          userImage: stories ,
          userName: i?.placeName,
          userMessage: i?.city,
          imageArrow:
            'https://cdn.iconscout.com/icon/free/png-256/back-arrow-1767531-1502435.png',
          onImageClick: () => {
            // console.log('lskndclksnc');
           navigation.goBack()
          },
        }}
      />
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  storiesHeader: {
    backgroundColor: 'pink',
  },
});
