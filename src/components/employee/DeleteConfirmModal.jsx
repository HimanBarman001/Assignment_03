function DeleteConfirmModal({ isOpen, employee, onConfirm, onClose }) {
  if (!isOpen || !employee) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xl sm:p-7">
        
        {/* Header with icon matching card's red icon container */}
        <div className="flex items-center gap-3.5">
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0f172a] sm:text-lg">
              Delete Employee Record?
            </h3>
            <p className="text-xs text-[#64748b]">
              Confirm removal from farm workforce directory
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-[#64748b] sm:text-sm leading-relaxed">
          Are you sure you want to permanently delete{' '}
          <span className="font-semibold text-[#0f172a]">{employee.name}</span>{' '}
          (ID: <span className="font-mono font-semibold text-indigo-700">{employee.employeeId}</span>)?
          This record will be removed from state.
        </p>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer sm:text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-4.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-red-700 transition-colors cursor-pointer sm:text-sm active:scale-95"
          >
            Delete Employee
          </button>
        </div>

      </div>
    </div>
  )
}

export default DeleteConfirmModal
