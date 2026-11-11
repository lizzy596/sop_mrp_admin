import React from "react";
import { Select } from "../shared/components/InputComponents";
import authService from "../Auth/auth.service";

const roleOptions = ["user", "admin"]

const UserPasswordModal = ({ isOpen, toggle, data, handleSubmit, title }) => {
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState()

  const onSubmit = React.useCallback(async () => {
    try {
      if (password === "") return;

      await handleSubmit(data.id, { password });
      toggle();
    } catch (err) {
      console.error(err)
    }

  }, [data, password])

  const handleRoleChange = React.useCallback(async (val) => {
    // console.log("Role change", val)
    setRole(val)
    try {
      await handleSubmit(data.id, { role: val });
    } catch (err) {
      console.error(err)
    }
  }, [data])


  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      tabIndex="-1"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {title} - {data?.id}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={toggle}
            ></button>
          </div>
          <div className="modal-body">
            <form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control name-text"
                  id="inputEmail4"
                  placeholder={data?.firstName}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control name-text"
                  id="inputEmail4"
                  placeholder={data?.lastName}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  placeholder={data?.email}
                  disabled
                />
              </div>
              {authService.userValue?.role === "systemAdmin" ? (
                <Select
                  id={'roleSelectInput'}
                  label={'Role'}
                  defaultOption={'Select Role'}
                  value={role || data?.role}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  options={roleOptions}
                />
              ) : (
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Role
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    placeholder={data?.role}
                    disabled
                  />
                </div>
              )}

              <div className="col-md-12">
                <label htmlFor="inputNewPass" className="form-label">
                  Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputNewPass"
                  placeholder={"Change Password"}
                  onChange={(v) => setPassword(v.target.value)}
                  value={password}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => toggle()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPasswordModal;
