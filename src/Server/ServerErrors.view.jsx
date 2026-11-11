import React from 'react';
import { DataTableCard } from '../shared/components';
import DevLogModal from './DevLogModal';
import useDataModal from '../shared/hooks/useDataModal';
import { SearchDataProvider } from '../shared/context/search-context';
import useTableData from '../shared/hooks/useTableData';
import useDeleteById from '../shared/hooks/useDeleteById';


import serverErrorService from './serverError.service';
import serverErrorColumns from './serverErrors.table';
import { useUserAuth } from '../Auth/auth.service';

const ServerErrors = () => {
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
  } = useTableData('serverErrors', serverErrorService.getAllServerErrors);

  const deleteByIdMutation = useDeleteById(
    ['serverErrors', { page, limit, sortBy, search }],
    serverErrorService.deleteServerError
  );

  const { selectedItem, setSelectedItem, isOpen, setIsOpen } = useDataModal();

  const user = useUserAuth();

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
        <DataTableCard
          title={'Server Errors'}
          columns={serverErrorColumns(user?.role, deleteByIdMutation)}
        />

        <DevLogModal
          isOpen={isOpen}
          toggle={() => setIsOpen((isOpen) => !isOpen)}
          data={selectedItem}
          title={'App Errors'}
        />
      </div>
    </SearchDataProvider>
  );
};

export default ServerErrors;
