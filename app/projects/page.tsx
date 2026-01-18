import ProjectCard from '../../components/ProjectCard'
import data from '../../data/data.json'

export default function ProjectsPage() {
  const projects = (data as any).projects || []

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16">
      <h1 className="text-3xl font-semibold mb-2">Projects</h1>
      <p className="text-sm muted mb-8">
        A closer look at the AI, NLP, and app development work I&apos;ve been building.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <div key={project.id} id={String(project.id)} className="transition-transform duration-200 hover:scale-[1.02]">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  )
}



