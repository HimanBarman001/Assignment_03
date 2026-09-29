import { useState } from 'react'

function Header({
  searchQuery,
  onSearchChange,
  departments = [],
  selectedDepartment = 'All',
  onDepartmentChange,
  onOpenAddModal,
}) {
  const [isDeptMenuOpen, setIsDeptMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-xs shadow-2xs">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          
          {/* 1. Branding: Meaningful & Short Name */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  FarmSync
                </span>
                <span className="hidden rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700 sm:inline-block">
                  Staff
                </span>
              </div>
            </div>
          </div>

          {/* Controls: Search Bar -> Custom Department Filter -> Add Employee Button */}
          <div className="flex flex-1 flex-wrap items-center justify-end gap-2.5 sm:gap-3">
            
            {/* 2. Search Bar */}
            <div className="relative min-w-[200px] flex-1 max-w-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search employees..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-8 text-xs text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white sm:text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* 3. Upgraded Custom Department Filter Dropdown */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setIsDeptMenuOpen((prev) => !prev)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-colors cursor-pointer sm:text-sm ${
                  selectedDepartment !== 'All'
                    ? 'border-indigo-300 bg-[#f0effe] text-[#4f46e5] font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#4f46e5]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span className="max-w-[130px] truncate">
                  {selectedDepartment === 'All' ? 'All Departments' : selectedDepartment}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
                    isDeptMenuOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Department Dropdown Menu */}
              {isDeptMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20 cursor-default"
                    onClick={() => setIsDeptMenuOpen(false)}
                  />

                  <div className="absolute right-0 top-full z-30 mt-1.5 w-60 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={() => {
                        onDepartmentChange('All')
                        setIsDeptMenuOpen(false)
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                        selectedDepartment === 'All'
                          ? 'bg-[#f0effe] text-[#4f46e5] font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>All Departments</span>
                      {selectedDepartment === 'All' && <span>✓</span>}
                    </button>

                    <div className="my-1 border-t border-slate-100" />

                    {departments.map((dept) => (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => {
                          onDepartmentChange(dept)
                          setIsDeptMenuOpen(false)
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                          selectedDepartment === dept
                            ? 'bg-[#f0effe] text-[#4f46e5] font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">{dept}</span>
                        {selectedDepartment === dept && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* 4. Add Employee Button */}
            <button
              type="button"
              onClick={onOpenAddModal}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors cursor-pointer sm:text-sm active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Employee
            </button>

          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
