import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';


export default function NotFoundScreen() {
  return (
    <>
      <View>
        hello
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
