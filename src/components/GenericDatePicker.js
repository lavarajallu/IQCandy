// GenericDatePicker.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formatDate } from '../utils/dateUtils'; // Import a utility function for formatting dates

const GenericDatePicker = ({
  onDateSelected,
  onCancel,
  onSave,
  isVisible,
  mode,
  minimumDate,
  date,
  format,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleConfirm = (date) => {
    setSelectedDate(date);
    onDateSelected && onDateSelected(date);
    handleSave();
  };

  const handleSave = () => {
    onSave && onSave(selectedDate);
  };

  const handleCancel = () => {
    onCancel && onCancel();
  };

  const formattedDate = selectedDate ? formatDate(selectedDate, format) : '';

  return (
    <View>
      <DateTimePickerModal
        isVisible={isVisible}
        minimumDate={minimumDate}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        date={date}
      />
    </View>
  );
};

export default GenericDatePicker;
