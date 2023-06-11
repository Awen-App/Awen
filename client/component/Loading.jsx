import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from 'react-native';

const Loading = () => (
  <View style={styles.container}>
    <Spinner color="blue" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
