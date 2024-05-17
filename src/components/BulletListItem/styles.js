import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bulletListItem: {
    flexDirection: 'row',
    marginLeft: 5,
    alignItems: 'center',
    marginBottom: 5, // Adjust as needed for spacing between bullet items
    // width: '48%', // Adjust as needed for spacing between items and ensuring two items per row
  },

  bulletIcon: {
    marginRight: 2, // Adjust as needed for spacing between icon and text
  },

  bulletText: {
    fontFamily: 'mulish-bold',
    fontWeight: '800',
    textAlign: 'left',
    fontSize: 12,
  },
});

export default styles;
