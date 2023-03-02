import {StyleSheet, Text, View, Dimensions,Image} from 'react-native';
import React from 'react';

const ActivityDetails = ({route}) => {
  const {data} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.activityDetailsView}>
        <Text style={styles.activityNameHeader}>Activity Name</Text>
        <Text style={styles.activityHeaderText}>{data.name}</Text>
        <Text style={styles.activityHeaderText}>Location: {data.location}</Text>
        <Text style={styles.activityHeaderText}>
          Start Time: {data.startTime}
        </Text>
        <Text style={styles.activityHeaderText}>End Time: {data.endTime}</Text>
        <Text style={styles.activityHeaderText}>Date: {data.date}</Text>
        <View style={styles.memnbersHeader}>
          <Text style={[styles.activityNameHeader, {marginTop: '10%'}]}>
            People Your Are Going To Enjoy With
          </Text>
          {data.maxPeople.map(i => {
            return (
              <View style={styles.memberView}>
                <Image source={{uri:i.img}} style={styles.image}/>
                <Text style={[styles.activityHeaderText,{color:'#000'}]}>{i.name}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default ActivityDetails;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  activityDetailsView: {
    alignSelf: 'flex-start',
    width: windowWidth / 1,
    padding: 10,
  },
  activityNameHeader: {
    fontSize: 18,
    color: '#fff',
    marginLeft: '5%',
    margin: 10,
    fontWeight: 'bold',
  },
  activityHeaderText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: '5%',
    marginTop: 5,
    fontWeight: '500',
  },
  memberView: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding:10,
    marginTop:10,
    borderRadius:10,
    elevation:5,
    width:windowWidth/1.15,
    backgroundColor:'#fff'
  },
  image:{
    height:30,
    width:30,
    borderRadius:100/2,
    alignSelf:'center'
  }
});
