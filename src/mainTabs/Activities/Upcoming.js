import { StyleSheet, Text, View,FlatList,Dimensions } from 'react-native'
import React,{useEffect} from 'react'
import ActivityFlatlist from '../../../components/Activity/ActivityFlatlist'
import { useDispatch, useSelector } from 'react-redux'
import { getActivityByCity, getActivityByUserId } from '../../../redux/Activity/actions'

const Upcoming = ({join,city}) => {
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
  data={activityState.activityUpcoming}
  renderItem={({item}) => <ActivityFlatlist data={item} join={join}/>}
  keyExtractor={item => item.id}
  />
</View>
  )
}

export default Upcoming
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#000',
  },
  flatlist: {
    padding: 10,
    width: windowWidth / 1,
  },
})