import {StyleSheet, Text, View, FlatList, Dimensions} from 'react-native';
import React, {useEffect,useState} from 'react';
import ActivityFlatlist from '../../../components/Activity/ActivityFlatlist';
import ActivitiesData from '../../../assets/MockData/ActivitiesData';
import {useDispatch, useSelector} from 'react-redux';
import {getActivityByCity} from '../../../redux/Activity/actions';

const Ongoing = ({city}) => {
  const dispatch = useDispatch();
  const authState = useSelector((state)=>state.authState)
  const activityState = useSelector((state)=>state.activityState)
  useEffect(() => {
    dispatch(getActivityByCity(city))
  }, [authState.id]);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={activityState.activity}
        renderItem={({item}) => <ActivityFlatlist data={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Ongoing;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  flatlist: {
    padding: 10,
    width: windowWidth / 1,
  },
});
