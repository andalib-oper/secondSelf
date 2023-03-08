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
import {useDispatch, useSelector} from 'react-redux';
import {joinUsersInActivity} from '../../redux/Activity/actions';

const ActivityFlatlist = ({data, join}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authState = useSelector(state => state.authState);
  let c = data?.participants.map(i => i._id);
  const joinGroup = id => {
    dispatch(joinUsersInActivity(id, authState.id));
  };
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
              ? [styles.activityDetails, {width: '55%'}]
              : [styles.activityDetails]
          }>
          <Text style={styles.activityText}>Location: {data?.location}</Text>
          <Text
            style={styles.activityText}
            ellipsizeMode={'tail'}
            numberOfLines={1}>
            Description: {data?.description}
          </Text>
          <Text style={styles.activityText}>Time: {data?.time}</Text>
          <Text style={styles.activityText}>
            Date: {moment(data.date).format('YYYY-MM-DD')}
          </Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          {join ? (
            <>
              {c.includes(authState.id)? null : (
                <JoiningActCompo
                  join={join}
                  onPress={() => joinGroup(data?._id)}
                />
              )}
            </>
          ) : (
            // null
            <View style={styles.maxView}>
              {data?.participants ? (
                <>
                  {data?.participants.slice(0, 3).map(i => {
                    return (
                      <>
                        <Image source={{uri: i.img?i.img:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}} style={styles.image} />
                      </>
                    );
                  })}
                  {data?.participants.length > 3 ? (
                    <View style={styles.groupIcon}>
                      <Text style={styles.groupIconText}>
                        +{data?.participants.length - 3}
                      </Text>
                    </View>
                  ) : null}
                </>
              ) : null}
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
    width: '49%',
    marginRight:'5%',
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
