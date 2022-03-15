import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Prayer} from './components';
import {useAppDispatch, useAppSelector} from '../../helpers/customHooks';
import {IPrayer} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TabParams} from './DeskDetailTabs';

type Props = NativeStackScreenProps<TabParams, 'Prayers'>;

export const DeskDetail: React.FC<Props> = ({route}) => {
  const dispatch = useAppDispatch();
  const {notAnsweredPrayers, answeredPrayers} = useAppSelector(
    state => state.ColumnReducer,
  );
  const id = route.params.id;
  const [prayerTitle, setPrayerTitle] = useState<string>('');
  const [isShowAnsweredPrayers, setIsShowAnsweredPrayers] =
    useState<boolean>(false);

  const onAddPrayerPressed = () => {
    const prayer = {
      title: prayerTitle,
      description: '',
      checked: false,
      columnId: id,
    };
    dispatch({type: 'ADD_PRAYER', payload: prayer});
    setPrayerTitle('');
  };

  const onCheckBoxPressed = (prayer: IPrayer) => {
    dispatch({type: 'UPDATE_PRAYER', payload: prayer});
  };

  const onDeletePressed = (id?: number) => {
    dispatch({type: 'DELETE_PRAYER', payload: id});
  };

  useEffect(() => {
    dispatch({type: 'GET_PRAYERS', payload: id});
  }, [dispatch, id]);

  return (
    <View style={styles.root}>
      <View style={styles.addPrayer}>
        <TouchableOpacity style={styles.addBtn} onPress={onAddPrayerPressed}>
          <Icon name="add" color="#72a8bc" size={30} />
        </TouchableOpacity>
        <TextInput
          value={prayerTitle}
          onChangeText={setPrayerTitle}
          placeholder="Add a prayer..."
          style={styles.addInput}
        />
      </View>
      <View>
        <FlatList
          data={notAnsweredPrayers}
          renderItem={({item}) => (
            <Prayer
              prayer={item}
              onCheckBoxPressed={onCheckBoxPressed}
              onDeletePressed={onDeletePressed}
            />
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.SAPbtn}
        onPress={() => setIsShowAnsweredPrayers(!isShowAnsweredPrayers)}>
        <Text style={styles.SAPtext}>
          {isShowAnsweredPrayers
            ? 'HIDE ANSWERED PRAYERS'
            : 'SHOW ANSWERED PRAYERS'}
        </Text>
      </TouchableOpacity>
      {isShowAnsweredPrayers && (
        <View>
          <FlatList
            data={answeredPrayers}
            renderItem={({item}) => (
              <Prayer
                prayer={item}
                onCheckBoxPressed={onCheckBoxPressed}
                onDeletePressed={onDeletePressed}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

interface IStyles {
  root: ViewStyle;
  addPrayer: ViewStyle;
  addBtn: ViewStyle;
  addInput: ViewStyle;
  SAPbtn: ViewStyle;
  SAPtext: TextStyle;
}

const styles = StyleSheet.create<IStyles>({
  root: {
    backgroundColor: 'white',
  },
  addPrayer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    margin: 16,
    borderColor: '#e5e5e5',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
  },
  addBtn: {
    marginRight: 15,
  },
  addInput: {
    fontSize: 17,
  },
  SAPbtn: {
    backgroundColor: '#BFB393',
    borderRadius: 15,
    paddingHorizontal: 17,
    paddingVertical: 7,
    width: 209,
    alignSelf: 'center',
    marginVertical: 21,
  },
  SAPtext: {
    fontSize: 12,
    lineHeight: 14,
    color: '#fff',
    alignSelf: 'center',
  },
});
