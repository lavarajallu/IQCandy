import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import Search from './Search';
const SearchPage = ({navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Search navigation={navigation} />
    </SafeAreaView>
  );
};

export default SearchPage;
