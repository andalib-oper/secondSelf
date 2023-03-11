import { StyleSheet, Text, View,FlatList,Dimensions} from 'react-native'
import React,{useEffect,useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native'
import ActivitiesData from '../../../assets/MockData/ActivitiesData'
import ActivityFlatlist from '../../../components/Activity/ActivityFlatlist'
import { useDispatch, useSelector } from 'react-redux'
import { getActivityByCity, getActivityByUserId } from '../../../redux/Activity/actions'

const Completed = ({city}) => {
  const dispatch = useDispatch();
  const authState = useSelector((state)=>state.authState)
  const activityState = useSelector((state)=>state.activityState)
  useFocusEffect(
    useCallback(() => {
      dispatch(getActivityByCity(city))
    }, [city])
    );
  return (
    <View style={styles.container}>
        <FlatList
      style={styles.flatlist}
      data={activityState.activityCompleted}
      renderItem={({item}) => <ActivityFlatlist data={item}/>}
      keyExtractor={item => item.id}
      />
    </View>
  )
}

export default Completed
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#000'
  },
  flatlist: {
    padding: 10,
    width: windowWidth / 1,
  },
})