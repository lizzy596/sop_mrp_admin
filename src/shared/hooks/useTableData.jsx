import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import useDebounce from './useDebounce';

const useTableData = (queryKey, getService, options) => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [debounceSearch, setDebounceSearch] = useDebounce(500, '');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('_id:asc');
  const [filter, setFilter] = useState({});
  const [queryOptions, setQueryOptions] = useState({})
  const [subSortBy, setSubSortBy] = useState()

  useEffect(() => {
    setDebounceSearch(search);
  }, [search])

  /**
 * Get data service handler
 */
  const getData = useCallback(async (page, limit, sortBy, debounceSearch, filter, subSortBy) => {
    const params = {
      page,
      limit,
      sortBy,
      search: debounceSearch,
      ...filter,
    }

    if (!!subSortBy) {
      Object.assign(params, { subSortBy })
    }

    if (options?.id && typeof options.id === "string") {
      const { data } = await getService(options.id, params);
      return data;
    }

    const { data } = await getService(params);
    return data;
  }, [queryKey, page, limit, sortBy, debounceSearch, filter, options, subSortBy]);

  /**
 * Prefetch the previous and next page
 */
  const preFetch = useCallback(async () => {
    // Prefetch next page
    await queryClient.prefetchQuery(
      [queryKey, { page: page + 1, limit, sortBy, debounceSearch, ...filter, subSortBy }],
      () => getData(page + 1, limit, sortBy, debounceSearch, filter, subSortBy),
      {
        ...options,
        staleTime: 10 * 1000, // only prefetch if older than 10 seconds
      }
    );
  }, [queryKey, page, limit, sortBy, debounceSearch, filter, options, subSortBy]);

  const { data, isLoading, refetch } = useQuery(
    [queryKey, { page, limit, sortBy, debounceSearch, ...filter, ...options, ...queryOptions, subSortBy }],
    () => getData(page, limit, sortBy, debounceSearch, filter, subSortBy),
    {
      ...options,
      ...queryOptions,
      keepPreviousData: true
    }
  );

  /* Prefecth the previous and next page on any query changes */
  useEffect(() => {
    preFetch();
  }, [queryKey, page, limit, sortBy, debounceSearch, filter, options, subSortBy
  ]);

  return {
    data: data,
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    isLoading,
    sortBy,
    setSortBy,
    setFilter,
    filter,
    refetch,
    setQueryOptions,
    subSortBy, setSubSortBy
  };
};

export default useTableData;
