import data from '../../data/data.json'

export default function Skills() {
  const categories = (data as any).skills?.categories || []
  const snapshot = (data as any).skillsSnapshot || []
  const tabColors = [
    'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200',
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200',
    'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200',
    'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200',
    'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-200',
  ]
  return (
    <section id="skills" className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
      <h2 className="text-2xl font-semibold mb-4 gradient-text">Skills</h2>

      <div className="mb-6 flex flex-wrap gap-2">
        {snapshot.map((item: string) => (
          <span
            key={item}
            className="snapshot-chip text-xs font-semibold tracking-wide uppercase"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((cat: any, index: number) => (
          <div key={cat.name} className="glass-card p-6 transition-transform duration-200 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
              <div className="font-medium">{cat.name}</div>
              <span className={`skill-tab text-[0.7rem] font-semibold tracking-wide uppercase ${tabColors[index % tabColors.length]}`}>
                {index + 1}
              </span>
            </div>
            <div className="grid gap-3">
              {cat.skills.map((skill: any) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{skill.name}</span>
                    <span className="muted">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-200/70 dark:bg-slate-800/60 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${skill.color}`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
