import authHttp from "../Auth/authHttp.service";
import queryString from "query-string";

export function createBackup(params) {
  return authHttp.post("/db-backups", params);
}


export function getAllBackups(params) {
  const query = queryString.stringify(params);
  return authHttp.get(`/db-backups?${query}`)
}

export function getBackup(server, id) {
  return authHttp.get(`/db-backups/${id}?server=${server}`);
}

export async function downloadBackup(server, id) {
  try {
    const result = await getBackup(server, id);
    const downloadUrl = result?.data?.link;
    if (downloadUrl) {
      // Open the download link directly in a new tab to avoid CORS issues
      window.open(downloadUrl, '_blank');
    } else {
      console.error('Download link not found');
    }

    // const res = await axios.get(result?.data?.link, {
    //   responseType: 'blob',
    // });

    // // const filename = res.headers["x-file-name"];
    // const url = window.URL.createObjectURL(
    //   new Blob([res.data]),
    // );
    // const link = document.createElement('a');
    // link.href = url;
    // link.setAttribute(
    //   'download',
    //   `${result?.data?.file}.gz`,
    // );

    // document.body.appendChild(link);
    // link.click();
    // link.parentNode.removeChild(link);
  } catch (err) {
    console.error(err);
  }

}



const backupService = {
  createBackup,
  getAllBackups,
  getBackup,
  downloadBackup
}

export default backupService;