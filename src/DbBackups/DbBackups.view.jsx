import React, { useState } from 'react';
import { useParams } from 'react-router'
import { useQueryClient } from 'react-query';
import { SearchDataProvider } from '../shared/context/search-context';

// Hooks
import useTableData from '../shared/hooks/useTableData';

// Services
import dbBackupService from './dbBackup.service';

// Components
import { DataTableCard, DateFilter } from '../shared/components';
import dbBackupsColumns from './dbBackups.table';

import authService from '../Auth/auth.service';

const DbBackups = () => {
  const params = useParams();
  const [db, setDb] = useState("pro");


  const queryClient = useQueryClient();
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
    filter,
  } = useTableData(`dbBackups-${db}`, dbBackupService.getAllBackups, {
    refetchInterval: 5000,
  });

  React.useEffect(() => {
    if (params?.db) {
      setDb(params.db)
      setFilter(v => ({ ...v, server: params.db }))
    }
  }, [params])

  const handleRefreshQuery = async () => {
    await queryClient.invalidateQueries(
      ['dbBackups', { page, limit, sortBy, search, ...filter }],
      { refetchActive: true, refetchInactive: false }
    );
  };

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
          <div className="col-10">
            <DataTableCard title={`DB Backups - ${db.toUpperCase()}`} columns={dbBackupsColumns(db)} />
          </div>

          {/* Right side log viewer or filter options */}
          <div className="col-2">
            <DateFilter setFilter={setFilter} />
          </div>
        </div>
        {authService?.userValue?.role === "systemAdmin" ? (
          <div className="row mt-4">
            <div className="col">
              <button
                className="btn btn-primary"
                onClick={async () => {
                  await dbBackupService.createBackup({ server: db });
                  handleRefreshQuery();
                }}
              >
                {'Create Backup'}
              </button>
            </div>
          </div>
        ) : null}

      </div>
    </SearchDataProvider>
  );
};

export default DbBackups;
