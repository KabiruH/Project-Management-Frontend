import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ columns, data, renderRowActions }) => {
  if (!columns || !data) {
    console.error("Table component received undefined or null props for columns or data.");
    return <div>Error: Table data is missing.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-black">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-2 border">{col.Header}</th>
            ))}
            {renderRowActions && <th className="px-4 py-2 border">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {columns.map((col) => (
                <td key={col.accessor} className="px-4 py-2 border">{item[col.accessor]}</td>
              ))}
              {renderRowActions && <td className="px-4 py-2 border">{renderRowActions(item)}</td>}
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
