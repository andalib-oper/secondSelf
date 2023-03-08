import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import JoiningActCompo from './JoiningActCompo';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const ActivityFlatlist = ({data, join}) => {
  const navigation = useNavigation();
  console.log("data",data[0]?.location)
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('ActivityDetails', {data: data});
      }}>
      <View style={styles.activityView}>
        <View style={styles.activityImageView}>
          <Image
            source={{
              uri: data?.locationImg
                ? data?.locationImg
                : 'https://st3.depositphotos.com/9987990/16313/i/600/depositphotos_163131326-stock-photo-local-seo-marketing-banner-icon.jpg',
            }}
            style={styles.locationImage}
          />
        </View>
        <View
          style={
            join
              ? [styles.activityDetails, {width: '60%'}]
              : [styles.activityDetails]
          }>
          <Text style={styles.activityText}>Location: {data?.location}</Text>
          <Text style={styles.activityText} ellipsizeMode={'tail'} numberOfLines={1}>Description: {data?.description}</Text>
          <Text style={styles.activityText}>Time: {data?.time}</Text>
          <Text style={styles.activityText}>
            Date: {moment(data.date).format('YYYY-MM-DD')}
          </Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          {join ? (
            <JoiningActCompo join={join} />
          ) : (
            // null
            <View style={styles.maxView}>
              {data?.participants ? (
                <>
                  {data?.participants.slice(0, 4).map(i => {
                    return (
                      <>
                        <Image source={{uri: i.img}} style={styles.image} />
                      </>
                    );
                  })}
                  {data?.participants.length > 4 ? (
                    <View style={styles.groupIcon}>
                      <Text style={styles.groupIconText}>
                        +{data?.maxPeople.length - 4}
                      </Text>
                    </View>
                  ) : null}
                </>
              ) : (
               null
              )}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityFlatlist;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: windowWidth / 1.1,
    borderRadius: 10,
    padding: 10,
    marginTop: '3%',
  },
  activityView: {
    flexDirection: 'row',
  },
  activityImageView: {
    width: '20%',
    alignSelf: 'center',
  },
  locationImage: {
    alignSelf: 'flex-start',
    borderRadius: 100 / 2,
    height: 50,
    width: 50,
  },
  activityDetails: {
    width: '46%',
    alignSelf: 'flex-start',
  },
  activityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  maxView: {
    flexDirection: 'row',
  },
  image: {
    height: 33,
    width: 33,
    alignSelf: 'center',
    marginLeft: -10,
    borderRadius: 100 / 2,
  },
  groupIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'grey',
    marginLeft: -10,
    height: 33,
    width: 33,
    borderRadius: 100 / 2,
    borderColor: '#ffff',
    borderWidth: 1,
  },
  groupIconText: {
    padding: 5,
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
  },
});
