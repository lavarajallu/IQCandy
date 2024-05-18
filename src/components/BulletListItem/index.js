import { View, Text } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const BulletListItem = ({ icon, text, color }) => (
  <View style={styles.bulletListItem}>
    <Ionicons name={icon} size={20} color={color} style={styles.bulletIcon} />
    <Text style={[styles.bulletText, { color }]}>{text}</Text>
  </View>
);

export default BulletListItem;
