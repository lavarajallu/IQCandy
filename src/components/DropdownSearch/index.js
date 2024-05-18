import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';

const DropDownSearch = (props) => {
  const {
    placeholderText,
    data,
    label,
    handleChange,
    selectedValue,
    maxHeight,
    width,
    validation, // Add validation prop
  } = props;

  const [value, setValue] = useState(selectedValue ? selectedValue : null);
  const [isFocus, setIsFocus] = useState(false);
  const [localValidation, setLocalValidation] = useState({
    showErrorMessage: false,
    errorMessage: '',
  });

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    if (validation?.showErrorMessage) {
      setLocalValidation(validation);
    }
  }, [validation?.showErrorMessage]);

  const onSelect = (item) => {
    setValue(item.value);
    setIsFocus(false);

    // Child to parent passing selected Value
    handleChange(item.value);

    // Clear error message when a new item is selected
    setLocalValidation({
      showErrorMessage: false,
      errorMessage: '',
    });
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {label && renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: 'blue' },
          { width: width ? width : '' },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={false}
        maxHeight={maxHeight}
        labelField='label'
        valueField='value'
        placeholder={
          !isFocus ? (placeholderText ? placeholderText : 'Select Item') : '...'
        }
        searchPlaceholder='Search...'
        value={value}
        onFocus={() => setIsFocus(true)}
        // onBlur={() => {
        //   console.log('isFocus', selectedValue);
        //   setIsFocus(false);

        //   // Trigger onBlur validation
        //   if (!selectedValue) {
        //     setLocalValidation({
        //       showErrorMessage: true,
        //       errorMessage: `${label} cannot be empty`,
        //     });
        //   }
        // }}
        onChange={(item) => {
          onSelect(item);
        }}
        renderLeftIcon={() => (
          <Ionicons
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name='book-outline'
            size={16}
          />
        )}
      />
      {localValidation.showErrorMessage && (
        <Text style={styles.errorMessage}>{localValidation.errorMessage}</Text>
      )}
    </View>
  );
};

export default DropDownSearch;
