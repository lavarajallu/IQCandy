import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import BackButton from './BackButton';
import { COLORS } from '../constants/colors';

export default function Header(props) {
  const {
    backAction,
    hedercolor,
    onRuleBook,
    headerTitle,
    rightIcon = false,
  } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: hedercolor ? COLORS.appSecondaryColor : 'transparent',
        flex: 0.08,
      }}
    >
      <View
        style={{
          flex: 0.2,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <BackButton backAction={backAction} />
      </View>
      <View
        style={{
          flex: 0.6,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.headerText}>{headerTitle}</Text>
      </View>

      <View style={{ flex: 0.2 }}>
        {rightIcon && (
          <BackButton backAction={onRuleBook} type={'book-outline'} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'mulish-bold',
    color: COLORS.whiteColor,
  },
});
