import data from '../data/data.json'

export default function Resume() {
  const personal = (data as any).personalInfo || {}
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Resume</h2>
      <div className="card p-6">
        <p className="mb-4">You can download the resume below.</p>
        <a className="btn-accent px-4 py-2" href={personal.resumeLink} target="_blank" rel="noreferrer">Download Resume</a>
      </div>
    </main>
  )
}
