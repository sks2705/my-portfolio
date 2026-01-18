"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import data from '../data/data.json'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/#contact', label: 'Contact' },
]

export default function AppHeader() {
  const [open, setOpen] = useState(false)
  const personal = (data as any).personalInfo || {}

  return (
    <header className="sticky top-0 z-30 border-b bg-gradient-to-r from-[rgba(15,23,42,0.86)] via-[rgba(15,23,42,0.92)] to-[rgba(15,23,42,0.86)] dark:from-[rgba(15,23,42,0.96)] dark:via-[rgba(15,23,42,0.98)] dark:to-[rgba(15,23,42,0.96)] backdrop-blur">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between py-3 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="logo inline-flex items-center justify-center w-9 h-9 rounded-md text-white font-semibold shadow-md shadow-indigo-500/40">
            {personal.avatar || 'SK'}
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-50">
              {personal.name || 'Shivam Kumar Singh'}
            </span>
            <span className="text-[0.7rem] text-slate-200/80">
              B.Tech CSE · AI &amp; App Developer
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1 rounded text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Link href="/#contact" className="btn-outline px-3 py-1 text-sm">
              Contact
            </Link>
          </div>
          <ThemeToggle />
          <button
            className="md:hidden p-2 rounded focus:outline-none"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-[var(--bg-primary)]/95 backdrop-blur">
          <div className="px-4 py-3 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="btn-accent mt-2 px-3 py-2 text-center"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

