import data from '../../data/data.json'

export default function Education() {
  const education = (data as any).education || []
  return (
    <section id="education" className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
      <h2 className="text-2xl font-semibold mb-6">Education</h2>
      <div className="grid gap-6">
        {education.map((e: any) => (
          <div key={e.id} className="card p-6">
            <div className="text-lg font-medium mb-1">{e.degree}</div>
            <div className="muted mb-2">{e.school} ({e.period})</div>
            <div className="text-sm mb-2">{e.location}</div>
            <div className="text-sm muted">{e.description}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
