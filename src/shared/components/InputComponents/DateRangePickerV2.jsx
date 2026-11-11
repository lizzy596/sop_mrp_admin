import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePickerV2 = ({
  dateRange, setDateRange
}) => {
  const [startDate, endDate] = dateRange;
  return (
    <>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        isClearable={true}
      />
    </>
  );
};

export default DateRangePickerV2;