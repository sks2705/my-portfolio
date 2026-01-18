import data from '../../data/data.json'

function Icon({ name }: { name: 'github' | 'linkedin' | 'leetcode' | 'email' }) {
  if (name === 'github') return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A12 12 0 0 0 0 12.7c0 5.4 3.4 9.9 8.2 11.5.6.1.8-.2.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.5-1.5-1.9-1.5-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.2 2 3 1.4 3.7 1 .1-.9.5-1.4.8-1.7-2.7-.3-5.5-1.4-5.5-6.2 0-1.4.5-2.5 1.3-3.5-.1-.3-.6-1.7.1-3.5 0 0 1-.3 3.6 1.3a12.3 12.3 0 0 1 6.6 0c2.6-1.6 3.6-1.3 3.6-1.3.7 1.8.2 3.2.1 3.5.8 1 1.3 2.1 1.3 3.5 0 4.9-2.8 5.9-5.5 6.2.5.4.9 1.1.9 2.3v3.4c0 .4.2.7.8.6A12 12 0 0 0 24 12.7 12 12 0 0 0 12 .5Z"/></svg>
  if (name === 'linkedin') return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 8.98h4v12H3v-12ZM9.02 8.98h3.84v1.64h.05a4.21 4.21 0 0 1 3.79-2.08c4.05 0 4.8 2.67 4.8 6.15v6.29h-4v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67h-4v-12Z"/></svg>
  if (name === 'leetcode') return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16.24 4.7a1 1 0 0 1 1.41 0l.4.4a1 1 0 0 1 0 1.41L9.42 15.2l3 3a1 1 0 1 1-1.41 1.41l-3.72-3.72a1 1 0 0 1 0-1.41l9.95-9.95Z"/><path d="M15.13 9.7a1 1 0 0 1 1.41 0l4.24 4.24a1 1 0 0 1 0 1.41l-4.24 4.24a1 1 0 0 1-1.41-1.41l2.83-2.83-2.83-2.83a1 1 0 0 1 0-1.41Z"/><path d="M9.63 5.2a5.5 5.5 0 1 0 0 7.78 1 1 0 0 0-1.42-1.42 3.5 3.5 0 1 1 0-4.94 1 1 0 1 0 1.42-1.42Z"/></svg>
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.35l-10 6.25L2 6.35V6Z"/><path d="M2 8.47v9.53a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.47l-9.4 5.88a2 2 0 0 1-2.2 0L2 8.47Z"/></svg>
}

export default function Contact() {
  const info = (data as any).contactInfo || {}
  const personal = (data as any).personalInfo || {}
  const social = {
    ...(info.social || {}),
    leetcode: (info.social || {}).leetcode || personal.leetcode,
  }
  return (
    <section id="contact" className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
      <div className="card p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-lg font-medium mb-1">Contact</div>
            <div className="muted mb-4">{info.availability}</div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {social.github ? (
                <a href={social.github} className="btn-outline px-3 py-2 flex items-center gap-2" target="_blank" rel="noreferrer">
                  <Icon name="github" /> GitHub
                </a>
              ) : null}
              {social.linkedin ? (
                <a href={social.linkedin} className="btn-outline px-3 py-2 flex items-center gap-2" target="_blank" rel="noreferrer">
                  <Icon name="linkedin" /> LinkedIn
                </a>
              ) : null}
              {social.leetcode ? (
                <a href={social.leetcode} className="btn-outline px-3 py-2 flex items-center gap-2" target="_blank" rel="noreferrer">
                  <Icon name="leetcode" /> LeetCode
                </a>
              ) : null}
              {social.email ? (
                <a href={`mailto:${social.email}`} className="btn-outline px-3 py-2 flex items-center gap-2">
                  <Icon name="email" /> Email
                </a>
              ) : null}
            </div>
            <div className="muted text-sm">{info.responseTime}</div>
          </div>
          <form className="grid gap-3">
            <input className="border rounded-md px-3 py-2 bg-white" placeholder="Name" />
            <input className="border rounded-md px-3 py-2 bg-white" placeholder="Email" type="email" />
            <textarea className="border rounded-md px-3 py-2 bg-white" placeholder="Message" rows={4} />
            <button className="btn-accent px-4 py-2">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  )
}
