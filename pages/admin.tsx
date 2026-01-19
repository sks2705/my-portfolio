import { useEffect, useState } from 'react'

type AnyData = any
type UploadType = 'profileImage' | 'heroImage' | 'resume' | 'cv' | 'certification'

const presetSkills = [
  { name: 'Python', level: 90, color: 'from-green-500 to-emerald-500' },
  { name: 'C', level: 85, color: 'from-blue-500 to-indigo-500' },
  { name: 'C++', level: 80, color: 'from-purple-500 to-pink-500' },
  { name: 'Dart', level: 80, color: 'from-cyan-500 to-blue-500' },
  { name: 'Natural Language Processing', level: 88, color: 'from-emerald-500 to-teal-500' },
  { name: 'Knowledge Distillation', level: 85, color: 'from-indigo-500 to-purple-500' },
  { name: 'Deep Learning', level: 80, color: 'from-pink-500 to-rose-500' },
  { name: 'AI-generated Text Detection', level: 90, color: 'from-slate-500 to-slate-700' },
  { name: 'TensorFlow / Keras', level: 85, color: 'from-orange-500 to-red-500' },
  { name: 'Scikit-learn', level: 80, color: 'from-yellow-500 to-amber-500' },
  { name: 'Hugging Face Transformers', level: 88, color: 'from-violet-500 to-purple-600' },
  { name: 'Flutter', level: 85, color: 'from-sky-500 to-blue-500' },
  { name: 'REST APIs', level: 75, color: 'from-gray-500 to-gray-700' },
  { name: 'SQLite', level: 70, color: 'from-blue-600 to-indigo-700' },
  { name: 'Google Colab', level: 90, color: 'from-yellow-400 to-orange-500' },
  { name: 'Git & GitHub', level: 85, color: 'from-orange-500 to-red-500' },
  { name: 'Hugging Face', level: 88, color: 'from-fuchsia-500 to-pink-500' },
  { name: 'Kaggle', level: 80, color: 'from-cyan-500 to-blue-600' },
]

