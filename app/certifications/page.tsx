import data from '../../data/data.json'

export default function CertificationsPage() {
  const certs = (data as any).certifications || []

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16">
      <h1 className="text-3xl font-semibold mb-2">Certifications</h1>
      <p className="text-sm muted mb-8">
        Formal courses that strengthened my foundations in programming and problem solving.
      </p>

      {certs.length === 0 ? (
        <div className="glass-card p-6 text-sm muted">No certifications added yet.</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certs.map((c: any) => (
            <div key={c.id} className="glass-card p-5">
              <div className="font-medium">{c.name}</div>
              <div className="text-sm muted">{c.issuer}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}



