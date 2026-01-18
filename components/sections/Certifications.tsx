import data from '../../data/data.json'

export default function Certifications() {
  const certs = (data as any).certifications || []
  return (
    <section id="certifications" className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
      <h2 className="text-2xl font-semibold mb-6">Certifications</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {certs.map((c: any) => (
          <div key={c.id} className="card p-5">
            <div className="font-medium">{c.name}</div>
            <div className="text-sm muted">{c.issuer}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
