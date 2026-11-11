import React, { useState, useCallback, useEffect } from "react";
import { TextInput } from "../shared/components/InputComponents";
import { createUserValidate } from "./user.validation";
import userService from "./user.service";

const UserEditModal = ({ isOpen, toggle, data, handleSubmit, title }) => {
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState(data?.firstName || "");
  const [lastName, setLastName] = useState(data?.lastName || "");
  const [email, setEmail] = useState(data?.email || "");
  const [role, setRole] = useState("user");
  const [userRoles, setUserRoles] = useState(["user"])

  const closeModal = useCallback(() => {
    toggle();
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("user");
    setErrors("");
  }, [])

  const handleCreateUser = useCallback(async () => {
    const [value, err] = await createUserValidate(
      {
        firstName,
        lastName,
        email,
        // password,
        role,
      }
    );
    if (err) {
      const message = err?.type === "email" ? "Must be a valid email" : "Field is required";
      return setErrors({ [err.path]: message });
    }
    try {
      const res = await userService.createUser(value);
      if (res?.isError) {
        return setErrors({ email: res?.data?.message });
      }
      handleSubmit();
      closeModal();
    } catch (error) {
      console.error(error.message)
    }
  }, [firstName,
    lastName,
    email,
    role]);

  const getUserRoles = useCallback(async () => {
    try {
      const res = await userService.getUserRoles();
      if (res?.data?.roles?.length > 1) setUserRoles(res.data.roles)
    } catch { }
  }, []);

  useEffect(() => {
    getUserRoles().then(() => { })
  }, [])

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
                <TextInput
                  id={"opAddFirstId"}
                  label={"First"}
                  placeholder={"Name"}
                  errors={errors?.firstName}
                  required={true}
                  value={firstName}
                  setValue={setFirstName}
                  onFocus={() => setErrors({})}
                />
              </div>
              <div className="col-md-6">
                <TextInput
                  id={"opAddLastId"}
                  label={"Last"}
                  placeholder={"Name"}
                  errors={errors?.lastName}
                  value={lastName}
                  setValue={setLastName}
                  onFocus={() => setErrors({})}
                />
              </div>
              <div className="col-md-12">
                <TextInput
                  id={"opAddEmailId"}
                  type={"email"}
                  label={"Email"}
                  placeholder={"email"}
                  errors={errors?.email}
                  value={email}
                  setValue={setEmail}
                  onFocus={() => setErrors({})}
                />
              </div>
              <div className="col-md-12">
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="floatingInputHost"
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    {userRoles?.map((uRole, i) => (
                      <option key={`${uRole}-${i}`}>{`${uRole}`}</option>
                    ))}

                  </select>

                  <label htmlFor="floatingInputHost">Role</label>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreateUser}
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

export default UserEditModal;
