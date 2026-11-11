import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { SearchData } from '../../context/search-context';
import DataTableSearch from './DataTableSearch';


const DataTableCard = ({ title, columns, footer }) => {
  const {
    data,
    limit,
    setLimit,
    setPage,
    isLoading,
    setSortBy,
    search,
    setSearch,
    isSearch,
  } = useContext(SearchData);

  return (
    <div className="card mt-3 chart-card">
      <div className="card-header">
        <DataTableSearch
          title={title}
          search={search}
          setSearch={setSearch}
          isSearch={isSearch}
        />

      </div>
      <div className="card-body">
        <DataTable
          columns={columns}
          data={data?.results}
          progressPending={isLoading}
          sortServer
          onSort={(column, sortDirection) => {
            if (column?.sortable) {
              setSortBy(`${column.field}:${sortDirection}`)
            }

          }}
          pagination
          paginationServer
          paginationPerPage={limit}
          onChangeRowsPerPage={(newLimit, newPage) => {
            setLimit(newLimit);
            setPage(newPage);
          }}
          onChangePage={setPage}
          paginationTotalRows={data?.totalResults}
          responsive
          striped
        />
        {footer ? (
          <div>{footer}</div>
        ) : null}
      </div>
    </div>
  );
};

export default DataTableCard;
