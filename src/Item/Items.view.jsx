import React, { useCallback } from 'react';
import useEditModal from '../shared/hooks/useEditModal';
import { DataTableCard } from '../shared/components';
import ItemEditModal from './ItemEditModal';
import ItemModal from './ItemModal';
import useDataModal from '../shared/hooks/useDataModal';
import useTableData from '../shared/hooks/useTableData';
import itemColumns from './items.table';
import { SearchDataProvider } from '../shared/context/search-context';
import authService from '../Auth/auth.service';
import itemService from './item.service';

const Items = () => {
  const { role } = authService.userValue;
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
    refetch
  } = useTableData('items', itemService.getAllItems);

  const deleteById = useCallback(async (id) => {
    try {
      await itemService.deleteItem(id);
      refetch();
    } catch {
      return;
    }
  }, [refetch]);

  const updateItemById = useCallback(async (id, update) => {
    try {
      await itemService.updateItem(id, update);
      refetch();
    } catch {
      return;
    }
  }, [refetch]);

  const { selectedItem, setSelectedItem, isOpen, setIsOpen } = useDataModal();
  // Destructure setSelectedEditItem from your edit modal hook
  const { selectedEditItem, setSelectedEditItem, isEditOpen, setIsEditOpen } = useEditModal();

  const handleRefreshQuery = async () => {
    refetch();
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
        isSearch: true,
      }}
    >
      <div className="container p-0 ms-5 mt-5">
        <div className="row">
          <div className="col-11">
            <DataTableCard
              title={'System Items'}
              columns={itemColumns(
                setSelectedItem,
                deleteById,
                updateItemById,
                setSelectedEditItem, // Pass setSelectedEditItem here
                setIsEditOpen        // Pass toggle function to open modal on edit
              )}
            />
            {(role === 'admin' || role === 'systemAdmin' || role === 'support') && (
              <div className="row mt-4">
                <div className="col">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedEditItem(null); // Clear data so it's a fresh "Add"
                      setIsEditOpen(true);
                    }}
                  >
                    Add Item
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <ItemModal
          isOpen={isOpen}
          toggle={() => setIsOpen((isOpen) => !isOpen)}
          data={selectedItem}
          title={'Item'}
        />
        <ItemEditModal
          isOpen={isEditOpen}
          toggle={() => setIsEditOpen((isEditOpen) => !isEditOpen)}
          data={selectedEditItem}
          handleSubmit={handleRefreshQuery}
          title={selectedEditItem ? 'Edit Item' : 'Add Item'}
        />
      </div>
    </SearchDataProvider>
  );
};

export default Items;