import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {Logo} from '../../../assets/images';
import {CustomButton} from '../../components/CustomButton/CustomButton';
import {CustomInput} from '../../components/CustomInput';
import {useAppDispatch, useNav} from '../../helpers/customHooks';

export const SignInScreen: React.FC = () => {
  const navigation = useNav();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();

  const {height} = useWindowDimensions();

  const onSignInPressed = () => {
    dispatch({type: 'SIGN_IN', payload: {email, password}});
  };
  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomButton text="Sign In" onPress={onSignInPressed} type="primary" />
        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
          type="tertiary"
        />
      </View>
    </View>
  );
};

interface IStyles {
  container: ViewStyle;
  root: ViewStyle;
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
  logo: {
    width: '100%',
    maxWidth: 300,
    maxHeight: 200,
  },
});
