import React, { useState, useCallback, useEffect } from "react";
import { TextInput } from "../shared/components/InputComponents";
import { createItemValidate } from "./item.validation";
import itemService from "./item.service";

const ItemEditModal = ({ isOpen, toggle, data, handleSubmit, title }) => {
  const [errors, setErrors] = useState({});
  const [itemNumber, setItemNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  // Populate form fields when editing an existing item or clear them when closed
  useEffect(() => {
    if (data) {
      setItemNumber(data?.itemNumber || "");
      setQuantity(data?.quantity !== undefined && data?.quantity !== null ? String(data.quantity) : "");
      setDescription(data?.description || "");
    } else {
      setItemNumber("");
      setQuantity("");
      setDescription("");
    }
    setErrors({});
  }, [data, isOpen]);

  const closeModal = useCallback(() => {
    toggle();
    setItemNumber("");
    setQuantity("");
    setDescription("");
    setErrors({});
  }, [toggle]);

  const handleSaveItem = useCallback(async () => {
    const payload = {
      itemNumber,
      quantity: quantity === "" ? "" : Number(quantity),
      description,
    };

    const [value, err] = await createItemValidate(payload);
    if (err) {
      const message = err?.type === "number" ? "Must be a valid number" : "Field is required";
      return setErrors({ [err.path]: message });
    }

    try {
      let res;
      // If data has an ID, update the existing item; otherwise, create a new one
      if (data?.id) {
        res = await itemService.updateItem(data.id, value);
      } else {
        res = await itemService.createItem(value);
      }

      if (res?.isError) {
        return setErrors({ itemNumber: res?.data?.message || "An error occurred" });
      }

      handleSubmit();
      closeModal();
    } catch (error) {
      console.error(error.message);
    }
  }, [itemNumber, quantity, description, data, handleSubmit, closeModal]);

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
              {title} {data?.id ? `#${data.id}` : ""}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
              <div className="col-md-12">
                <TextInput
                  id={"itemNumberId"}
                  label={"Item Number"}
                  placeholder={"Enter item number"}
                  errors={errors?.itemNumber}
                  required={true}
                  value={itemNumber}
                  setValue={setItemNumber}
                  onFocus={() => setErrors({})}
                />
              </div>
              <div className="col-md-12">
                <TextInput
                  id={"itemQuantityId"}
                  type={"number"}
                  label={"Quantity"}
                  placeholder={"Enter quantity"}
                  errors={errors?.quantity}
                  required={true}
                  value={quantity}
                  setValue={setQuantity}
                  onFocus={() => setErrors({})}
                />
              </div>
              <div className="col-md-12">
                <TextInput
                  id={"itemDescriptionId"}
                  label={"Description"}
                  placeholder={"Enter item description"}
                  errors={errors?.description}
                  value={description}
                  setValue={setDescription}
                  onFocus={() => setErrors({})}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveItem}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemEditModal;