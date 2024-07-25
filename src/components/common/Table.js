import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ columns, data, renderRowActions }) => {
  if (!columns || !data) {
    console.error("Table component received undefined or null props for columns or data.");
    return <div>Error: Table data is missing.</div>;
  }

  return (
    <div className="overflow-x-auto">
   <table className="min-w-full bg-white text-black shadow-lg rounded-lg overflow-hidden">
  <thead>
    <tr className="bg-[90caf9] text-left text-secondary uppercase text-sm leading-normal">
      {columns.map((col) => (
        <th key={col.accessor} className="px-6 py-3 border-b-2 border-gray-300">{col.Header}</th>
      ))}
      {renderRowActions && <th className="px-6 py-3 border-b-2 border-gray-300">Actions</th>}
    </tr>
  </thead>
  <tbody className="text-gray-600 text-sm font-light">
    {data.map((item, index) => (
      <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
        {columns.map((col) => (
          <td key={col.accessor} className="px-6 py-3 border-b text-[17px] font-[600] text-black border-gray-200">{item[col.accessor]}</td>
        ))}
        {renderRowActions && <td className="px-6 py-3 border-b border-gray-200">{renderRowActions(item)}</td>}
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.string.isRequired,
    Header: PropTypes.string.isRequired,
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderRowActions: PropTypes.func,
};

export default Table;
