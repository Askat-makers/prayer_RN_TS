import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUpScreen, SignInScreen, Desks} from '../screens';
import {useAppDispatch, useAppSelector} from '../helpers/customHooks';
import {CreateDesk} from '../screens/Desks/components';
import {DeskDetailTabs} from '../screens/DeskDetail';
import {PrayerDetail} from '../screens/PrayerDetail';

export type RootStackParams = {
  SignUp: any;
  SignIn: any;
  Desks: any;
  AddDesk: any;
  DeskDetail: {
    title: string;
    id: number;
  };
  PrayerDetail: {
    id?: number;
    title: string;
  };
};

const RootStack = createNativeStackNavigator<RootStackParams>();

export const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSignedIn = useAppSelector(state => state.AuthReducer.isSignedIn);

  useEffect(() => {
    dispatch({type: 'IS_SIGNED_IN'});
  }, [dispatch]);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="SignUp"
        screenOptions={{headerShown: false}}>
        {isSignedIn ? (
          <>
            <RootStack.Screen name="Desks" component={Desks} />
            <RootStack.Screen name="AddDesk" component={CreateDesk} />
            <RootStack.Screen name="DeskDetail" component={DeskDetailTabs} />
            <RootStack.Screen name="PrayerDetail" component={PrayerDetail} />
          </>
        ) : (
          <>
            <RootStack.Screen name="SignUp" component={SignUpScreen} />
            <RootStack.Screen name="SignIn" component={SignInScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
