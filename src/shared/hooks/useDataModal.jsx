import { useState, useEffect } from "react";

const useDataModal = () => {
  const [selectedItem, setSelectedItem] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedItem) setIsOpen(true);
  }, [selectedItem]);

  useEffect(() => {
    if (!isOpen) setSelectedItem();
  }, [isOpen]);
  return { selectedItem, setSelectedItem, isOpen, setIsOpen };
};

export default useDataModal;
