import React from 'react';

const Table = ({ columns, data, renderRowActions }) => {
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

export default Table;
