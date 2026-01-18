import Link from 'next/link'
import { LEETCODE_PROFILE_URL, fetchLeetCodeStats } from '../../lib/leetcode'

export default async function LeetCodeStats() {
  const stats = await fetchLeetCodeStats()

  const cards = [
    { label: 'Total Solved', value: stats?.totalSolved ?? '—' },
    { label: 'Easy', value: stats?.easy ?? '—' },
    { label: 'Medium', value: stats?.medium ?? '—' },
    { label: 'Hard', value: stats?.hard ?? '—' },
    { label: 'Global Rank', value: stats?.ranking ?? '—' },
  ]

  return (
    <section id="leetcode" className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-1 gradient-text">Problem Solving &amp; DSA</h2>
          <p className="text-sm muted">Live LeetCode stats, fetched server-side with ISR.</p>
        </div>
        <Link
          href={LEETCODE_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-outline px-4 py-2 text-sm whitespace-nowrap"
        >
          View LeetCode Profile
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="glass-card p-5 text-center transition-transform duration-200 hover:scale-[1.02]">
            <div className="text-sm muted">{card.label}</div>
            <div className="text-2xl font-semibold mt-1">{card.value}</div>
          </div>
        ))}
      </div>

      {!stats && (
        <div className="mt-4 text-xs muted">
          Unable to load live LeetCode stats right now. Cards show placeholders.
        </div>
      )}
    </section>
  )
}


