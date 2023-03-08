import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React from 'react';
import moment from 'moment';

const ActivityDetails = ({route}) => {
  const {data} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.activityDetailsView}>
        <Text style={styles.activityNameHeader}>{data.location}</Text>
        <Text style={styles.activityHeaderText}>{data.description}</Text>
        <Text style={styles.activityHeaderText}>Location: {data.location}</Text>
        <Text style={styles.activityHeaderText}>Time: {data.time}</Text>
        <Text style={styles.activityHeaderText}>
          Date: {moment(data.date).format('YYYY-MM-DD')}
        </Text>
        <View style={styles.memnbersHeader}>
          <Text style={[styles.activityNameHeader, {marginTop: '10%'}]}>
            People Your Are Going To Enjoy With
          </Text>
          {data?.participants ? (
            <>
              {data.participants.map(i => {
                return (
                  <View style={styles.memberView}>
                    <Image source={{uri: i.img?i.img:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}} style={styles.image} />
                    <Text style={[styles.activityHeaderText, {color: '#000'}]}>
                      {i.name}
                    </Text>
                  </View>
                );
              })}
            </>
          ):
          null
            }
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
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    elevation: 5,
    width: windowWidth / 1.15,
    backgroundColor: '#fff',
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
});
