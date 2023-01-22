import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import { titleCase } from '../../helpers/util';

// Format potential decimal util function
const formatDecimal = (val, precision = 2) => {
  if (typeof val === 'string') val = Number(val); // Account for string values
  const valIsFloat = !Number.isInteger(val);
  return valIsFloat ? val.toFixed(precision) : val;
};

// Meter -> Feet conversion util
const feetInOneMeter = 3.280839895;
const formatRange = (val) => {
  const baseValOutput = formatDecimal(val);
  const ftConversion = val * feetInOneMeter;
  const ftConversionOutput = formatDecimal(ftConversion);
  return <div>
    {baseValOutput}m
    <div style={{ fontSize: '80%' }}>
      {ftConversionOutput} ft
    </div>
  </div>;
};

// Defining our table columns
const columns = [
  {
    label: '#',
    accessor: 'rank',
    sortable: false,
    isIndex: true
  },
  {
    label: 'Weapon Name',
    accessor: 'name',
    format: (val) => titleCase(val.replace(/[_-]/g, ' '), true)
  },
  {
    label: 'Kills',
    accessor: 'kills',
    defaultVal: 0,
    format: formatDecimal
  },
  {
    label: 'Hits',
    accessor: 'hits',
    defaultVal: 0,
    format: formatDecimal
  },
  {
    label: 'Total Damage',
    accessor: 'damage',
    defaultVal: 0,
    format: formatDecimal
  },
  {
    label: '(~) Damage/Hit',
    accessor: 'dmgPerHit',
    defaultVal: 0,
    format: formatDecimal
  },
  {
    label: 'Longest Kill',
    accessor: 'longestKill',
    defaultVal: 0,
    format: formatRange
  },
  {
    label: 'Longest Shot/Kill',
    accessor: 'longestShot',
    defaultVal: 0,
    format: formatRange
  }
];

const WeaponTable = ({ name, data }) => {
  return (
    <>
      <Table
        caption={`Weapon statistics overview for: ${name}`}
        data={data}
        columns={columns}
      />
    </>
  );
};

WeaponTable.propTypes = {
  data: PropTypes.array,
  name: PropTypes.string
};

export default WeaponTable;
