import authHttp from "../Auth/authHttp.service";
import queryString from "query-string";



export function getAllServerErrors(params) {
  const query = queryString.stringify(params);
  return authHttp.get(`/server-errors?${query}`)
}

export function getServerError(id) {
  return authHttp.get(`/server-errors/${id}`);
}


export function deleteServerError(id) {
  return authHttp.delete(`/server-errors/${id}`);
}

const serverErrorService = {
  getAllServerErrors,
  getServerError,
  deleteServerError
}

export default serverErrorService;