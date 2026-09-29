import { useState } from 'react'

function EmployeeCard({ employee, onEdit, onDelete }) {
  const { employeeId, name, department, gender, phone, localAddress, permanentAddress } = employee
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="relative w-full rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-md">
      
      {/* Top Header Section: Photo, Name, ID, Department, and Three-Dot Menu */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-5">
          
          {/* Avatar / Photo Square */}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#e8edf5]">
            <svg
              viewBox="0 0 100 100"
              className="h-16 w-16 text-[#8ea0b7]"
              fill="currentColor"
            >
              <circle cx="50" cy="36" r="18" />
              <path d="M22 82c0-15.5 12.5-28 28-28s28 12.5 28 28H22z" />
            </svg>
          </div>

          {/* Name, ID, and Department Badge */}
          <div>
            <h3 className="text-xl font-bold tracking-tight text-[#0f172a] sm:text-2xl">
              {name}
            </h3>
            <p className="mt-0.5 text-sm font-medium text-[#64748b]">
              {employeeId}
            </p>
            <p className="mt-1.5 text-xs font-semibold text-[#4f46e5]">
              {department}
            </p>
          </div>

        </div>

        {/* Three-Dot Menu Button */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="More options"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-[#f8fafc] text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
          >
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
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </button>

          {/* Dropdown Popup Menu */}
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-20 cursor-default"
                onClick={() => setIsMenuOpen(false)}
              />

              <div className="absolute right-0 top-full z-30 mt-1.5 w-38 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false)
                    onEdit(employee)
                  }}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit Details
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false)
                    onDelete(employee)
                  }}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Information Grid: 2 Columns x 2 Rows */}
      <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        
        {/* Field 1: Gender */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-[#3b82f6]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-[#94a3b8]">Gender</p>
            <p className="mt-0.5 text-sm font-semibold text-[#0f172a]">
              {gender}
            </p>
          </div>
        </div>

        {/* Field 2: Phone Number */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf4] text-[#16a34a]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-[#94a3b8]">Phone Number</p>
            <p className="mt-0.5 text-sm font-semibold text-[#0f172a]">
              {phone}
            </p>
          </div>
        </div>

        {/* Field 3: Local Address */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff7ed] text-[#ea580c]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-[#94a3b8]">Local Address</p>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#1e293b] sm:text-sm">
              {localAddress}
            </p>
          </div>
        </div>

        {/* Field 4: Permanent Address */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fef2f2] text-[#dc2626]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-[#94a3b8]">Permanent Address</p>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#1e293b] sm:text-sm">
              {permanentAddress}
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default EmployeeCard
