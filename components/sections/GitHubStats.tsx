import { fetchGitHubProfile, GITHUB_PROFILE_URL } from '../../lib/github'

export default async function GitHubStats() {
  const profile = await fetchGitHubProfile()

  const cards = [
    { label: 'Public Repos', value: profile?.public_repos ?? '—' },
    { label: 'Followers', value: profile?.followers ?? '—' },
    { label: 'Following', value: profile?.following ?? '—' },
  ]

  return (
    <section id="github" className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-1">GitHub Activity</h2>
          <p className="text-sm muted">
            Open-source work and experiments that support my AI, NLP, and app development projects.
          </p>
        </div>
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-outline px-4 py-2 text-sm whitespace-nowrap"
        >
          View GitHub Profile
        </a>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="glass-card p-5 text-center transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="text-sm muted">{card.label}</div>
            <div className="text-2xl font-semibold mt-1">{card.value}</div>
          </div>
        ))}
      </div>

      {!profile && (
        <div className="mt-4 text-xs muted">
          Unable to load live GitHub data right now. Stats show placeholders.
        </div>
      )}
    </section>
  )
}



