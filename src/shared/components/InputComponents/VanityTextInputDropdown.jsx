import React, { useState, useCallback, useEffect } from 'react'



const DropDown = ({ data, onSelect, optionKey }) => {
  return data?.length > 0 ? (
    <ul className="form-control" >
      {data?.map((option, index) => (
        <li key={`${index}-${option?.id}`} onClick={() => onSelect(option)} className="dropdown-item">
          {(optionKey && option?.[optionKey]) || option}
        </li>
      ))}
    </ul>
  ) : null;
}

const VanityTextInputDropdown = ({ label, setSearch, setItem, itemKey, data, defaultItem, bottomLabel, inlineLabel }) => {
  const [isView, setIsView] = useState(true)
  const [viewItem, setViewItem] = useState(defaultItem);
  const [editItem, setEditItem] = useState(defaultItem);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);



  const handleClear = () => {
    setItem("");
    setViewItem(defaultItem);
    setEditItem(defaultItem);
    setIsDropdownVisible(false);
    setIsView(true)
  }

  const handleSelectItem = (item) => {
    setItem(item);
    setViewItem(item[itemKey]);
    setEditItem(item[itemKey]);
    setIsDropdownVisible(false);
    setIsView(true)
  };

  const handleOnChange = useCallback((e) => {
    const text = e.target.value;
    setIsDropdownVisible(true);
    setSearch(text);
    setEditItem(text);
  }, [data])

  const handleOnFocus = useCallback(() => {
    setIsView(false)
  }, []);


  useEffect(() => {
    if (!defaultItem) {
      setViewItem("");
      setEditItem("");
      return;
    };
    setViewItem(defaultItem);
    setEditItem(defaultItem);
  }, [defaultItem]);

  return (
    <div className="col-md-12" style={{ position: "relative" }}>
      {!!label ? (<label htmlFor="inputDropDown" className="form-label">
        {label}
      </label>) : null}

      {isView ? (
        <div className={"input-group mb-3"}>
          <span className="input-group-text" id="basic-addon3">{!!inlineLabel ? inlineLabel : "FEC"}</span>
          <input
            type="text"
            className="form-control"
            id="inputDropDownView"
            placeholder={viewItem || defaultItem}
            value={viewItem}
            onChange={setViewItem}
            onFocus={handleOnFocus}
          />

        </div>
      ) : (
        <div className={"input-group mb-3"}>
          <input
            type="text"
            className="form-control"
            id="inputDropDownEdit"
            value={editItem}
            onChange={handleOnChange}
          />
          <button className="btn btn-outline-black-50" style={{ borderColor: "#dee2e6", fontSize: "0.5em" }} type="button" id="button-addon2"
            onClick={handleClear}
          >{"CLEAR"}</button>
        </div>
      )}

      {isDropdownVisible ? (
        <DropDown
          data={data}
          onSelect={handleSelectItem}
          optionKey={itemKey}
        />
      ) : null}

      {!!bottomLabel ? (<label htmlFor="inputDropDown" className="form-label ps-1">
        {bottomLabel}
      </label>) : null}
    </div>
  );
}

export default VanityTextInputDropdown;