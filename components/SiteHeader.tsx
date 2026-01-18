import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import NavLink from './NavLink'
import React, { useState } from 'react'

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="logo inline-flex items-center justify-center w-9 h-9 rounded-md text-white font-semibold">SK</span>
            <span className="text-lg font-semibold"></span>
          </Link>

          <nav className="hidden md:flex items-center gap-3 text-sm">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/research">Research</NavLink>
            <NavLink href="/resume">Resume</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Link href="/contact" className="btn-outline px-3 py-1">Contact</Link>
          </div>
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded focus:outline-none"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t">
          <div className="px-4 py-3 flex flex-col gap-2">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/research">Research</NavLink>
            <NavLink href="/resume">Resume</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <Link href="/contact" className="btn-accent mt-2 px-3 py-2">Contact</Link>
          </div>
        </div>
      )}
    </header>
  )
}
