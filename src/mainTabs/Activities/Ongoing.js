import { StyleSheet, Text, View,FlatList,Dimensions } from 'react-native'
import React from 'react'
import ActivityFlatlist from '../../../components/Activity/ActivityFlatlist'
import ActivitiesData from '../../../assets/MockData/ActivitiesData'

const Ongoing = () => {
  return (
    <View style={styles.container}>
        <FlatList
      style={styles.flatlist}
      data={ActivitiesData}
      renderItem={({item}) => <ActivityFlatlist data={item}/>}
      keyExtractor={item => item.id}
      />
    </View>
  )
}

export default Ongoing
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