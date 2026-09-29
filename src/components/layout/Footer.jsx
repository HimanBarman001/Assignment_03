function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        
        {/* Top Section: Brand Info & Columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          
          {/* Brand Column (Col 1-5) */}
          <div className="md:col-span-5 space-y-4">
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
              <span className="text-xl font-bold tracking-tight text-slate-900">
                FarmSync
              </span>
            </div>

            <p className="max-w-sm text-xs leading-relaxed text-slate-500 sm:text-sm">
              Comprehensive farm workforce management and staff directory platform.
              Streamlining agricultural operations, staff records, and cross-departmental coordination.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium text-slate-700">Enterprise Network Online</span>
            </div>
          </div>

          {/* Quick Links Column (Col 6-7) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <a href="#directory" className="hover:text-indigo-600 transition-colors">
                  Staff Directory
                </a>
              </li>
              <li>
                <a href="#departments" className="hover:text-indigo-600 transition-colors">
                  Department Hub
                </a>
              </li>
              <li>
                <a href="#records" className="hover:text-indigo-600 transition-colors">
                  Employee Profiles
                </a>
              </li>
              <li>
                <a href="#operations" className="hover:text-indigo-600 transition-colors">
                  Farm Operations
                </a>
              </li>
            </ul>
          </div>

          {/* Departments Column (Col 8-10) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Departments
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <span className="hover:text-indigo-600 transition-colors cursor-default">
                  Crop Production
                </span>
              </li>
              <li>
                <span className="hover:text-indigo-600 transition-colors cursor-default">
                  Livestock & Dairy
                </span>
              </li>
              <li>
                <span className="hover:text-indigo-600 transition-colors cursor-default">
                  Horticulture & Greenhouses
                </span>
              </li>
              <li>
                <span className="hover:text-indigo-600 transition-colors cursor-default">
                  Machinery & Equipment
                </span>
              </li>
              <li>
                <span className="hover:text-indigo-600 transition-colors cursor-default">
                  Quality & Packaging
                </span>
              </li>
            </ul>
          </div>

          {/* Legal / Security Column (Col 11-12) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Trust & Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <a href="#privacy" className="hover:text-indigo-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-indigo-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-indigo-600 transition-colors">
                  Data Security
                </a>
              </li>
              <li>
                <a href="#support" className="hover:text-indigo-600 transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-footer Row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} FarmSync Technologies, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-600 transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-slate-600 transition-colors">
              Terms
            </a>
            <a href="#security" className="hover:text-slate-600 transition-colors">
              Security
            </a>
            <a href="#status" className="flex items-center gap-1.5 hover:text-slate-600 transition-colors">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Status</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
