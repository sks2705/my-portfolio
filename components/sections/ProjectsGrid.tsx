import data from '../../data/data.json'
import ProjectCard from '../ProjectCard'

export default function ProjectsGrid() {
  const projects = (data as any).projects || []
  const featured = projects.filter((p: any) => p.featured)
  return (
    <section id="projects" className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
      <h2 className="text-2xl font-semibold mb-6 gradient-text">Projects</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((p: any) => (
          <div key={p.id} className="transition-transform duration-200 hover:-translate-y-1">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
