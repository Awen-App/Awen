import React from 'react';
import { StyleSheet, View } from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.container} />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom:0,
    width: 393,
    height: 62,
    backgroundColor: '#33A09A',
    borderRadius: 15,
  },
});

export default Navbar;