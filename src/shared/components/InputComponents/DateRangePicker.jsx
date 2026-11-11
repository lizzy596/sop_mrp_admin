import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  className,
  isClearable,
}) => {
  const handleSetStartDate = (date) => {
    if (!date) return setStartDate(new Date('2024-03-15T00:00:00'));
    date.setHours(0, 0, 0, 0);
    setStartDate(date);
  };
  const handleSetEndDate = (date) => {
    if (!date) return setEndDate(new Date(new Date().setHours(0, 0, 0, 0)));
    date.setHours(0, 0, 0, 0);
    setEndDate(date);
  };
  return (
    <>
      <div className="form-floating mb-3">
        <DatePicker
          id={"startDateId"}
          className={className}
          selected={startDate}
          onChange={(date) => handleSetStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          isClearable={isClearable}
        />
      </div>
      <div className="form-floating mb-3">
        <DatePicker
          className={className}
          selected={endDate}
          onChange={(date) => handleSetEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          isClearable={isClearable}
        />
      </div>
    </>
  );
};

export default DateRangePicker;
