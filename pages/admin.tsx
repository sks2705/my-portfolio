import { useEffect, useState } from 'react'

type AnyData = any

export default function Admin() {
  const [allowed, setAllowed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<AnyData | null>(null)
  const [leetcode, setLeetcode] = useState<any>({})
  const [projects, setProjects] = useState<any[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const host = window.location.hostname
    if (host === 'localhost' || host === '127.0.0.1') {
      setAllowed(true)
      fetchData()
    } else {
      setAllowed(false)
      setLoading(false)
    }
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/admin/data')
      const json = await res.json()
      if (!json.ok) {
        setError(json.error || 'Failed to load data')
        setLoading(false)
        return
      }
      setData(json.data)
      setLeetcode(json.data.leetcodeStats || {})
      setProjects(json.data.projects || [])
      setLoading(false)
    } catch (e: any) {
      setError(e.message || String(e))
      setLoading(false)
    }
  }

  const saveKey = async (key: string, value: any) => {
    try {
      setSaving(true)
      const res = await fetch('/api/admin/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      })
      const json = await res.json()
      if (!json.ok) {
        setError(json.error || 'Failed to save')
      } else {
        setData(json.data)
      }
    } catch (e: any) {
      setError(e.message || String(e))
    } finally {
      setSaving(false)
    }
  }

  const saveLeetcode = async () => {
    await saveKey('leetcodeStats', leetcode)
  }

  const saveProjects = async () => {
    await saveKey('projects', projects)
  }

  const addProject = () => {
    const maxId = projects.reduce((m, p) => (p.id > m ? p.id : m), 0)
    const nextId = maxId + 1
    setProjects([
      ...projects,
      {
        id: nextId,
        title: '',
        description: '',
        technologies: [],
        github: '',
        live: '',
        category: '',
        featured: false,
      },
    ])
  }

  const removeProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  if (!allowed) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="card p-8 max-w-md mx-auto">
          <div className="text-lg font-medium mb-2">Admin</div>
          <div className="muted text-sm">Admin page is only available on localhost.</div>
        </div>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="card p-6">Loading admin data…</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-10 space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Admin Panel</h1>
            <p className="muted text-sm">Local-only editor for portfolio data.json</p>
          </div>
          <button className="btn-outline px-4 py-2 text-sm" onClick={fetchData}>
            Reload
          </button>
        </div>

        {error ? (
          <div className="card p-4 text-sm text-red-600">{error}</div>
        ) : null}

        <section className="card p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium">LeetCode Stats</h2>
            <button className="btn-accent px-4 py-2 text-sm" onClick={saveLeetcode} disabled={saving}>
              {saving ? 'Saving…' : 'Save LeetCode'}
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">Profile URL</label>
              <input
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={leetcode.profileUrl || ''}
                onChange={(e) => setLeetcode({ ...leetcode, profileUrl: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Total Solved</label>
              <input
                type="number"
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={leetcode.totalSolved || 0}
                onChange={(e) => setLeetcode({ ...leetcode, totalSolved: Number(e.target.value || 0) })}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Streak</label>
              <input
                type="number"
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={leetcode.streak || 0}
                onChange={(e) => setLeetcode({ ...leetcode, streak: Number(e.target.value || 0) })}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Easy</label>
              <input
                type="number"
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={leetcode.easy || 0}
                onChange={(e) => setLeetcode({ ...leetcode, easy: Number(e.target.value || 0) })}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Medium</label>
              <input
                type="number"
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={leetcode.medium || 0}
                onChange={(e) => setLeetcode({ ...leetcode, medium: Number(e.target.value || 0) })}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Hard</label>
              <input
                type="number"
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={leetcode.hard || 0}
                onChange={(e) => setLeetcode({ ...leetcode, hard: Number(e.target.value || 0) })}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Ranking</label>
              <input
                type="number"
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={leetcode.ranking ?? ''}
                onChange={(e) =>
                  setLeetcode({ ...leetcode, ranking: e.target.value === '' ? undefined : Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Reputation</label>
              <input
                type="number"
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={leetcode.reputation ?? ''}
                onChange={(e) =>
                  setLeetcode({ ...leetcode, reputation: e.target.value === '' ? undefined : Number(e.target.value) })
                }
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm mb-1">Strong Topics (comma separated)</label>
              <input
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={(leetcode.strongTopics || []).join(', ')}
                onChange={(e) =>
                  setLeetcode({
                    ...leetcode,
                    strongTopics: e.target.value
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
          </div>
        </section>

        <section className="card p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium">Projects</h2>
            <div className="flex gap-2">
              <button className="btn-outline px-4 py-2 text-sm" onClick={addProject}>
                Add Project
              </button>
              <button className="btn-accent px-4 py-2 text-sm" onClick={saveProjects} disabled={saving}>
                {saving ? 'Saving…' : 'Save Projects'}
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.id} className="border rounded-md p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">#{p.id}</div>
                  <button
                    className="text-xs text-red-600"
                    onClick={() => {
                      removeProject(p.id)
                    }}
                  >
                    Remove
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">Title</label>
                    <input
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      value={p.title}
                      onChange={(e) =>
                        setProjects(
                          projects.map((proj) => (proj.id === p.id ? { ...proj, title: e.target.value } : proj)),
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Category</label>
                    <input
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      value={p.category || ''}
                      onChange={(e) =>
                        setProjects(
                          projects.map((proj) => (proj.id === p.id ? { ...proj, category: e.target.value } : proj)),
                        )
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Description</label>
                  <textarea
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    rows={3}
                    value={p.description}
                    onChange={(e) =>
                      setProjects(
                        projects.map((proj) => (proj.id === p.id ? { ...proj, description: e.target.value } : proj)),
                      )
                    }
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">GitHub URL</label>
                    <input
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      value={p.github || ''}
                      onChange={(e) =>
                        setProjects(
                          projects.map((proj) => (proj.id === p.id ? { ...proj, github: e.target.value } : proj)),
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Demo URL</label>
                    <input
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      value={p.live || ''}
                      onChange={(e) =>
                        setProjects(
                          projects.map((proj) => (proj.id === p.id ? { ...proj, live: e.target.value } : proj)),
                        )
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Technologies (comma separated)</label>
                  <input
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    value={(p.technologies || []).join(', ')}
                    onChange={(e) =>
                      setProjects(
                        projects.map((proj) =>
                          proj.id === p.id
                            ? {
                                ...proj,
                                technologies: e.target.value
                                  .split(',')
                                  .map((t) => t.trim())
                                  .filter(Boolean),
                              }
                            : proj,
                        ),
                      )
                    }
                  />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <input
                    id={`featured-${p.id}`}
                    type="checkbox"
                    className="h-4 w-4"
                    checked={Boolean(p.featured)}
                    onChange={(e) =>
                      setProjects(
                        projects.map((proj) => (proj.id === p.id ? { ...proj, featured: e.target.checked } : proj)),
                      )
                    }
                  />
                  <label htmlFor={`featured-${p.id}`}>Featured</label>
                </div>
              </div>
            ))}
            {projects.length === 0 ? <div className="muted text-sm">No projects yet.</div> : null}
          </div>
        </section>
      </div>
    </main>
  )
}

