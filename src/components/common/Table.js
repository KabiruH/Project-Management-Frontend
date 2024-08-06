import React from 'react';
import PropTypes from 'prop-types';
import  { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
const Table = ({ columns, data, renderRowActions }) => {
  const [itemOffset, setItemOffset] = useState(0);
let itemsPerPage = 3
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };


  if (!columns || !data) {
    console.error("Table component received undefined or null props for columns or data.");
    return <div>Error: Table data is missing.</div>;
  }

  return (
    <>
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
    {currentItems.map((item, index) => (
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
    <div className="w-full flex justify-center items-center mt-4 mb-2 ml-auto ">
      <ReactPaginate
        breakLabel="..."
        className='flex gap-3 justify-center  w-full p-2 rounded-md'
        nextLabel="next>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<prev"
        renderOnZeroPageCount={null}
        pageClassName='px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200'
        activeClassName='bg-blue-500 text-white'
        previousClassName='px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200'
        nextClassName='px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200'
        breakClassName='px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200'
      />
    </div>
    </>
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

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

export default Table;
