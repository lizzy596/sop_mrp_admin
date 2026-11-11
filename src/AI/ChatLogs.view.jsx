import React from 'react';
import { useQueryClient } from 'react-query';
import { SearchDataProvider } from '../shared/context/search-context';
import { DataTableCard } from '../shared/components';
import useTableData from '../shared/hooks/useTableData';
import useDataModal from '../shared/hooks/useDataModal';
import aiService from './ai.service';
import aiChatColumns from "./aiChats.table"
import ViewChatModal  from './ViewChatModal.feat'

const ChatLogs = () => {
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
    refetch
  } = useTableData('devices', aiService.queryChatLogs);
  const { selectedItem, setSelectedItem, isOpen, setIsOpen } = useDataModal();
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
          {/* Left side table */}
          <div className="col-9">
            <DataTableCard
              title={'Chat Logs'}
              columns={aiChatColumns(
                setSelectedItem
              )}
            />
          </div>
        </div>

        <ViewChatModal
          isOpen={isOpen}
          toggle={() => setIsOpen((isOpen) => !isOpen)}
          data={selectedItem}
          handleStatusChange={() => console.log()}
          title={'Log'}

        />
      </div>
    </SearchDataProvider>
  );
}

export default ChatLogs;