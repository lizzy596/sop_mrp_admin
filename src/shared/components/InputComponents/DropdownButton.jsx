import React from 'react'


const DropdownButton = ({ options, setSelected, selected }) => {
  const [isDropDown, setIsDropDown] = React.useState(false);


  const toggleDropdown = React.useCallback(() => {
    setIsDropDown(isOpen => !isOpen);
  }, []);

  const handleLeave = React.useCallback(() => {
    setIsDropDown(false)
  }, []);

  const handlePress = React.useCallback((selectedOption) => {
    setSelected(selectedOption)
    setIsDropDown(false)
  }, [])

  return (
    <>

      <button className={`btn btn-outline-primary dropdown-toggle ${isDropDown ? "show" : ""}`} type="button" data-bs-toggle="dropdown" aria-expanded="false"
        onClick={toggleDropdown}
      >{`${selected ? selected.label : "Device Type"}`}</button>

      <ul className={`dropdown-menu dropdown-menu-end ${isDropDown ? "show" : ""}`} style={{ position: "absolute", margin: "0px", transform: "translate(370px, 39px)" }} data-popper-placement="bottom-end"
        onMouseLeave={handleLeave}
      >
        {options.map((item, idx) => (
          <li key={`${item.value}-${idx}`}><div onClick={() => handlePress(item)} className="dropdown-item">{item.label}</div></li>
        ))}
        <li><hr className="dropdown-divider" /></li>
        <li><div onClick={() => handlePress()} className="dropdown-item" >ALL</div></li>
      </ul>
    </>
  );
}

export default DropdownButton;