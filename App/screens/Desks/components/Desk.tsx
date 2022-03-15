import {
  Button,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

interface IDeskProps {
  title: string;
  id: number;
  onDeletePressed: (id: number) => void;
  onTitlePressed: (id: number, title: string) => void;
}

export const Desk: React.FC<IDeskProps> = ({
  title,
  id,
  onDeletePressed,
  onTitlePressed,
}) => {
  return (
    <View style={styles.desk}>
      <Text onPress={() => onTitlePressed(id, title)} style={styles.title}>
        {title}
      </Text>
      <Button title="DEL" onPress={() => onDeletePressed(id)} />
    </View>
  );
};

interface IStyles {
  desk: ViewStyle;
  title: TextStyle;
}

const styles = StyleSheet.create<IStyles>({
  desk: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderStyle: 'solid',
    borderRadius: 4,
    marginVertical: 5,
    marginHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    color: '#514D47',
    fontWeight: 'bold',
  },
});
