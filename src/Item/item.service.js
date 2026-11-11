import { authService } from "../Auth/auth.service";
import authHttp from "../Auth/authHttp.service";
import queryString from "query-string";

export function createItem(params) {
  return authHttp.post("/api/items", params);
}

export function getAllItems(params) {
  const query = queryString.stringify(params);
  return authHttp.get(`/api/items?${query}`)
}

export function getItem(id) {
  return authHttp.get(`/api/items/${id}`);
}

export function updateItem(id, item) {
  return authHttp.put(`/api/items/${id}`, item);
}

export function deleteItem(id) {
  return authHttp.delete(`/api/items/${id}`);
}

export function getTimeSeries(params) {
  const query = queryString.stringify(params);
  return authHttp.get(`/api/items/timeSeries?${query}`);
}





const itemService = {
  createItem,
  getAllItems,
  getItem,
  updateItem,
  deleteItem,
  getTimeSeries,
}

export default itemService;