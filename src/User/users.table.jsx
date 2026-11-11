import authService from '../Auth/auth.service';

const accessColor = {
  admin: 'text-primary text-uppercase',
  user: 'text-black text-uppercase',
  systemAdmin: 'text-danger text-uppercase',
  fecAdmin: 'text-info text-uppercase',
  fecOperator: 'text-warning text-uppercase',
  support: 'text-primary text-uppercase',
};

const userColumns = (setView, deleteById, updateUserById, setSelectedUpdate) => {
  const { email, role } = authService.userValue;
  return [
    {
      name: 'First',
      field: 'firstName',
      maxWidth: '150px',
      selector: (row) => <span className={"name-text"}>{row?.firstName}</span>,
      sortable: true,
    },
    {
      name: 'Last',
      field: 'lastName',
      maxWidth: '150px',
      selector: (row) => <span className={"name-text"}>{row?.lastName}</span>,
      sortable: true,
    },
    {
      name: 'Email',
      field: 'email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Role',
       maxWidth: '150px',
      field: 'role',
      selector: (row) => {
        return <span className={accessColor[row.role]}>{row.role}</span>;
      },
      sortable: true,
    },
    {
      field: 'id',
      selector: (row) => {
        return (
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setView(row)}
            >
              <i className="bi bi-eye"></i>
            </button>
            {role !== "systemAdmin" ? (
              <>
                {row?.role !== "admin" ? (<button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => deleteById(row.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>) : null}
              </>) : (
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => deleteById(row.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            )}


            {role === "systemAdmin" && email !== row.email && (
              <>
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={() => setSelectedUpdate(row)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                {row.role === 'admin' && (
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => updateUserById(row.id, { role: 'user' })}
                  >
                    <i className="bi bi-person-dash"></i>
                  </button>
                )}
                {row.role === 'user' && (
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => updateUserById(row.id, { role: 'admin' })}
                  >
                    <i className="bi bi-person-plus"></i>
                  </button>
                )}
              </>
            )}
          </div>
        );
      },
    },
  ];
};

export default userColumns;
