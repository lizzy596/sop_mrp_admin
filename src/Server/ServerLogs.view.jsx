import React from 'react';

import { SearchDataProvider } from '../shared/context/search-context';

// Hooks
import useTableData from '../shared/hooks/useTableData';
import useDataModal from '../shared/hooks/useDataModal';


// Services
import serverLogService from './serverLogs.service';

// Components
import { DataTableCard} from '../shared/components';
import {ServerLogsFilter} from './ServerLogsFilter';
import  ServerLogViewer from './ServerLogViewer.feat';
import serverColumns from './serverlogs.table';

const ServerLogs = () => {

  const {
    data,
    page,
    setPage,
    limit,
    setLimit,
    isLoading,
    setSortBy,
    sortBy,
    search,
    setSearch,
    setFilter,
  } = useTableData('serverLogs', serverLogService.queryAccessLogs);


  const { selectedItem, setSelectedItem, isOpen, setIsOpen } = useDataModal();


  return (
    <SearchDataProvider
      value={{
        data,
        limit,
        setLimit,
        page,
        setPage,
        isLoading,
        setSortBy,
        search,
        setSearch,
      }}
    >
      <div className="container p-0 ms-5 mt-5">
        <div className="row">
          {/* Left side table */}
          <div className="col-9">
            <DataTableCard
              title={'Server Logs'}
              columns={serverColumns(setSelectedItem, selectedItem)}
            />
          </div>

          {/* Right side log viewer or filter options */}
          <div className="col-3">
            {isOpen ? (
              <ServerLogViewer
                data={selectedItem}
                toggle={() => setIsOpen((isOpen) => !isOpen)}
              />
            ) : (
              <ServerLogsFilter setFilter={setFilter} />
            )}
          </div>
        </div>
      </div>
    </SearchDataProvider>
  );
};

export default ServerLogs;
