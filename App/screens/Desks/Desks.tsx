import React, {useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  useAppDispatch,
  useAppSelector,
  useNav,
} from '../../helpers/customHooks';
import {Desk} from './components';

export const Desks: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNav();
  const user = useAppSelector(state => state.AuthReducer.user);
  const {columns} = useAppSelector(state => state.ColumnReducer);

  const onAddPressed = () => {
    navigation.navigate('AddDesk');
  };

  const onDeletePressed = (id: number) => {
    dispatch({type: 'DELETE_DESK', payload: id});
  };

  const onTitlePressed = (id: number, title: string) => {
    navigation.navigate('DeskDetail', {id, title});
  };

  useEffect(() => {
    dispatch({type: 'GET_COLUMNS', payload: user.token});
  }, [dispatch, user]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Desk</Text>
          <TouchableOpacity onPress={onAddPressed}>
            <View>
              <Icon name="add" color="black" size={30} />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={columns}
          renderItem={({item}) => (
            <Desk
              title={item.title}
              id={item.id}
              onDeletePressed={onDeletePressed}
              onTitlePressed={onTitlePressed}
            />
          )}
        />
      </View>
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
    marginBottom: 10,
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
