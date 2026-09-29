import { useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import EmployeeStats from './components/employee/EmployeeStats'
import EmployeeList from './components/employee/EmployeeList'
import EmployeeForm from './components/employee/EmployeeForm'
import DeleteConfirmModal from './components/employee/DeleteConfirmModal'
import { INITIAL_EMPLOYEES, DEPARTMENTS } from './data/initialEmployees'

function App() {
  // Main states for Directory using useState()
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')

  // Modal / Form state for Add and Edit operations
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState('add') // 'add' or 'edit'
  const [currentEmployee, setCurrentEmployee] = useState(null)

  // State for delete confirmation modal
  const [deleteCandidate, setDeleteCandidate] = useState(null)

  // Notification alert state
  const [alertMessage, setAlertMessage] = useState(null)

  const showAlert = (message, type = 'success') => {
    setAlertMessage({ message, type })
    setTimeout(() => {
      setAlertMessage(null)
    }, 3500)
  }

  // Event Handlers for Add and Edit
  const handleOpenAdd = () => {
    setFormMode('add')
    setCurrentEmployee(null)
    setIsFormOpen(true)
  }

  const handleOpenEdit = (employee) => {
    setFormMode('edit')
    setCurrentEmployee(employee)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setCurrentEmployee(null)
  }

  const handleSaveEmployee = (formData) => {
    if (formMode === 'add') {
      setEmployees((prev) => [formData, ...prev])
      showAlert(`Employee ${formData.name} (${formData.employeeId}) added successfully!`, 'success')
    } else {
      setEmployees((prev) =>
        prev.map((emp) => (emp.employeeId === formData.employeeId ? formData : emp))
      )
      showAlert(`Employee ${formData.name} updated successfully!`, 'success')
    }
    handleCloseForm()
  }

  // Event Handlers for Delete
  const handlePromptDelete = (employee) => {
    setDeleteCandidate(employee)
  }

  const handleConfirmDelete = () => {
    if (deleteCandidate) {
      const deletedName = deleteCandidate.name
      setEmployees((prev) =>
        prev.filter((emp) => emp.employeeId !== deleteCandidate.employeeId)
      )
      showAlert(`Employee ${deletedName} deleted from directory.`, 'danger')
      setDeleteCandidate(null)
    }
  }

  const handleCancelDelete = () => {
    setDeleteCandidate(null)
  }

  // Filtered Employee list based on Search and Department Filter
  const filteredEmployees = employees.filter((employee) => {
    const matchesDepartment =
      selectedDepartment === 'All' || employee.department === selectedDepartment

    const query = searchQuery.trim().toLowerCase()
    const matchesSearch =
      query === '' ||
      employee.name.toLowerCase().includes(query) ||
      employee.employeeId.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query) ||
      employee.phone.toLowerCase().includes(query) ||
      employee.gender.toLowerCase().includes(query) ||
      employee.localAddress.toLowerCase().includes(query) ||
      employee.permanentAddress.toLowerCase().includes(query)

    return matchesDepartment && matchesSearch
  })

  const resetFilters = () => {
    setSelectedDepartment('All')
    setSearchQuery('')
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-800">
      {/* Global Navbar Header with Branding, Search, Department Filter, and Add Button */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        departments={DEPARTMENTS}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        onOpenAddModal={handleOpenAdd}
      />

      {/* Main Directory Area */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {/* Floating / Toast Alert Message */}
        {alertMessage && (
          <div
            className={`mb-6 flex items-center justify-between rounded-xl border p-4 shadow-xs transition-all ${
              alertMessage.type === 'danger'
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-emerald-200 bg-emerald-50 text-emerald-800'
            }`}
          >
            <div className="flex items-center gap-2.5 text-sm font-medium">
              <span>{alertMessage.type === 'danger' ? '🗑️' : '✅'}</span>
              <span>{alertMessage.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setAlertMessage(null)}
              className="text-sm font-bold opacity-70 hover:opacity-100 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Employee Count & Active Filter Summary with Department Chips */}
        <EmployeeStats
          totalCount={employees.length}
          filteredCount={filteredEmployees.length}
          departments={DEPARTMENTS}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Employee Cards List using EmployeeCard / Empty State */}
        <div className="mt-6">
          <EmployeeList
            employees={filteredEmployees}
            onEdit={handleOpenEdit}
            onDelete={handlePromptDelete}
            onResetFilters={resetFilters}
            onOpenAdd={handleOpenAdd}
          />
        </div>

        {/* Add / Edit Employee Modal with Conditional Rendering */}
        {isFormOpen && (
          <EmployeeForm
            key={formMode === 'edit' ? currentEmployee?.employeeId : 'new-employee'}
            mode={formMode}
            initialData={currentEmployee}
            departments={DEPARTMENTS}
            existingIds={employees.map((e) => e.employeeId)}
            onSave={handleSaveEmployee}
            onClose={handleCloseForm}
          />
        )}

        {/* Delete Confirmation Modal with Conditional Rendering */}
        <DeleteConfirmModal
          isOpen={Boolean(deleteCandidate)}
          employee={deleteCandidate}
          onConfirm={handleConfirmDelete}
          onClose={handleCancelDelete}
        />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  )
}

export default App
