import React, { useCallback } from 'react'
import AgentChatCard from './AgentChatCard.feat'
import AgentHistoryCard from './AgentHistoryCard.feat'
import aiQuery  from "./ai.query"
import aiService from './ai.service'

const AGENT_ID = "69080c07945bb71c69d47927"


const KnowledgeBase = ({ }) => {
  const { data: agents } = aiQuery.useAgentsQuery();
  const { data: chats, refetch } = aiQuery.useChatSessionsQuery(AGENT_ID);
  const { data: messages, refetch: reFETCH, setChatId, chatId } = aiQuery.useChatQuery();

  const handleCreate = useCallback(async () => {
    try {
      if (chats?.length > 0 && messages?.length < 1) return;
      await aiService.createChat({ agent: AGENT_ID })
      refetch();
    } catch (err) { console.error(err) }
  }, [messages])
  const handleSelectChat = useCallback((id) => {
    if (!id) return;
    setChatId(id);
  }, []);

  const handleSendMessage = useCallback(async (content) => {
    if (!chatId) return;
    try {
      const { data } = await aiService.sendChatMessage(chatId, { content });
      console.log("DATA", data);
      reFETCH();
      return data?.messages;
    } catch (err) { console.error(err) }
  }, [chatId])

  return (
    <div className="container-fluid p-4 mt-4">
      <div className="row">
        <div className="col-7">
          <AgentChatCard agent={agents[0]} messageList={messages} handleSendMessage={handleSendMessage} />
        </div>
        <div className="col-3">
          <AgentHistoryCard
            handleCreate={handleCreate}
            chatSessions={chats}
            onSelectSession={handleSelectChat}
            selectedSessionId={chatId}
          />
        </div>
      </div>
    </div>
  );
}

export default KnowledgeBase;