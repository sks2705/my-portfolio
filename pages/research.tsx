import data from '../data/data.json'

export default function Research() {
  const research = (data as any).research || []
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Research</h2>
      <div className="card p-6">No research items yet.</div>
    </main>
  )
}
