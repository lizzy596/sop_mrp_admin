import React, { useCallback, useState, useEffect } from 'react';
import { DateRangePicker, Select } from '../../shared/components/InputComponents';
import serverLogService from '../serverLogs.service';
import { useQuery } from 'react-query';
import 'react-datepicker/dist/react-datepicker.css';
import { METHOD_OPTIONS } from './serverlog.options';

const ServerLogsFilter = ({ setFilter }) => {
  const [startDate, setStartDate] = useState(new Date('2024-01-01T00:00:00'));
  const [endDate, setEndDate] = useState(new Date());
  const [method, setMethod] = useState('');
  const [status, setStatus] = useState('');

  const { data, isLoading } = useQuery(
    ['serverLogOptions', { method }],
    async () => {
      // TODO: Update this with serverlog options
      const { data } = await serverLogService.getStatusOptions({ method });
      return data;
    }
  );

  const handleSelectChange = useCallback(
    (caseAction, value) => {
      switch (caseAction) {
        case 'method':
          setMethod(value);
          setFilter((filter) => ({ ...filter, method: value }));
          break;
        case 'status':
          setStatus(value);
          setFilter((filter) => ({ ...filter, status: value }));
          break;
        case 'clear':
          setStatus('');
          setMethod('');
          setStartDate(new Date('2024-01-01T00:00:00').getTime());
          setEndDate(new Date(new Date().setHours(0, 0, 0, 0)).getTime());
          setFilter({});
          break;
        case 'sDate':
          setStartDate(value.getTime());
          setFilter((filter) => ({ ...filter, startDate: value.getTime() }));
          break;
        case 'eDate':
          setEndDate(value.getTime());
          setFilter((filter) => ({ ...filter, endDate: value.getTime() }));
          break;
        default:
          break;
      }
    },
    [method, status, setFilter]
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

            <Select
              id={'statusFilterInput'}
              label={'Status'}
              defaultOption={'Select Status'}
              value={status}
              onChange={(e) => handleSelectChange('status', e.target.value)}
              options={data?.status || []}
            />

            <Select
              id={'methodFilterInput'}
              label={'Method'}
              defaultOption={'Select Method'}
              value={method}
              onChange={(e) => handleSelectChange('method', e.target.value)}
              options={METHOD_OPTIONS}
            />

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

export default ServerLogsFilter;
