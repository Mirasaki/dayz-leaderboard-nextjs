import { useState } from 'react';

export const useSortableTable = (data) => {
  // Table data state management
  const [ tableData, setTableData ] = useState(data);

  // Define our handle sorting function
  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        // Check and handle null values
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;

        // Sort properly if values are valid
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
            numeric: true
          }) * (sortOrder === 'asc' ? 1 : -1)
        );
      });

      // Set the table data in state
      setTableData(sorted);
    }
  };

  // Return use table sorting
  return [ tableData, handleSorting ];
};
