import { fetchLeetCodeStats } from '../../lib/leetcode'
import data from '../../data/data.json'

export default async function AIDashboard() {
  const stats = await fetchLeetCodeStats()
  const personal = (data as any).personalInfo || {}
  const github = personal.github as string | undefined
  const leetcode = personal.leetcode as string | undefined

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-1 gradient-text">AI Engineering Dashboard</h2>
          <p className="text-sm muted">
            A snapshot of how I think about AI systems: from models and datasets to deployment
            and problem solving.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="h-4 w-4 inline-flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M12 0.5C5.65 0.5 0.5 5.65 0.5 12c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.37-3.88-1.37-.53-1.35-1.29-1.71-1.29-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.19.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.2-1.5 3.17-1.19 3.17-1.19.63 1.57.23 2.73.11 3.02.75.81 1.2 1.84 1.2 3.1 0 4.42-2.69 5.39-5.25 5.67.42.36.8 1.08.8 2.18 0 1.57-.01 2.83-.01 3.21 0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35 0.5 12 0.5Z" />
                </svg>
              </span>
              <span>GitHub</span>
            </a>
          ) : null}
          {leetcode ? (
            <a
              href={leetcode}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-amber-200 dark:border-amber-500/60 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"
            >
              <span className="h-4 w-4 inline-flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                >
                  <path
                    d="M9.5 4.5 6 8l4.5 4.5L8 15l-5-5 6.5-6.5L9.5 4.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="15.5"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M13.2 18.5c1.2.8 2.6 1.2 4 1.2 1.2 0 2.4-.3 3.4-.9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span>LeetCode</span>
            </a>
          ) : null}
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


