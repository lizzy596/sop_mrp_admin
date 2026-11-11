import moment from 'moment';

const serverErrorColumns = (role, deleteByIdMutation) => {
  return [
    {
      name: 'Date',
      field: 'createdAt',
      selector: (row) => {
        return moment(row.createdAt).format('MM/DD/YY - HH:mm:ss');
      },
      sortable: true,
    },
    {
      name: 'User',
      field: 'user',
      selector: (row) => row?.user?.email,
      sortable: true,
    },
    {
      name: 'IP',
      field: 'ip',
      selector: (row) => row?.ip,
      sortable: true,
    },

    {
      name: 'Message',
      field: 'message',
      selector: (row) => row?.message,
      sortable: true,
    },
    {
      name: 'Code',
      field: 'code',
      selector: (row) => row?.code,
      sortable: true,
    },
    {
      name: 'Device(s)',
      field: 'device',
      selector: (row) =>
        row?.device?.length > 0 ? (
          row?.device.map((device, index) => (
            <span key={`${device}-${index}`}>{`${device} `}</span>
          ))
        ) : (
          <span></span>
        ),
      sortable: true,
    },
    {
      field: 'id',
      selector: (row) => {
        return (
          <div className="btn-group" role="group" aria-label="Basic example">
            {(role === 'systemAdmin' || role === 'admin') && (
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  deleteByIdMutation.mutate(row.id);
                }}
              >
                <i className="bi bi-trash"></i>
              </button>
            )}

            {/* <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setView(row)}
            >
              <i className="bi bi-eye"></i>
            </button> */}
            {/* {email !== row.email && (
              <>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => deleteByIdMutation.mutate(row.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
                {row.role === 'admin' && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      updateByIdMutation.mutate({
                        id: row.id,
                        update: { role: 'user' },
                      })
                    }
                  >
                    <i className="bi bi-person-dash"></i>
                  </button>
                )}
                {row.role !== 'admin' && (
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() =>
                      updateByIdMutation.mutate({
                        id: row.id,
                        update: { role: 'admin' },
                      })
                    }
                  >
                    <i className="bi bi-person-plus"></i>
                  </button>
                )}
              </>
            )} */}
          </div>
        );
      },
    },
  ];
};

export default serverErrorColumns;
