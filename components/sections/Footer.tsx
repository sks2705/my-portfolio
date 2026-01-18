import data from '../../data/data.json'

export default function Footer() {
  const personal = (data as any).personalInfo || {}
  return (
    <footer className="mt-16 border-t">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="font-medium">{personal.name}</div>
          <div className="muted">• {personal.title}</div>
        </div>
        <div className="muted text-sm">© {new Date().getFullYear()}</div>
      </div>
    </footer>
  )
}
