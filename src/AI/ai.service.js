import authHttp from "../Auth/authHttp.service";
import queryString from "query-string";

// Agents
function createAgent(params) {
  return authHttp.post("/ai/agents", params);
}

function queryAgents(params) {
  const query = queryString.stringify(params);
  return authHttp.get(`/ai/agents?${query}`)
}

function getAgent(id) {
  return authHttp.get(`/ai/agents/${id}`);
}

// Chats
function createChat(params) {
  return authHttp.post("/ai/chats", params);
}
function queryChats(params) {
  const query = queryString.stringify(params);
  return authHttp.get(`/ai/chats?${query}`)
}

function getChat(id) {
  return authHttp.get(`/ai/chats/${id}`);
}

// send
function sendChatMessage(id, params) {
  return authHttp.put(`/ai/chats/${id}`, params);
}

function queryChatLogs(params) {
  const query = queryString.stringify(params);
  return authHttp.get(`/ai/chat-logs?${query}`)
}

const aiService = {
  createAgent,
  queryAgents,
  getAgent,
  createChat,
  queryChats,
  getChat,
  sendChatMessage,
  queryChatLogs
}

export default aiService;