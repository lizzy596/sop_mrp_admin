import { authService } from "../Auth/auth.service";
import authHttp from "../Auth/authHttp.service";
import queryString from "query-string";

export function createUser(params) {
  return authHttp.post("/api/users", params);
}

export function updatePassword(password) {
  return authHttp.patch(`/api/users/${authService.userValue.id}`, { password });
}

export function getAllUsers(params) {
  const query = queryString.stringify(params);
  return authHttp.get(`/api/users?${query}`)
}

export function getUser(id) {
  return authHttp.get(`/api/users/${id}`);
}

export function updateUser(id, user) {
  return authHttp.patch(`/api/users/${id}`, user);
}

export function deleteUser(id) {
  return authHttp.delete(`/api/users/${id}`);
}

export function getTimeSeries(params) {
  const query = queryString.stringify(params);
  return authHttp.get(`/api/users/timeSeries?${query}`);
}

export function getUserRoles() {
  return authHttp.get(`/api/users/roles`);
}



const userService = {
  createUser,
  updatePassword,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getTimeSeries,
  getUserRoles
}

export default userService;