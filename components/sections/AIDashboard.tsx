import { fetchLeetCodeStats } from '../../lib/leetcode'

export default async function AIDashboard() {
  const stats = await fetchLeetCodeStats()

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-1">AI Engineering Dashboard</h2>
          <p className="text-sm muted">
            A snapshot of how I think about AI systems: from models and datasets to deployment
            and problem solving.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass-card p-6 flex flex-col gap-3 transition-transform duration-200 hover:scale-[1.02]">
          <div className="text-xs uppercase tracking-wide text-[var(--accent-primary)]">
            AI Focus
          </div>
          <h3 className="text-lg font-semibold">AI-Generated Text Detection</h3>
          <p className="text-sm muted">
            Distilled RoBERTa model trained on HC3 to separate AI-written and human-written text,
            optimized for latency and deployment.
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Distilled RoBERTa (teacher → student)</li>
            <li>• HC3 dataset</li>
            <li>• Deployment-ready architecture</li>
          </ul>
        </div>

        <div className="glass-card p-6 flex flex-col gap-3 transition-transform duration-200 hover:scale-[1.02]">
          <div className="text-xs uppercase tracking-wide text-[var(--accent-primary)]">
            Research Mindset
          </div>
          <h3 className="text-lg font-semibold">From Dataset to Distilled Model</h3>
          <p className="text-sm muted">
            I treat models as experiments: design, iterate, measure, and simplify until they are
            efficient enough for real users.
          </p>
          <div className="mt-3 grid grid-cols-1 gap-1 text-xs">
            <div className="pill">Dataset → Cleaning &amp; curation</div>
            <div className="pill">Teacher model → Baseline &amp; upper bound</div>
            <div className="pill">Student model → Distillation &amp; compression</div>
            <div className="pill">Evaluation → Metrics &amp; error analysis</div>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col gap-3 transition-transform duration-200 hover:scale-[1.02]">
          <div className="text-xs uppercase tracking-wide text-[var(--accent-primary)]">
            Problem Solving
          </div>
          <h3 className="text-lg font-semibold">LeetCode Practice</h3>
          <p className="text-sm muted">
            I use LeetCode to sharpen my reasoning, data structures, and algorithmic thinking.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="mini-stat">
              <div className="label">Total Solved</div>
              <div className="value">{stats?.totalSolved ?? '—'}</div>
            </div>
            <div className="mini-stat">
              <div className="label">Global Rank</div>
              <div className="value">{stats?.ranking ?? '—'}</div>
            </div>
          </div>
          <a
            href="#leetcode"
            className="mt-4 inline-flex text-xs text-[var(--accent-primary)] hover:underline"
          >
            View full problem solving stats →
          </a>
        </div>
      </div>
    </section>
  )
}


