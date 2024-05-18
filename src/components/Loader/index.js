// Loader.js

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = ({ loading }) => {
  if (!loading) {
    return null; // Don't render anything if loading is false
  }

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size='large' color='#ffffff' />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
});

export default Loader;
