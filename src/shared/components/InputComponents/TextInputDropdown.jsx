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

const TextInputDropdown = ({ label, setSearch, setItem, itemKey, data, defaultItem, bottomLabel }) => {
  const [isView, setIsView] = useState(true)
  const [viewItem, setViewItem] = useState(defaultItem);
  const [editItem, setEditItem] = useState(defaultItem);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSelectItem = (item) => {
    setItem(item);
    setViewItem(item[itemKey]);
    setEditItem(item[itemKey]);
    setIsDropdownVisible(false);
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
        <input
          type="text"
          className="form-control"
          id="inputDropDownView"
          placeholder={viewItem || defaultItem}
          value={viewItem}
          onChange={setViewItem}
          onFocus={handleOnFocus}
        />
      ) : (
        <input
          type="text"
          className="form-control"
          id="inputDropDownEdit"
          value={editItem}
          onChange={handleOnChange}
        />
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

export default TextInputDropdown;