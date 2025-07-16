/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import React from 'react';
// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { getApp } from '@react-native-firebase/app';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  // React.useEffect(() => {
  //   firestore(getApp())
  //     .collection('config')
  //     .doc('hello')
  //     .get()
  //     .then(snapshot => {
  //       console.log('"hello" collection: ', snapshot.data());
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });

  //   // Stop listening for updates when no longer required
  //   // return () => subscriber();
  // }, []);

  // return (
  //   // <View style={styles.container}>
  //   //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
  //   //   <NewAppScreen templateFileName="App.tsx" />
  //   // </View>
  // );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

export default App;
