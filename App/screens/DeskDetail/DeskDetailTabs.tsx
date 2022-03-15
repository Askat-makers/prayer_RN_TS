import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DeskDetail} from './DeskDetail';
import {RootStackParams} from '../../navigation/Navigation';

type Props = NativeStackScreenProps<RootStackParams, 'DeskDetail'>;

export type TabParams = {
  Prayers: {
    id: number;
  };
  Subscribed: {
    id: number;
  };
};

export const DeskDetailTabs: React.FC<Props> = ({route}) => {
  const Tab = createMaterialTopTabNavigator<TabParams>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{route.params.title}</Text>
        <TouchableOpacity>
          <View>
            <Icon name="settings" color="#72a8bc" size={30} />
          </View>
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        initialRouteName="Prayers"
        screenOptions={{
          tabBarActiveTintColor: '#72A8BC',
          tabBarInactiveTintColor: '#C8C8C8',
          tabBarLabelStyle: {fontSize: 12},
          tabBarStyle: {backgroundColor: 'white'},
        }}>
        <Tab.Screen
          name="Prayers"
          component={DeskDetail}
          options={{tabBarLabel: 'MY PRAYERS'}}
          initialParams={route.params}
        />
        <Tab.Screen
          name="Subscribed"
          component={DeskDetail}
          options={{tabBarLabel: 'SUBSCRIBED'}}
          initialParams={route.params}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

interface IStyles {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  headerBtn: ViewStyle;
}

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    borderStyle: 'solid',
    paddingVertical: 22,
  },
  headerTitle: {
    fontSize: 17,
    color: '#514D47',
    fontWeight: 'bold',
    lineHeight: 20,
  },
  headerBtn: {
    fontSize: 20,
  },
});
