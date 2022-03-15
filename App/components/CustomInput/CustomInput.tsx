import {StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import React from 'react';

interface ICustomInputProps {
  value: string;
  setValue: (arg: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
}

export const CustomInput: React.FC<ICustomInputProps> = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

interface IStyles {
  container: ViewStyle;
  input: ViewStyle;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    paddingVertical: 15,
  },
});
