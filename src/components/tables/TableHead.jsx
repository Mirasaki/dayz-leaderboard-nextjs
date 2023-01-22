import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Table.module.css';

const TableHead = ({ columns, handleSorting }) => {
  // State Management
  const [order, setOrder] = useState('asc');
  const [sortField, setSortField] = useState('');

  // Handle sorting by sortField and order
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable = true }) => {
          // Resolve emoji class name
          const cl = sortable
            ? sortField === accessor && order === 'asc'
              ? 'up'
              : sortField === accessor && order === 'desc'
                ? 'down'
                : 'default'
            : '';
          return (
            // Return table head with the correct label
            <th
              className={styles[cl] || ''}
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : null}
              style={{
                // Disable user select
                WebkitUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none',
                // Center text
                textAlign: 'center'
              }}
            >
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  columns: PropTypes.array,
  handleSorting: PropTypes.func
};

export default TableHead;
