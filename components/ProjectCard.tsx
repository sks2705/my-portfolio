import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export default function ProjectCard({ project }: { project: any }) {
  const techList = (project.technologies || []).slice(0, 3)

  return (
    <div className="glass-card p-4 transition-transform duration-200 hover:-translate-y-1">
      {project.image ? (
        <div className="mb-3 overflow-hidden rounded-md">
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={240}
            className="h-40 w-full object-cover"
          />
        </div>
      ) : null}
      <h4 className="font-medium mb-1">{project.title}</h4>
      <p className="text-sm muted mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {techList.map((t: string) => (
          <span key={t} className="badge-light">{t}</span>
        ))}
      </div>
      <div className="flex gap-2">
        <Link href={`/projects#${project.id}`} className="btn-outline px-3 py-1">View Project</Link>
        {project.github ? (
          <a className="btn-accent px-3 py-1" href={project.github} target="_blank" rel="noreferrer">GitHub</a>
        ) : null}
      </div>
    </div>
  )
}
