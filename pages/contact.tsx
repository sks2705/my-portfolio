import data from '../data/data.json'

export default function Contact() {
  const contact = (data as any).contactInfo || {}
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Contact</h2>
      <div className="card p-6">
        <p className="mb-2"><strong>Email:</strong> {contact.email}</p>
        <p className="mb-2"><strong>Phone:</strong> {contact.phone}</p>
        <p className="mb-2"><strong>Location:</strong> {contact.location}</p>
      </div>
    </main>
  )
}
