import { StyleSheet, Text, View,Dimensions,TouchableOpacity,ScrollView} from 'react-native'
import React,{useState} from 'react'
import StackHeader from '../../../components/StackHeader';
import Ongoing from './Ongoing';
import Upcoming from './Upcoming';
import Completed from './Completed';

const Activities = () => {
  const [index, setIndex] = useState(0);
  const status = ['Active', 'Upcoming', 'Completed'];
  let upcoming = true
  return (
    <View style={styles.container}>
        <StackHeader
        headerName="Activities"
        rightIcon={true}
        rightIconStyle={true}
        filterName="plussquareo"
        filterSize={26}
        filterColor={'#fff'}
        filterNavigation={() => {navigation.navigate('CreateActivity')}}
      />
        <View style={styles.tabHead}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {status.length &&
          status.map((e, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.tabBox}
                activeOpacity={1}
                underlayColor=""
                onPress={() => {
                  setIndex(i);
                }}>
                <View
                  style={[
                    styles.tabButton,
                    index === i && styles.tabButtonActive,
                  ]}>
                  <Text
                    style={[
                      styles.tabText,
                      index === i && styles.tabTextActive,
                    ]}>
                    {e}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.tabContainer}>
        <ScrollView>
        {index === 0 && <Ongoing />}
        {index === 1 && <Upcoming join={upcoming} />}
        {index === 2 && <Completed />}
        </ScrollView>
      </View>
    </View>
  )
}

export default Activities

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabHead: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding:10,
    width:windowWidth/1,
  },
  tabBox: {},
  tabButton: {
    borderRadius: 100/2,
    width: windowWidth/3.5,
    height: 40,
    padding:5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth:1,
    marginLeft: 10
  },
  tabButtonActive: {
    borderRadius: 100/2,
    width: windowWidth/3.5,
    height: 40,
    padding:5,
    borderColor: '#fff',
    borderWidth:1,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  tabTextActive:{
    color:'#000'
  },
  tabText:{
    color:'#fff'
  },
  tabContainer:{
    flex:1,
    width:windowWidth/1
  },
})