import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import styles from './src/styles/styles';
import AppNavigator from './src/navigation/AppNavigator';


export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <AppNavigator />
    </SafeAreaView>
  );
}


