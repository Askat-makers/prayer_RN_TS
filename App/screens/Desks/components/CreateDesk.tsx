import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {CustomInput} from '../../../components/CustomInput';
import {CustomButton} from '../../../components/CustomButton/CustomButton';
import {useAppDispatch, useNav} from '../../../helpers/customHooks';

export const CreateDesk: React.FC = () => {
  const navigation = useNav();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const dispatch = useAppDispatch();

  const onAddPressed = () => {
    const newDesk = {
      title,
      description,
    };
    dispatch({
      type: 'ADD_DESK',
      payload: {newDesk, goBack: navigation.goBack},
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.root}>
        <Text style={styles.title}>Add desk</Text>
        <CustomInput placeholder="Title" value={title} setValue={setTitle} />
        <CustomInput
          placeholder="Description"
          value={description}
          setValue={setDescription}
        />
        <CustomButton text="Add" onPress={onAddPressed} type="primary" />
      </View>
    </View>
  );
};

interface IStyles {
  container: ViewStyle;
  root: ViewStyle;
  title: TextStyle;
  logo: ImageStyle;
}

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    maxWidth: 300,
    maxHeight: 200,
  },
});
