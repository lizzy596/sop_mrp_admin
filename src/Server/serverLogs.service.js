import authHttp from "../Auth/authHttp.service";
import queryString from "query-string";

export function queryAccessLogs(params) {
  const query = queryString.stringify(params);
  return authHttp.get(`/accessLog?${query}`)
};

export function getAccessLogById(id) {
  return authHttp.get(`/accessLog/${id}`);
};

export function deleteAccessLog(id) {
  return authHttp.delete(`/accessLog/${id}`);
};

export function getStatusOptions(params) {
  const query = queryString.stringify(params);
  return authHttp.get(`/accessLog/options?${query}`);
}

export function getRequestTimeSeries(params) {
  const query = queryString.stringify(params);
  return authHttp.get(`/accessLog/timeSeries?${query}`);
}


const serverLogService = {
  queryAccessLogs,
  getAccessLogById,
  deleteAccessLog,
  getStatusOptions,
  getRequestTimeSeries
}

export default serverLogService;