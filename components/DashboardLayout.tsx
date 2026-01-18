import React from 'react'
import ThemeToggle from './ThemeToggle'

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <header className="p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Portfolio Dashboard</h1>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}

export default DashboardLayout
