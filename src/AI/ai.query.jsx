import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import useDebounce from '../shared/hooks/useDebounce';
import aiService from "./ai.service"


const useAgentsQuery = () => {
  const { data, isLoading, refetch } = useQuery(
    ["agents", {}],
    async () => {
      const { data } = await aiService.queryAgents({
        page: 1,
        limit: 20,
        sortBy: "createdAt:desc"
      });
      return data;
    },
    {
      keepPreviousData: true
    }
  );

  return {
    data: data?.results || [],
    isLoading,
    refetch
  };
}

const useChatSessionsQuery = (id) => {
  const [agentId] = useState(id)
  const [search, setSearch] = useState('');
  const [debounceSearch, setDebounceSearch] = useDebounce(500, '');
  useEffect(() => {
    setDebounceSearch(search);
  }, [search]);

  const { data, isLoading, refetch } = useQuery(
    ["chatSession", { debounceSearch, agentId }],
    async () => {
      const { data } = await aiService.queryChats({
        page: 1,
        limit: 20,
        sortBy: "createdAt:asc",
        search: debounceSearch,
        agentId
      });
      return data;
    },
    {
      keepPreviousData: true
    }
  );

  return {
    data: data?.results || [],
    search,
    setSearch,
    isLoading,
    refetch
  };
}

const useChatQuery = () => {
  const [chatId, setChatId] = useState("")

  const { data, isLoading, refetch } = useQuery(
    ["agent-chat", { chatId }],
    async () => {
      const { data } = await aiService.getChat(chatId);
      return data;
    },
    {
      keepPreviousData: true
    }
  );

  return {
    data: data?.messages || [],
    isLoading,
    refetch,
    setChatId,
    chatId
  };
}

const query = {
  useChatSessionsQuery,
  useChatQuery,
  useAgentsQuery
}

export default query