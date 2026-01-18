import data from '../../data/data.json'

export default function CertificationsPage() {
  const certs = (data as any).certifications || []

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16">
      <h1 className="text-3xl font-semibold mb-2 gradient-text">Certifications</h1>
      <p className="text-sm muted mb-8">
        Formal courses that strengthened my foundations in programming and problem solving.
      </p>

      {certs.length === 0 ? (
        <div className="glass-card p-6 text-sm muted">No certifications added yet.</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certs.map((c: any) => (
            <div key={c.id} className="glass-card p-5 flex flex-col gap-3">
              {c.image ? (
                <div className="relative overflow-hidden rounded-lg border border-white/10 bg-slate-900/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={c.name}
                    className="h-32 w-full object-cover"
                  />
                </div>
              ) : null}
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-sm muted">{c.issuer}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}



