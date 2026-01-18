import DashboardLayout from '../components/DashboardLayout'
import data from '../data/data.json'

export default function Dashboard() {
  const personal = (data as any).personalInfo || {}
  const projects = (data as any).projects || []
  const experience = (data as any).experience || []
  const certifications = (data as any).certifications || []

  return (
    <DashboardLayout>
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 p-6 card">
          <h2 className="text-xl font-semibold mb-2">{personal.name}</h2>
          <p className="text-sm lead">{personal.title}</p>
        </div>

        <div className="p-6 card">
          <h3 className="text-sm muted mb-2">Projects</h3>
          <div className="text-2xl font-bold">{projects.length}</div>
        </div>

        <div className="p-6 card">
          <h3 className="text-sm muted mb-2">Experience</h3>
          <div className="text-2xl font-bold">{experience.length}</div>
        </div>

        <div className="col-span-1 md:col-span-2 p-6 card">
          <h3 className="text-lg font-medium mb-3">About</h3>
          <p className="text-sm lead">{personal.bio}</p>
        </div>

        <div className="p-6 card">
          <h3 className="text-sm muted mb-2">Certifications</h3>
          <div className="text-2xl font-bold">{certifications.length}</div>
        </div>
      </section>
    </DashboardLayout>
  )
}
