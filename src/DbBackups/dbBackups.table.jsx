import moment from 'moment';
import dbBackupService from './dbBackup.service';

const accessColor = (status) => {
  if (status === 'pending') return 'text-warning';
  if (status === 'completed') return 'text-success';
  if (status === 'failed') return 'text-danger';

  return null;
};

const dbBackupsColumns = (server) => {
  return [
    {
      name: 'Date',
      field: 'createdAt',
      maxWidth: '180px',
      selector: (row) => {
        return moment(row.createdAt).format('MM/DD/YY - h:mm:ss a');
      },
      sortable: true,
    },
    {
      name: 'Status',
      field: 'status',
      maxWidth: '50px',
      selector: (row) => {
        return <span className={accessColor(row.status)}>{row.status}</span>;
      },
      sortable: true,
    },
    {
      name: 'User',
      field: 'uri',
      selector: (row) => row?.user?.email,
    },

    {
      name: 'IP',
      field: 'ip',
      selector: (row) => row.ip,
      sortable: true,
    },
    {
      name: 'Col',
      field: 'collectionCount',
      maxWidth: '20px',
      selector: (row) => row.collectionCount,
      sortable: true,
    },
    {
      name: 'Rec',
      field: 'recordCount',
      maxWidth: '50px',
      selector: (row) => row.recordCount,
      sortable: true,
    },
    {
      name: 'Users',
      field: 'userCount',
      maxWidth: '50px',
      selector: (row) => row.userCount,
      sortable: true,
    },
    {
      field: 'id',
      maxWidth: '50px',
      selector: (row) => {
        return (
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => dbBackupService.downloadBackup(server, row.id)}
            >
              <i className="bi bi-cloud-download"></i>
            </button>
          </div>
        );
      },
    },
  ];
};

export default dbBackupsColumns;
