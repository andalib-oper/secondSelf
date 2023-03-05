import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect,useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const Splash = ({navigation}) => {
  const authState = useSelector(state => state.authState)
  const checkFirstLaunch = useCallback(async() => {
  {authState.accessToken?    
    await navigation.navigate('FeedStack')
    :
    navigation.navigate('login',{data:true})
  }
  }, [authState.accessToken,navigation]);
  useEffect(() => {
    setTimeout(async () => {
      checkFirstLaunch()
    }, 3000);
  },[checkFirstLaunch]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Images/png/logo-no-background.png')}
        style={styles.image}
      />
    </View>
  );
};

export default Splash;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  image: {
    height: windowHeight / 2.7,
    width: windowWidth / 1.5,
    alignSelf: 'center',
  },
});
