import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark') {
        document.documentElement.classList.add('dark')
        setTheme('dark')
        return
      }
      if (saved === 'light') {
        document.documentElement.classList.remove('dark')
        setTheme('light')
        return
      }

      document.documentElement.classList.add('dark')
      setTheme('dark')
    } catch (e) {
    }
  }, [])

  const toggle = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setTheme('light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="btn-outline text-sm px-3 py-1"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
