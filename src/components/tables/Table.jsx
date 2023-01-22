import React from 'react';
import PropTypes from 'prop-types';

import TableBody from './TableBody';
import TableHead from './TableHead';
import { useSortableTable } from '../../hooks/useSortableTable';

import styles from './Table.module.css';

const Table = ({ caption, data, columns }) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);

  return (
    <table className={styles.table}>
      <caption className={styles.caption}>{caption}</caption>
      <TableHead {...{ columns, handleSorting }} />
      <TableBody {...{ columns, tableData }} />
    </table>
  );
};

Table.propTypes = {
  caption: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array
};

export default Table;
