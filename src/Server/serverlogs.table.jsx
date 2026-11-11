import moment from 'moment';

const accessColor = (status) => {
  if (status < 300) return 'text-success';
  if (status < 400) return 'text-info';
  if (status < 500) return 'text-danger';

  return 'text-warning';
};

const serverColumns = (setView, selectedItem) => {
  return [
    {
      name: 'Date',
      field: 'createdAt',
      maxWidth: '170px',
      selector: (row) => {
        return moment(row.createdAt).format('MM/DD/YY - h:mm:ss a');
      },
      sortable: true,
      grow: 2,
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
      name: 'Uri',
      field: 'uri',
      selector: (row) => row.uri,
      sortable: true,
      grow: 1,
    },

    // {
    //   name: 'Args',
    //   field: 'args',
    //   selector: (row) => row.args,
    //   sortable: true,
    //   grow: 2,
    // },
    {
      name: 'Method',
      field: 'method',
      maxWidth: '50px',
      selector: (row) => row.method,
      sortable: true,
      grow: 0,
    },

    {
      name: 'IP',
      field: 'address',
      selector: (row) => row.address,
      sortable: true,
      //grow: 3,
    },

    {
      field: 'id',
      maxWidth: '50px',
      selector: (row) => {
        return (
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className={`btn ${
                selectedItem?.id === row.id
                  ? 'btn-primary'
                  : 'btn-outline-primary'
              }`}
              onClick={() => setView(row)}
            >
              <i className="bi bi-eye"></i>
            </button>
          </div>
        );
      },
    },
  ];
};

export default serverColumns;
