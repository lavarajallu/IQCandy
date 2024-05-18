import React from 'react';
import { SafeAreaView, Image, Dimensions, StyleSheet } from 'react-native';

const ComingSoonPage = ({ route, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/images/comingsoon.jpeg')}
        style={styles.image}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.4,
    alignSelf: 'center',
  },
});

export default ComingSoonPage;
