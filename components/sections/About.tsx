import data from '../../data/data.json'

export default function About() {
  const personal = (data as any).personalInfo || {}
  const bullets = [
    'AI & NLP focus',
    'Knowledge distillation & efficiency',
    'Flutter + ML integration',
    'Research + deployment mindset',
  ]
  return (
    <section id="about" className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-8 transition-transform duration-200 hover:scale-[1.02]">
          <h2 className="text-2xl font-semibold mb-3 gradient-text">My Work Philosophy</h2>
          <p className="mb-4">{personal.bio}</p>
          <ul className="grid gap-2">
            {bullets.map(b => (
              <li key={b} className="flex items-center gap-2">
                <span className="badge-light">{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-card p-8 transition-transform duration-200 hover:scale-[1.02]">
          <div className="text-sm muted mb-2">Location</div>
          <div className="font-medium mb-6">{personal.location}</div>
          <div className="text-sm muted mb-2">Specialties</div>
          <div className="flex flex-wrap gap-2">
            {(personal.specialties || []).map((s: string) => (
              <span key={s} className="badge-light">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
