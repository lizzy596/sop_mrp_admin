import React, { useCallback, useState } from 'react';
import { DateRangePicker } from '../InputComponents';
import 'react-datepicker/dist/react-datepicker.css';

const DateFilter = ({ setFilter }) => {
  const [startDate, setStartDate] = useState(new Date('2023-01-01T00:00:00'));
  const [endDate, setEndDate] = useState(new Date());

  const handleSelectChange = useCallback(
    (caseAction, value) => {
      switch (caseAction) {
        case 'clear':
          setStartDate(new Date('2023-01-01T00:00:00').getTime());
          setEndDate(new Date(new Date().setHours(0, 0, 0, 0)).getTime());
          setFilter({ db: "nexus-system" });
          break;
        case 'sDate':
          setStartDate(value.getTime());
          setFilter((filter) => ({ ...filter, startDate: value.getTime(), db: "nexus-system" }));
          break;
        case 'eDate':
          setEndDate(value.getTime());
          setFilter((filter) => ({ ...filter, endDate: value.getTime(), db: "nexus-system" }));
          break;
        default:
          break;
      }
    },
    [setFilter]
  );

  return (
    <div className="card mt-3 ">
      <div className="card-header">
        <h3>{'Filter'}</h3>
      </div>
      <div className="card-body">
        <div>
          <form>
            <div className="form-floating mb-3">
              <DateRangePicker
                className="form-control"
                startDate={startDate}
                setStartDate={(sDate) => handleSelectChange('sDate', sDate)}
                endDate={endDate}
                setEndDate={(eDate) => handleSelectChange('eDate', eDate)}
                isClearable={true}
              />
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSelectChange('clear', '')}
              >
                {'Clear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
