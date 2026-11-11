import authService from '../Auth/auth.service';

const accessColor = {
  admin: 'text-primary text-uppercase',
  item: 'text-black text-uppercase',
  systemAdmin: 'text-danger text-uppercase',
  fecAdmin: 'text-info text-uppercase',
  fecOperator: 'text-warning text-uppercase',
  support: 'text-primary text-uppercase',
};

const itemColumns = (setView, deleteById, updateItemById, setSelectedEditItem, setIsEditOpen) => {
  const { role } = authService.userValue;
  return [
    {
      name: 'Item Number',
      field: 'itemNumber',
      maxWidth: '150px',
      selector: (row) => <span className={"name-text"}>{row?.itemNumber}</span>,
      sortable: true,
    },
    {
      name: 'Quantity',
      field: 'quantity',
      maxWidth: '150px',
      selector: (row) => <span className={"name-text"}>{row?.quantity}</span>,
      sortable: true,
    },
    {
      name: 'Description',
      field: 'description',
      selector: (row) => row.description,
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
                {row?.role !== "admin" ? (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => deleteById(row.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                ) : null}
              </>
            ) : (
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => deleteById(row.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            )}
            {(role === "systemAdmin" || role === "admin" || role === "support") && (
              <button
                type="button"
                className="btn btn-outline-warning"
                onClick={() => {
                  setSelectedEditItem(row);
                  setIsEditOpen(true);
                }}
              >
                <i className="bi bi-pencil-square"></i>
              </button>
            )}
          </div>
        );
      },
    },
  ];
};

export default itemColumns;