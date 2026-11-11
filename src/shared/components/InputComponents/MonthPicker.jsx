import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const parseDateString = (dateString) => {
  const dateArr = dateString.split("-");
  if (dateArr?.length !== 2) return "INVALID"

  return `${dateArr[0]} of ${dateArr[1]}`
}

const MonthPicker = ({
  startDate, setStartDate
}) => {
  const MonthPickerInput = forwardRef(
    ({ value, onClick, className }, ref) => {

      return (
        <>
          <label className="form-label me-2">{`Month: `}</label>
          <button className={className} onClick={onClick} ref={ref}>
            {parseDateString(value)}
          </button>
        </>
      )
    }
  );

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="M-yyyy"
      showMonthYearPicker
      showFullMonthYearPicker
      customInput={<MonthPickerInput className="btn btn-sm btn-primary" />}
    />
  );
};

export default MonthPicker;