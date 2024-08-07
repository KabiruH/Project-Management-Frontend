const ProjectsSummaryCard = ()=>{
   
    return (
      <div
        className="p-6 bg-white rounded-lg shadow-md"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)",
        }}>
        <h2 className="font-semibold text-xl pb-4 text-gray-800">
          Projects summary
        </h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-green-100 rounded-md">
            <span>Active Projects</span>
            <span className="font-bold text-green-700">10</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-100 rounded-md">
            <span>Completed Projects</span>
            <span className="font-bold text-blue-700">8</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-100 rounded-md">
            <span>Not started Projects</span>
            <span className="font-bold text-red-700">2</span>
          </div>
        </div>
      </div>
    );
}

export default ProjectsSummaryCard