import React,{useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '../navigation/rootNavigation'
import { tokenRetriever } from '../redux/auth/action';
import { useSelector,useDispatch } from 'react-redux';
import MainNavigation from '../navigation/mainNavigation';

const config = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tokenRetriever());
  }, [dispatch]);

  const authState = useSelector(state => state.authState);
  return (
    <NavigationContainer>
      {/* <RootNavigator/> */}
      {authState.accessToken?<MainNavigation/>:<RootNavigator/>}
    </NavigationContainer>
  );
};

export default config;