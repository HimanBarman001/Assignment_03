import { useState } from 'react'

function EmployeeForm({
  mode,
  initialData,
  departments,
  existingIds,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState(() => {
    if (initialData && mode === 'edit') {
      return {
        name: initialData.name || '',
        employeeId: initialData.employeeId || '',
        department: initialData.department || '',
        gender: initialData.gender || 'Male',
        phone: initialData.phone || '',
        localAddress: initialData.localAddress || '',
        permanentAddress: initialData.permanentAddress || '',
      }
    }
    return {
      name: '',
      employeeId: '',
      department: departments[0] || '',
      gender: 'Male',
      phone: '',
      localAddress: '',
      permanentAddress: '',
    }
  })

  const [sameAddress, setSameAddress] = useState(
    () =>
      Boolean(
        initialData &&
          mode === 'edit' &&
          initialData.localAddress &&
          initialData.localAddress === initialData.permanentAddress
      )
  )
  const [errors, setErrors] = useState({})
  const [isDeptOpen, setIsDeptOpen] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      if (name === 'localAddress' && sameAddress) {
        updated.permanentAddress = value
      }
      return updated
    })

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSameAddressToggle = (e) => {
    const isChecked = e.target.checked
    setSameAddress(isChecked)
    if (isChecked) {
      setFormData((prev) => ({
        ...prev,
        permanentAddress: prev.localAddress,
      }))
      if (errors.permanentAddress) {
        setErrors((prev) => ({ ...prev, permanentAddress: '' }))
      }
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = 'ID is required'
    } else if (
      mode === 'add' &&
      existingIds.map((id) => id.toLowerCase()).includes(formData.employeeId.trim().toLowerCase())
    ) {
      newErrors.employeeId = 'ID already exists'
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required'
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Invalid phone number'
    }

    if (!formData.localAddress.trim()) {
      newErrors.localAddress = 'Local address required'
    }

    if (!formData.permanentAddress.trim()) {
      newErrors.permanentAddress = 'Permanent address required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    onSave({
      name: formData.name.trim(),
      employeeId: formData.employeeId.trim(),
      department: formData.department.trim(),
      gender: formData.gender,
      phone: formData.phone.trim(),
      localAddress: formData.localAddress.trim(),
      permanentAddress: formData.permanentAddress.trim(),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4 backdrop-blur-xs">
      {/* Compact, wide modal container designed so no scrolling is required */}
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-200/90 bg-white p-5 shadow-2xl sm:p-6">
        
        {/* Compact Header: Avatar Icon, Titles, and Close */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8edf5]">
              <svg
                viewBox="0 0 100 100"
                className="h-8 w-8 text-[#8ea0b7]"
                fill="currentColor"
              >
                <circle cx="50" cy="36" r="18" />
                <path d="M22 82c0-15.5 12.5-28 28-28s28 12.5 28 28H22z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[#0f172a] sm:text-xl">
                {mode === 'edit' ? 'Edit Employee Details' : 'Add New Employee'}
              </h2>
              <p className="text-xs text-[#64748b]">
                {mode === 'edit'
                  ? `Update records for ${formData.name || 'employee'}`
                  : 'Enter information for the farm employee directory profile'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-100 bg-[#f8fafc] text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        {/* Compact 2-Column Form Layout - Fits entirely within view without scroll */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          
          {/* Row 1: Full Name & Employee ID */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#eff6ff] text-[#3b82f6]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <label className="text-xs font-semibold text-[#0f172a]">
                  Full Name <span className="text-red-500">*</span>
                </label>
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className={`h-9 w-full rounded-xl border bg-slate-50/50 px-3 text-xs text-[#0f172a] outline-none transition-colors placeholder:text-slate-400 focus:bg-white sm:text-sm ${
                  errors.name ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
                }`}
              />
              {errors.name && <p className="mt-0.5 text-[11px] text-red-500">{errors.name}</p>}
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#f0effe] text-[#4f46e5]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </span>
                <label className="text-xs font-semibold text-[#0f172a]">
                  Employee ID <span className="text-red-500">*</span>
                </label>
              </div>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                placeholder="e.g. EMP-1024"
                disabled={mode === 'edit'}
                className={`h-9 w-full rounded-xl border px-3 text-xs font-mono sm:text-sm outline-none transition-colors placeholder:text-slate-400 ${
                  mode === 'edit'
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200'
                    : 'bg-slate-50/50 text-[#0f172a] focus:bg-white'
                } ${errors.employeeId ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'}`}
              />
              {errors.employeeId && <p className="mt-0.5 text-[11px] text-red-500">{errors.employeeId}</p>}
            </div>
          </div>

          {/* Row 2: Upgraded Custom Department Selector & Phone */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            
            {/* Upgraded Custom Department Select Option */}
            <div className="relative">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#f0effe] text-[#4f46e5]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
                <label className="text-xs font-semibold text-[#0f172a]">
                  Department <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Custom Selector Trigger Button */}
              <button
                type="button"
                onClick={() => setIsDeptOpen((prev) => !prev)}
                className={`h-9 w-full flex items-center justify-between rounded-xl border px-3 text-xs outline-none transition-colors cursor-pointer sm:text-sm ${
                  formData.department ? 'bg-white text-[#0f172a]' : 'bg-slate-50/50 text-slate-400'
                } ${
                  errors.department
                    ? 'border-red-400 focus:border-red-500'
                    : isDeptOpen
                    ? 'border-indigo-600 ring-2 ring-indigo-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {formData.department ? (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0" />
                      <span className="font-medium text-slate-800 truncate">{formData.department}</span>
                    </>
                  ) : (
                    <span>Select Department</span>
                  )}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-3.5 w-3.5 text-slate-400 transition-transform ${isDeptOpen ? 'rotate-180 text-indigo-600' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Custom Dropdown Menu matching Card Design */}
              {isDeptOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30 cursor-default"
                    onClick={() => setIsDeptOpen(false)}
                  />
                  <div className="absolute left-0 top-full z-40 mt-1 max-h-48 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">
                    {departments.map((dept) => {
                      const isSelected = formData.department === dept
                      return (
                        <button
                          key={dept}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, department: dept }))
                            if (errors.department) {
                              setErrors((prev) => ({ ...prev, department: '' }))
                            }
                            setIsDeptOpen(false)
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#f0effe] text-[#4f46e5] font-semibold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-[#4f46e5]' : 'bg-slate-300'}`} />
                            <span className="truncate">{dept}</span>
                          </div>
                          {isSelected && <span className="text-[#4f46e5] font-bold">✓</span>}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              {errors.department && <p className="mt-0.5 text-[11px] text-red-500">{errors.department}</p>}
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#f0fdf4] text-[#16a34a]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <label className="text-xs font-semibold text-[#0f172a]">
                  Phone Number <span className="text-red-500">*</span>
                </label>
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                className={`h-9 w-full rounded-xl border bg-slate-50/50 px-3 text-xs text-[#0f172a] outline-none transition-colors placeholder:text-slate-400 focus:bg-white sm:text-sm ${
                  errors.phone ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
                }`}
              />
              {errors.phone && <p className="mt-0.5 text-[11px] text-red-500">{errors.phone}</p>}
            </div>
          </div>

          {/* Row 3: Gender & Address Checkbox */}
          <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#eff6ff] text-[#3b82f6]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <label className="text-xs font-semibold text-[#0f172a]">
                  Gender <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="flex items-center gap-2">
                {['Male', 'Female', 'Other'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, gender: g }))
                      if (errors.gender) setErrors((prev) => ({ ...prev, gender: '' }))
                    }}
                    className={`h-8 flex-1 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      formData.gender === g
                        ? 'border-indigo-600 bg-[#f0effe] text-[#4f46e5] font-semibold'
                        : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex h-8 items-center gap-2 rounded-xl bg-slate-50/80 px-3 border border-slate-100">
              <input
                type="checkbox"
                id="sameAddressModal"
                checked={sameAddress}
                onChange={handleSameAddressToggle}
                className="h-3.5 w-3.5 rounded-md border-slate-300 text-indigo-600 accent-indigo-600 cursor-pointer"
              />
              <label htmlFor="sameAddressModal" className="text-xs font-medium text-[#64748b] cursor-pointer truncate">
                Permanent address same as local
              </label>
            </div>
          </div>

          {/* Row 4: Local Address & Permanent Address */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#fff7ed] text-[#ea580c]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </span>
                <label className="text-xs font-semibold text-[#0f172a]">
                  Local Address <span className="text-red-500">*</span>
                </label>
              </div>
              <input
                type="text"
                name="localAddress"
                value={formData.localAddress}
                onChange={handleChange}
                placeholder="e.g. 12 College Road, Kolkata, WB - 700009"
                className={`h-9 w-full rounded-xl border bg-slate-50/50 px-3 text-xs text-[#0f172a] outline-none transition-colors placeholder:text-slate-400 focus:bg-white sm:text-sm ${
                  errors.localAddress ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
                }`}
              />
              {errors.localAddress && <p className="mt-0.5 text-[11px] text-red-500">{errors.localAddress}</p>}
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#fef2f2] text-[#dc2626]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <label className="text-xs font-semibold text-[#0f172a]">
                  Permanent Address <span className="text-red-500">*</span>
                </label>
              </div>
              <input
                type="text"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                disabled={sameAddress}
                placeholder="e.g. 45 Station Road, Howrah, WB - 711101"
                className={`h-9 w-full rounded-xl border px-3 text-xs outline-none transition-colors placeholder:text-slate-400 sm:text-sm ${
                  sameAddress
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200'
                    : 'bg-slate-50/50 text-[#0f172a] focus:bg-white'
                } ${errors.permanentAddress ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'}`}
              />
              {errors.permanentAddress && <p className="mt-0.5 text-[11px] text-red-500">{errors.permanentAddress}</p>}
            </div>
          </div>

          {/* Form Actions: Compact, right-aligned buttons */}
          <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-3.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer sm:text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors cursor-pointer sm:text-sm active:scale-95"
            >
              {mode === 'edit' ? 'Update Employee' : 'Save Employee'}
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default EmployeeForm
