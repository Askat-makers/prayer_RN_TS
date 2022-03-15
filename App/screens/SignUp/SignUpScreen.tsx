import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {CustomInput} from '../../components/CustomInput';
import {CustomButton} from '../../components/CustomButton';
import {useAppDispatch, useNav} from '../../helpers/customHooks';

export const SignUpScreen: React.FC = () => {
  const navigation = useNav();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const onRegisterPressed = () => {
    dispatch({
      type: 'SIGN_UP',
      payload: {
        user: {email, password, name: username},
        navigate: navigation.navigate,
      },
    });
  };
  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomButton
          text="Register"
          onPress={onRegisterPressed}
          type="primary"
        />
        <Text style={styles.text}>
          By registering, you conifrm that you accept our{' '}
          <Text style={styles.link}>Terms of Use </Text>and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
        <CustomButton
          text="Have an account? Sign In"
          onPress={onSignInPressed}
          type="tertiary"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051c60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#fdb075',
  },
});
