import React from 'react';

const DataTableSearch = ({ title, search, setSearch, isSearch }) => {
  return (
    <div
      className="container-fluid d-grid gap-3 align-items-center"
      style={{ gridTemplateColumns: '1fr 2fr' }}
    >
      <h3>{title}</h3>
      <div className="d-flex align-items-center">
        {isSearch && (
          <form className="w-100 me-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default DataTableSearch;
