import data from '../../data/data.json'

export default function ExperiencePage() {
  const experience = (data as any).experience || []

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16">
      <h1 className="text-3xl font-semibold mb-2">Experience</h1>
      <p className="text-sm muted mb-8">
        Hands-on work, internships, and roles will appear here as I grow my AI and engineering journey.
      </p>

      {experience.length === 0 ? (
        <div className="glass-card p-6 text-sm muted">No experience entries added yet.</div>
      ) : (
        <div className="grid gap-6">
          {experience.map((exp: any) => (
            <div key={exp.id} className="glass-card p-6">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                <div className="font-medium">{exp.role}</div>
                <div className="text-xs uppercase tracking-wide muted">{exp.period}</div>
              </div>
              <div className="text-sm muted mb-1">{exp.company}</div>
              {exp.location ? <div className="text-xs muted mb-2">{exp.location}</div> : null}
              {exp.description ? <div className="text-sm">{exp.description}</div> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}



