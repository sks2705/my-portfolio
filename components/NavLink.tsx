import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const { pathname } = useRouter()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
  const base = 'text-sm px-3 py-1 rounded'
  const active = 'btn-accent'
  const inactive = 'muted hover:text-[var(--accent-primary)] transition'

  return (
    <Link href={href} className={`${base} ${isActive ? active : inactive}`}>
      {children}
    </Link>
  )
}
