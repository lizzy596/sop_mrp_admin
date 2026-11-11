import authService from '../Auth/auth.service';
import moment from "moment"


const aiChatColumns = (
  setViewItem
) => {
  const { role } = authService.userValue;
  return [
    {
      name: 'Started',
      field: 'createdAt',
      maxWidth: '160px',
      sortable: true,
      selector: (row) => {
        return (
          <div className={"mt-stacked-col"}>
            <span>
              {moment(row.createdAt).format("MM-DD-YY (H:mm)")}</span>
          </div>
        )
      },
    },
    {
      name: 'User',
      field: 'user.email',
      // maxWidth: '140px',
      selector: (row) => row?.user?.email,
      // sortable: true,
    },
    {
      name: 'Last Updated',
      field: 'updatedAt',
      maxWidth: '160px',
      sortable: true,
      selector: (row) => {
        return (
          <div className={"mt-stacked-col"}>
            <span>
              {moment(row.updatedAt).format("MM-DD-YY (H:mm)")}</span>
          </div>
        )
      },
    },
    {
      name: 'Messages',
      field: 'messages',
      // maxWidth: '140px',
      selector: (row) => row?.messages?.length,
      // sortable: true,
    },
    {
      field: 'id',
      selector: (row) => {
        return (
          <div className="btn-group" role="group" aria-label="action buttons">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setViewItem(row)}
            >
              <i className="bi bi-eye"></i>
            </button>
          </div>
        );
      },
    },
  ];
}

export default aiChatColumns;
