import { useState, useEffect } from 'react';

const useEditModal = () => {
  const [selectedEditItem, setSelectedEditItem] = useState();
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    if (selectedEditItem) setIsEditOpen(true);
  }, [selectedEditItem]);

  useEffect(() => {
    if (!isEditOpen) setSelectedEditItem();
  }, [isEditOpen]);
  return { selectedEditItem, setSelectedEditItem, isEditOpen, setIsEditOpen };
};

export default useEditModal;
