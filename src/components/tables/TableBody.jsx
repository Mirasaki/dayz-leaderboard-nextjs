import React from 'react';
import PropTypes from 'prop-types';

const TableBody = ({ tableData, columns }) => {
  return (
    <tbody>
      {tableData.map((data, index) => {
        return (
          <tr key={data.name}>
            {columns.map(({ accessor, defaultVal, format, isIndex }) => {
              // Handle index/rank tr/td early
              if (isIndex) return <td key={accessor}>{index + 1}</td>;

              // Resolve the data to show in the table
              const tData = typeof data[accessor] === 'undefined'
                ? typeof defaultVal !== 'undefined'
                  ? defaultVal
                  : '——'
                : data[accessor];


              // Return the element
              return <td key={accessor}>
                {/* {tData} */}
                {
                  typeof format === 'function'
                    ? format(tData)
                    : tData
                }
              </td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

TableBody.propTypes = {
  tableData: PropTypes.array,
  columns: PropTypes.array
};

export default TableBody;
