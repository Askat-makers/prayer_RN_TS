import {Pressable, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import React from 'react';

interface ICustomButtonProps {
  onPress: () => void;
  text: string;
  type: 'primary' | 'tertiary';
}

export const CustomButton: React.FC<ICustomButtonProps> = ({
  onPress,
  text,
  type,
}) => {
  return (
    <Pressable
      style={[styles.container, styles[`container_${type}`]]}
      onPress={onPress}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

interface IStyles {
  container: ViewStyle;
  container_primary?: ViewStyle;
  container_tertiary?: ViewStyle;
  text: TextStyle;
  text_primary?: TextStyle;
  text_tertiary?: TextStyle;
}

const styles = StyleSheet.create<IStyles>({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  container_primary: {
    backgroundColor: '#3b71f3',
  },
  container_tertiary: {
    backgroundColor: 'transparent',
  },
  text: {
    fontWeight: 'bold',
  },
  text_primary: {
    color: 'white',
  },
  text_tertiary: {
    color: 'black',
  },
});
