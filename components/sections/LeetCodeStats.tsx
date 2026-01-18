import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function LeetCodeStats() {
  const [lc, setLc] = useState<any>({})
  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('/api/leetcode')
        const json = await res.json()
        if (json?.ok) setLc(json.leetcodeStats || {})
      } catch {}
    }
    run()
  }, [])
  const cards = [
    { label: 'Total Solved', value: lc.totalSolved || 0 },
    { label: 'Easy', value: lc.easy || 0 },
    { label: 'Medium', value: lc.medium || 0 },
    { label: 'Hard', value: lc.hard || 0 },
    { label: 'Streak', value: lc.streak || 0 },
    { label: 'Ranking', value: lc.ranking ?? '-' },
    { label: 'Reputation', value: lc.reputation ?? '-' },
  ]
  const topics: string[] = lc.strongTopics || []
  return (
    <section id="leetcode" className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Problem Solving & DSA (LeetCode)</h2>
        {lc?.profileUrl ? (
          <a className="btn-outline px-4 py-2" href={lc.profileUrl} target="_blank" rel="noreferrer">
            View LeetCode Profile
          </a>
        ) : (
          <Link href="#" className="btn-outline px-4 py-2">View LeetCode Profile</Link>
        )}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {cards.map(c => (
          <div key={c.label} className="card p-5 text-center">
            <div className="text-sm muted">{c.label}</div>
            <div className="text-2xl font-semibold mt-1">{c.value}</div>
          </div>
        ))}
      </div>
      <div className="card p-5">
        <div className="text-sm muted mb-3">Strong Topics</div>
        <div className="flex flex-wrap gap-2">
          {topics.map(t => (
            <span key={t} className="badge-light">{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