export default function Admin() {
  const [allowed, setAllowed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<AnyData | null>(null)
  const [personal, setPersonal] = useState<any>({})
  const [stats, setStats] = useState<any[]>([])
  const [skills, setSkills] = useState<any>({ categories: [] })
  const [education, setEducation] = useState<any[]>([])
  const [contact, setContact] = useState<any>({})
  const [leetcode, setLeetcode] = useState<any>({})
  const [projects, setProjects] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [certifications, setCertifications] = useState<any[]>([])
  const [tab, setTab] = useState<
    'profile' | 'stats' | 'skills' | 'projects' | 'education' | 'certifications' | 'contact' | 'leetcode'
  >('profile')

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
      setPersonal(json.data.personalInfo || {})
      setStats(json.data.stats || [])
      setSkills(json.data.skills || { categories: [] })
      setEducation(json.data.education || [])
      setContact(json.data.contactInfo || {})
      setLeetcode(json.data.leetcodeStats || {})
      setProjects(json.data.projects || [])
      setCertifications(json.data.certifications || [])
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

  const savePersonal = async () => {
    await saveKey('personalInfo', personal)
  }

  const saveStats = async () => {
    await saveKey('stats', stats)
  }

  const saveSkills = async () => {
    await saveKey('skills', skills)
  }

  const saveEducation = async () => {
    await saveKey('education', education)
  }

  const saveContact = async () => {
    await saveKey('contactInfo', contact)
  }

  const addStat = () => {
    setStats([...stats, { label: '', value: '' }])
  }

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index))
  }

  const addCategory = () => {
    const current = skills.categories || []
    setSkills({ ...skills, categories: [...current, { name: '', skills: [] }] })
  }

  const removeCategory = (index: number) => {
    const current = skills.categories || []
    setSkills({ ...skills, categories: current.filter((_: any, i: number) => i !== index) })
  }

  const addSkill = (categoryIndex: number) => {
    const current = skills.categories || []
    const cat = current[categoryIndex]
    const updated = [...current]
    updated[categoryIndex] = {
      ...cat,
      skills: [...(cat.skills || []), { name: '', level: 0, color: '' }],
    }
    setSkills({ ...skills, categories: updated })
  }

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const current = skills.categories || []
    const cat = current[categoryIndex]
    const updated = [...current]
    updated[categoryIndex] = {
      ...cat,
      skills: (cat.skills || []).filter((_: any, i: number) => i !== skillIndex),
    }
    setSkills({ ...skills, categories: updated })
  }

  const addEducationItem = () => {
    const maxId = education.reduce((m, e) => (e.id > m ? e.id : m), 0)
    const nextId = maxId + 1
    setEducation([
      ...education,
      {
        id: nextId,
        degree: '',
        school: '',
        period: '',
        location: '',
        description: '',
        achievements: [],
      },
    ])
  }

  const removeEducationItem = (id: number) => {
    setEducation(education.filter((e) => e.id !== id))
  }

  const uploadFile = async (type: UploadType, file: File) => {
    try {
      setSaving(true)
      setError(null)
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result || ''))
        reader.onerror = () => reject(reader.error || new Error('Failed to read file'))
        reader.readAsDataURL(file)
      })
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, fileName: file.name, content: base64 }),
      })
      const json = await res.json()
      if (!json.ok) {
        setError(json.error || 'Failed to upload file')
        return
      }
      const path = json.path
      setPersonal((prev: any) => {
        const next = { ...(prev || {}) }
        if (type === 'profileImage') {
          next.profileImage = path
        } else if (type === 'heroImage') {
          next.heroImage = path
        } else if (type === 'resume') {
          next.resumeLink = path
        } else if (type === 'cv') {
          next.cvLink = path
        }
        return next
      })
    } catch (e: any) {
      setError(e.message || String(e))
    } finally {
      setSaving(false)
    }
  }

  const saveCertifications = async () => {
    await saveKey('certifications', certifications)
  }

  const addCertification = () => {
    const maxId = certifications.reduce((m, c) => (c.id > m ? c.id : m), 0)
    const nextId = maxId + 1
    setCertifications([
      ...certifications,
      {
        id: nextId,
        name: '',
        issuer: '',
        date: '',
        credentialId: '',
        link: '',
        image: '',
        featured: false,
      },
    ])
  }

  const removeCertification = (id: number) => {
    setCertifications(certifications.filter((c) => c.id !== id))
  }

  const uploadCertificationImage = async (index: number, file: File) => {
    try {
      setSaving(true)
      setError(null)
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result || ''))
        reader.onerror = () => reject(reader.error || new Error('Failed to read file'))
        reader.readAsDataURL(file)
      })
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'certification' as UploadType, fileName: file.name, content: base64 }),
      })
      const json = await res.json()
      if (!json.ok) {
        setError(json.error || 'Failed to upload certification image')
        return
      }
      const path = json.path
      setCertifications((prev) =>
        prev.map((c, i) => (i === index ? { ...c, image: path } : c)),
      )
    } catch (e: any) {
      setError(e.message || String(e))
    } finally {
      setSaving(false)
    }
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

        {error ? <div className="card p-4 text-sm text-red-600">{error}</div> : null}

        <div className="card p-2 flex flex-wrap gap-2 text-sm">
          <button
            className={`px-4 py-2 rounded-md ${
              tab === 'profile'
                ? 'bg-[var(--accent-primary)] text-white'
                : 'bg-transparent text-[var(--text-secondary)]'
            }`}
            onClick={() => setTab('profile')}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              tab === 'stats'
                ? 'bg-[var(--accent-primary)] text-white'
                : 'bg-transparent text-[var(--text-secondary)]'
            }`}
            onClick={() => setTab('stats')}
          >
            Stats
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              tab === 'skills'
                ? 'bg-[var(--accent-primary)] text-white'
                : 'bg-transparent text-[var(--text-secondary)]'
            }`}
            onClick={() => setTab('skills')}
          >
            Skills
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              tab === 'projects'
                ? 'bg-[var(--accent-primary)] text-white'
                : 'bg-transparent text-[var(--text-secondary)]'
            }`}
            onClick={() => setTab('projects')}
          >
            Projects
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              tab === 'education'
                ? 'bg-[var(--accent-primary)] text-white'
                : 'bg-transparent text-[var(--text-secondary)]'
            }`}
            onClick={() => setTab('education')}
          >
            Education
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              tab === 'certifications'
                ? 'bg-[var(--accent-primary)] text-white'
                : 'bg-transparent text-[var(--text-secondary)]'
            }`}
            onClick={() => setTab('certifications')}
          >
            Certifications
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              tab === 'contact'
                ? 'bg-[var(--accent-primary)] text-white'
                : 'bg-transparent text-[var(--text-secondary)]'
            }`}
            onClick={() => setTab('contact')}
          >
            Contact
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              tab === 'leetcode'
                ? 'bg-[var(--accent-primary)] text-white'
                : 'bg-transparent text-[var(--text-secondary)]'
            }`}
            onClick={() => setTab('leetcode')}
          >
            LeetCode
          </button>
        </div>

        {tab === 'profile' && (
          <section className="card p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium">Personal Info</h2>
              <button className="btn-accent px-4 py-2 text-sm" onClick={savePersonal} disabled={saving}>
                {saving ? 'Saving…' : 'Save Profile'}
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.name || ''}
                  onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.title || ''}
                  onChange={(e) => setPersonal({ ...personal, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Subtitle</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.subtitle || ''}
                  onChange={(e) => setPersonal({ ...personal, subtitle: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.email || ''}
                  onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.phone || ''}
                  onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Location</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.location || ''}
                  onChange={(e) => setPersonal({ ...personal, location: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">GitHub</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.github || ''}
                  onChange={(e) => setPersonal({ ...personal, github: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">LinkedIn</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.linkedin || ''}
                  onChange={(e) => setPersonal({ ...personal, linkedin: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">LeetCode</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.leetcode || ''}
                  onChange={(e) => setPersonal({ ...personal, leetcode: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Twitter</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.twitter || ''}
                  onChange={(e) => setPersonal({ ...personal, twitter: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Website</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.website || ''}
                  onChange={(e) => setPersonal({ ...personal, website: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Avatar</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.avatar || ''}
                  onChange={(e) => setPersonal({ ...personal, avatar: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Profile Image</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.profileImage || ''}
                  onChange={(e) => setPersonal({ ...personal, profileImage: e.target.value })}
                />
                <input
                  type="file"
                  className="mt-2 w-full border rounded-md px-3 py-2 text-xs"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) uploadFile('profileImage', file)
                  }}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Hero Image</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.heroImage || ''}
                  onChange={(e) => setPersonal({ ...personal, heroImage: e.target.value })}
                />
                <input
                  type="file"
                  className="mt-2 w-full border rounded-md px-3 py-2 text-xs"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) uploadFile('heroImage', file)
                  }}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Favicon</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.favicon || ''}
                  onChange={(e) => setPersonal({ ...personal, favicon: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Resume Link</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.resumeLink || ''}
                  onChange={(e) => setPersonal({ ...personal, resumeLink: e.target.value })}
                />
                <input
                  type="file"
                  className="mt-2 w-full border rounded-md px-3 py-2 text-xs"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) uploadFile('resume', file)
                  }}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">CV Link</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={personal.cvLink || ''}
                  onChange={(e) => setPersonal({ ...personal, cvLink: e.target.value })}
                />
                <input
                  type="file"
                  className="mt-2 w-full border rounded-md px-3 py-2 text-xs"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) uploadFile('cv', file)
                  }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Short About</label>
              <textarea
                className="w-full border rounded-md px-3 py-2 text-sm"
                rows={3}
                value={personal.shortAbout || ''}
                onChange={(e) => setPersonal({ ...personal, shortAbout: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Bio</label>
              <textarea
                className="w-full border rounded-md px-3 py-2 text-sm"
                rows={4}
                value={personal.bio || ''}
                onChange={(e) => setPersonal({ ...personal, bio: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">About (one per line)</label>
              <textarea
                className="w-full border rounded-md px-3 py-2 text-sm"
                rows={4}
                value={(personal.about || []).join('\n')}
                onChange={(e) =>
                  setPersonal({
                    ...personal,
                    about: e.target.value
                      .split('\n')
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Specialties (one per line)</label>
              <textarea
                className="w-full border rounded-md px-3 py-2 text-sm"
                rows={4}
                value={(personal.specialties || []).join('\n')}
                onChange={(e) =>
                  setPersonal({
                    ...personal,
                    specialties: e.target.value
                      .split('\n')
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
          </section>
        )}

        {tab === 'certifications' && (
          <section className="card p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium">Certifications</h2>
              <div className="flex gap-2">
                <button className="btn-outline px-4 py-2 text-sm" onClick={addCertification}>
                  Add Certification
                </button>
                <button className="btn-accent px-4 py-2 text-sm" onClick={saveCertifications} disabled={saving}>
                  {saving ? 'Saving…' : 'Save Certifications'}
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {certifications.map((c, index) => (
                <div key={c.id ?? index} className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">#{c.id ?? index + 1}</div>
                    <button className="text-xs text-red-600" onClick={() => removeCertification(c.id ?? index)}>
                      Remove
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm mb-1">Name</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={c.name || ''}
                        onChange={(e) =>
                          setCertifications(
                            certifications.map((item, i) =>
                              i === index ? { ...item, name: e.target.value } : item,
                            ),
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Issuer</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={c.issuer || ''}
                        onChange={(e) =>
                          setCertifications(
                            certifications.map((item, i) =>
                              i === index ? { ...item, issuer: e.target.value } : item,
                            ),
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Date</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={c.date || ''}
                        onChange={(e) =>
                          setCertifications(
                            certifications.map((item, i) =>
                              i === index ? { ...item, date: e.target.value } : item,
                            ),
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Credential ID</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={c.credentialId || ''}
                        onChange={(e) =>
                          setCertifications(
                            certifications.map((item, i) =>
                              i === index ? { ...item, credentialId: e.target.value } : item,
                            ),
                          )
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm mb-1">Verification Link</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={c.link || ''}
                        onChange={(e) =>
                          setCertifications(
                            certifications.map((item, i) =>
                              i === index ? { ...item, link: e.target.value } : item,
                            ),
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] gap-3 items-start">
                    <div>
                      <label className="block text-sm mb-1">Image Path</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={c.image || ''}
                        onChange={(e) =>
                          setCertifications(
                            certifications.map((item, i) =>
                              i === index ? { ...item, image: e.target.value } : item,
                            ),
                          )
                        }
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="mt-2 w-full border rounded-md px-3 py-2 text-xs"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) uploadCertificationImage(index, file)
                        }}
                      />
                    </div>
                    {c.image ? (
                      <div className="border rounded-md overflow-hidden bg-slate-900/60">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.image} alt={c.name} className="h-28 w-full object-cover" />
                      </div>
                    ) : (
                      <div className="border rounded-md px-3 py-2 text-xs muted">
                        No image selected yet.
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {certifications.length === 0 ? (
                <div className="muted text-sm">No certifications yet.</div>
              ) : null}
            </div>
          </section>
        )}

        {tab === 'stats' && (
          <section className="card p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium">Stats</h2>
              <div className="flex gap-2">
                <button className="btn-outline px-4 py-2 text-sm" onClick={addStat}>
                  Add Stat
                </button>
                <button className="btn-accent px-4 py-2 text-sm" onClick={saveStats} disabled={saving}>
                  {saving ? 'Saving…' : 'Save Stats'}
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {stats.map((s, i) => (
                <div key={i} className="grid md:grid-cols-[1fr,1fr,auto] gap-3 items-center">
                  <input
                    className="border rounded-md px-3 py-2 text-sm"
                    placeholder="Label"
                    value={s.label}
                    onChange={(e) =>
                      setStats(stats.map((st, idx) => (idx === i ? { ...st, label: e.target.value } : st)))
                    }
                  />
                  <input
                    className="border rounded-md px-3 py-2 text-sm"
                    placeholder="Value"
                    value={s.value}
                    onChange={(e) =>
                      setStats(stats.map((st, idx) => (idx === i ? { ...st, value: e.target.value } : st)))
                    }
                  />
                  <button className="text-xs text-red-600" onClick={() => removeStat(i)}>
                    Remove
                  </button>
                </div>
              ))}
              {stats.length === 0 ? <div className="muted text-sm">No stats yet.</div> : null}
            </div>
          </section>
        )}

        {tab === 'skills' && (
          <section className="card p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium">Skills</h2>
              <div className="flex gap-2">
                <button className="btn-outline px-4 py-2 text-sm" onClick={addCategory}>
                  Add Category
                </button>
                <button className="btn-accent px-4 py-2 text-sm" onClick={saveSkills} disabled={saving}>
                  {saving ? 'Saving…' : 'Save Skills'}
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {(skills.categories || []).map((cat: any, ci: number) => (
                <div key={ci} className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      className="border rounded-md px-3 py-2 text-sm flex-1 mr-3"
                      placeholder="Category name"
                      value={cat.name}
                      onChange={(e) => {
                        const next = [...(skills.categories || [])]
                        next[ci] = { ...cat, name: e.target.value }
                        setSkills({ ...skills, categories: next })
                      }}
                    />
                    <button className="text-xs text-red-600" onClick={() => removeCategory(ci)}>
                      Remove
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(cat.skills || []).map((sk: any, si: number) => (
                      <div
                        key={si}
                        className="grid md:grid-cols-[150px,1fr,120px,1fr,auto] gap-2 items-center"
                      >
                        <select
                          className="border rounded-md px-2 py-2 text-sm"
                          value={presetSkills.find((p) => p.name === sk.name) ? sk.name : ''}
                          onChange={(e) => {
                            const value = e.target.value
                            if (!value) return
                            const preset = presetSkills.find((p) => p.name === value)
                            if (!preset) return
                            const next = [...(skills.categories || [])]
                            const catNext = { ...(next[ci] || {}), skills: [...(cat.skills || [])] }
                            catNext.skills[si] = {
                              ...catNext.skills[si],
                              name: preset.name,
                              level: preset.level,
                              color: preset.color,
                            }
                            next[ci] = catNext
                            setSkills({ ...skills, categories: next })
                          }}
                        >
                          <option value="">Preset</option>
                          {presetSkills.map((p) => (
                            <option key={p.name} value={p.name}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                        <input
                          className="border rounded-md px-3 py-2 text-sm"
                          placeholder="Skill name"
                          value={sk.name}
                          onChange={(e) => {
                            const next = [...(skills.categories || [])]
                            const catNext = { ...(next[ci] || {}), skills: [...(cat.skills || [])] }
                            catNext.skills[si] = { ...catNext.skills[si], name: e.target.value }
                            next[ci] = catNext
                            setSkills({ ...skills, categories: next })
                          }}
                        />
                        <input
                          type="number"
                          className="border rounded-md px-3 py-2 text-sm"
                          placeholder="Level"
                          value={sk.level}
                          onChange={(e) => {
                            const next = [...(skills.categories || [])]
                            const catNext = { ...(next[ci] || {}), skills: [...(cat.skills || [])] }
                            catNext.skills[si] = { ...catNext.skills[si], level: Number(e.target.value || 0) }
                            next[ci] = catNext
                            setSkills({ ...skills, categories: next })
                          }}
                        />
                        <input
                          className="border rounded-md px-3 py-2 text-sm"
                          placeholder="Tailwind gradient e.g. from-green-500 to-emerald-500"
                          value={sk.color}
                          onChange={(e) => {
                            const next = [...(skills.categories || [])]
                            const catNext = { ...(next[ci] || {}), skills: [...(cat.skills || [])] }
                            catNext.skills[si] = { ...catNext.skills[si], color: e.target.value }
                            next[ci] = catNext
                            setSkills({ ...skills, categories: next })
                          }}
                        />
                        <button className="text-xs text-red-600" onClick={() => removeSkill(ci, si)}>
                          Remove
                        </button>
                      </div>
                    ))}
                    <button className="btn-outline px-3 py-1 text-xs" onClick={() => addSkill(ci)}>
                      Add Skill
                    </button>
                  </div>
                </div>
              ))}
              {(skills.categories || []).length === 0 ? (
                <div className="muted text-sm">No skill categories yet.</div>
              ) : null}
            </div>
          </section>
        )}
        {tab === 'leetcode' && (
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
        )}

        {tab === 'projects' && (
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
        )}

        {tab === 'education' && (
          <section className="card p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium">Education</h2>
              <div className="flex gap-2">
                <button className="btn-outline px-4 py-2 text-sm" onClick={addEducationItem}>
                  Add Education
                </button>
                <button className="btn-accent px-4 py-2 text-sm" onClick={saveEducation} disabled={saving}>
                  {saving ? 'Saving…' : 'Save Education'}
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {education.map((e) => (
                <div key={e.id} className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">#{e.id}</div>
                    <button className="text-xs text-red-600" onClick={() => removeEducationItem(e.id)}>
                      Remove
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm mb-1">Degree</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={e.degree || ''}
                        onChange={(ev) =>
                          setEducation(
                            education.map((ed) => (ed.id === e.id ? { ...ed, degree: ev.target.value } : ed)),
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">School</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={e.school || ''}
                        onChange={(ev) =>
                          setEducation(
                            education.map((ed) => (ed.id === e.id ? { ...ed, school: ev.target.value } : ed)),
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Period</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={e.period || ''}
                        onChange={(ev) =>
                          setEducation(
                            education.map((ed) => (ed.id === e.id ? { ...ed, period: ev.target.value } : ed)),
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Location</label>
                      <input
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={e.location || ''}
                        onChange={(ev) =>
                          setEducation(
                            education.map((ed) => (ed.id === e.id ? { ...ed, location: ev.target.value } : ed)),
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
                      value={e.description || ''}
                      onChange={(ev) =>
                        setEducation(
                          education.map((ed) => (ed.id === e.id ? { ...ed, description: ev.target.value } : ed)),
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Achievements (one per line)</label>
                    <textarea
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      rows={3}
                      value={(e.achievements || []).join('\n')}
                      onChange={(ev) =>
                        setEducation(
                          education.map((ed) =>
                            ed.id === e.id
                              ? {
                                  ...ed,
                                  achievements: ev.target.value
                                    .split('\n')
                                    .map((t) => t.trim())
                                    .filter(Boolean),
                                }
                              : ed,
                          ),
                        )
                      }
                    />
                  </div>
                </div>
              ))}
              {education.length === 0 ? <div className="muted text-sm">No education items yet.</div> : null}
            </div>
          </section>
        )}

        {tab === 'contact' && (
          <section className="card p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium">Contact</h2>
              <button className="btn-accent px-4 py-2 text-sm" onClick={saveContact} disabled={saving}>
                {saving ? 'Saving…' : 'Save Contact'}
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Availability</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={contact.availability || ''}
                  onChange={(e) => setContact({ ...contact, availability: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Response Time</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={contact.responseTime || ''}
                  onChange={(e) => setContact({ ...contact, responseTime: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">GitHub</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={contact.social?.github || ''}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      social: { ...(contact.social || {}), github: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm mb-1">LinkedIn</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={contact.social?.linkedin || ''}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      social: { ...(contact.social || {}), linkedin: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm mb-1">LeetCode</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={contact.social?.leetcode || ''}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      social: { ...(contact.social || {}), leetcode: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Twitter</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={contact.social?.twitter || ''}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      social: { ...(contact.social || {}), twitter: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
