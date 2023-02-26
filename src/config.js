import React,{useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '../navigation/rootNavigation'
import { useSelector } from 'react-redux';

const config = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(tokenRetriever());
  // }, [dispatch]);

  const authState = useSelector(state => state.authState);
  return (
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  );
};

export default config;