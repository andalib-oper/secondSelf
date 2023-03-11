import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect,useCallback} from 'react';
import FeedsData from '../../../assets/MockData/FeedsData';
import FeedsFlatlist from '../../../components/Home/FeedsFlatlist';
import StackHeader from '../../../components/StackHeader';
import {useNavigation,useFocusEffect} from '@react-navigation/native';
import ProfileInput from '../../../components/Profile/ProfileInput';
import {useDispatch, useSelector} from 'react-redux';
import {logUserOut} from '../../../redux/auth/action';
import {getProfileDetailsByUserId} from '../../../redux/Profile/actions';
import {getPostByUserId} from '../../../redux/Post/actions';
import { getActivityByUserId } from '../../../redux/Activity/actions';
import ActivityFlatlist from '../../../components/Activity/ActivityFlatlist';

const Profile = () => {
  const navigation = useNavigation();
  const authState = useSelector(state => state.authState);
  const profileState = useSelector(state => state.profileState);
  const postState = useSelector(state => state.postState);
  const activityState = useSelector((state)=>state.activityState)
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(getProfileDetailsByUserId(authState.id));
      dispatch(getActivityByUserId(authState.id))
      dispatch(getPostByUserId(authState.id));
    }, [authState.id])
    );
  return (
    <View style={styles.container}>
      <StackHeader headerName="Profile" rightIcon={false} />
      <ScrollView>
        <View style={styles.ImageView}>
          <ImageBackground
            style={styles.ImageBackground}
            blurRadius={3}
            source={{
              uri:
                profileState?.profileDetails?.coverPicture !== undefined
                  ? profileState?.profileDetails?.coverPicture
                  : 'https://i.imgflip.com/1gqvcu.jpg',
            }}>
            <Image
              source={{
                uri:
                  profileState?.profileDetails?.profilePicture !== undefined
                    ? profileState?.profileDetails?.profilePicture
                    : 'https://www.oseyo.co.uk/wp-content/uploads/2020/05/empty-profile-picture-png-2-2.png',
              }}
              style={styles.image}
            />
          </ImageBackground>
        </View>
        <View style={styles.profileView}>
          <Text style={styles.profileHeader}>Profile Details</Text>
          <Text
            style={styles.editText}
            onPress={() => navigation.navigate('EditProfile')}>
            Edit
          </Text>
        </View>
        {/* profile name */}
        <View style={styles.profileSection}>
          <Text style={styles.headerText}>Name</Text>
          <ProfileInput
            editable={false}
            style={styles.input}
            value={
              profileState?.profileDetails?.name
                ? profileState?.profileDetails?.name
                : 'Not Specified'
            }
          />
        </View>
        {/* email section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>E-mail</Text>
          <ProfileInput
            editable={false}
            style={styles.input}
            value={
              profileState?.profileDetails?.email
                ? profileState?.profileDetails?.email
                : 'Not Specified'
            }
          />
        </View>
        {/* phone number section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Phone Number</Text>
          <ProfileInput
            editable={false}
            style={styles.input}
            value={
              profileState?.profileDetails?.phoneNo
                ? profileState?.profileDetails?.phoneNo
                : 'Not Specified'
            }
          />
        </View>
        {/* location section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Location</Text>
          <ProfileInput
            editable={false}
            style={styles.input}
            value={
              profileState?.profileDetails?.city
                ? profileState?.profileDetails?.city
                : 'Not Specified'
            }
          />
        </View>
        {/* GENDER section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Gender</Text>
          <ProfileInput
            editable={false}
            style={styles.input}
            value={
              profileState?.profileDetails?.gender
                ? profileState?.profileDetails?.gender
                : 'Not Specified'
            }
          />
        </View>
        {/* Interest section */}
        <View style={styles.profileSectionRest}>
          <Text style={styles.headerText}>Interest</Text>
          <ProfileInput
            editable={false}
            style={styles.input}
            value={
              profileState?.profileDetails?.interest
                ? profileState?.profileDetails?.interest.toString()
                : 'Not Specified'
            }
          />
        </View>
        {/* LOGOUT BUTTON */}
        <TouchableOpacity
          onPress={() => {
            dispatch(logUserOut());
          }}
          style={styles.createActivityButton}>
          <Text style={styles.createActivityText}>Logout</Text>
        </TouchableOpacity>
        {/* Activities section */}
        <View style={styles.profileView}>
          <Text style={styles.profileHeader}>Your Activities</Text>
        </View>
        <View style={styles.feedView}>
          <FlatList
            style={styles.flatlist}
            data={activityState.activityUserId}
            renderItem={({item}) => <ActivityFlatlist data={item} />}
            keyExtractor={item => item._id}
          />
        </View>
{/* post flatlist section */}
        <View style={styles.profileView}>
          <Text style={styles.profileHeader}>Your Posts</Text>
        </View>
        <View style={styles.feedView}>
          <FlatList
            style={styles.flatlist}
            data={postState.postUserId}
            renderItem={({item}) => <FeedsFlatlist data={item} />}
            keyExtractor={item => item._id}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  ImageView: {
    width: windowWidth / 1,
    height: windowHeight / 3,
    paddingHorizontal: 1,
    justifyContent: 'center',
  },
  ImageBackground: {
    width: windowWidth / 1,
    height: windowHeight / 3,
    justifyContent: 'center',
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  profileView: {
    marginTop: '2%',
    marginLeft: '3%',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 5,
  },
  profileHeader: {
    width: '84%',
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  editText: {
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileSection: {
    marginTop: '3%',
  },
  profileSectionRest: {
    marginTop: '3%',
  },
  input: {
    alignSelf: 'center',
    height: 40,
    width: windowWidth / 1.4,
    marginTop: '2%',
    marginLeft: 1,
    marginBottom: 10,
    color: '#fff',
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginLeft: '4%',
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
  createActivityButton: {
    alignSelf: 'center',
    width: windowWidth / 1.5,
    padding: 5,
    backgroundColor: '#fff',
    marginTop: '10%',
    marginBottom: '5%',
    borderRadius: 10,
  },
  createActivityText: {
    fontSize: 16,
    padding: 10,
    alignSelf: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
});
