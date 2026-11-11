import React, { useCallback, useState } from 'react';
import useEditModal from '../shared/hooks/useEditModal';
import UserEditModal from './UserEditModal';
import  UserPasswordModal  from './UserPasswordModal';
import UserModal from './UserModal';
import { DataTableCard } from '../shared/components';
import useDataModal from '../shared/hooks/useDataModal';
import useTableData from '../shared/hooks/useTableData';
import userColumns from './users.table';
import { SearchDataProvider } from '../shared/context/search-context';
import authService from '../Auth/auth.service';
import userService from './user.service';

const Users = () => {
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
  } = useTableData('users', userService.getAllUsers);

  const [selectedUpdate, setSelectedUpdate] = useState();

  const deleteById = useCallback(async (id) => {
    try {
      await userService.deleteUser(id);
      refetch();
    } catch {
      return
    }
  }, []);

  const updateUserById = useCallback(async (id, update) => {
    try {
      await userService.updateUser(id, update);
      refetch();
    } catch {
      return;
    }
  }, [])



  const { selectedItem, setSelectedItem, isOpen, setIsOpen } = useDataModal();
  const { selectedEditItem, isEditOpen, setIsEditOpen } = useEditModal();

  const handleRefreshQuery = async () => {
    refetch()
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
              title={'System Users'}
              columns={userColumns(
                setSelectedItem,
                deleteById,
                updateUserById,
                setSelectedUpdate
              )}
            />
            {(role === 'admin' || role === 'systemAdmin' || role === 'support') && (<div className="row mt-4">
              <div className="col">
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditOpen((isEditOpen) => !isEditOpen)}
                >
                  Add User
                </button>
              </div>
            </div>)}

          </div>
          <div className="col-3">
            {/* <ActiveUserListCard /> */}
          </div>
        </div>
        <UserModal
          isOpen={isOpen}
          toggle={() => setIsOpen((isOpen) => !isOpen)}
          data={selectedItem}
          handleStatusChange={() => console.log()}
          title={'User'}
        />
        <UserEditModal
          isOpen={isEditOpen}
          toggle={() => setIsEditOpen((isEditOpen) => !isEditOpen)}
          data={selectedEditItem}
          handleSubmit={handleRefreshQuery}
          title={'User'}
        />
        {selectedUpdate && (
          <UserPasswordModal
            isOpen={!!selectedUpdate}
            toggle={() => setSelectedUpdate()}
            data={selectedUpdate}
            handleSubmit={updateUserById}
            title={'Password'}
          />
        )}

      </div>
    </SearchDataProvider>
  );
};

export default Users;
