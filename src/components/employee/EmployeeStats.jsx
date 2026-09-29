function EmployeeStats({
  totalCount,
  filteredCount,
  departments = [],
  selectedDepartment = 'All',
  onDepartmentChange,
  searchQuery,
  onSearchChange,
}) {
  const isFiltered = selectedDepartment !== 'All' || Boolean(searchQuery)

  return (
    <div className="space-y-4 pb-1">
      {/* Top row: Directory title, count badge, and active filter indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            Employee Directory
          </h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-xs font-semibold text-slate-700 border border-slate-200/60">
            {totalCount} Total
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{filteredCount}</strong> of{' '}
            <strong className="text-slate-800">{totalCount}</strong>
          </span>

          {isFiltered && (
            <button
              type="button"
              onClick={() => {
                onDepartmentChange('All')
                onSearchChange('')
              }}
              className="rounded-md border border-slate-200 bg-white px-2 py-1 font-medium text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Department Filter Chips matching Employee Card Design */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
          Filter:
        </span>
        <button
          type="button"
          onClick={() => onDepartmentChange('All')}
          className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-medium transition-all cursor-pointer ${
            selectedDepartment === 'All'
              ? 'bg-[#f0effe] text-[#4f46e5] font-semibold border border-indigo-200 shadow-2xs'
              : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          All Departments
        </button>

        {departments.map((dept) => {
          const isSelected = selectedDepartment === dept
          return (
            <button
              key={dept}
              type="button"
              onClick={() => onDepartmentChange(dept)}
              className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#f0effe] text-[#4f46e5] font-semibold border border-indigo-200 shadow-2xs'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {dept}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default EmployeeStats
