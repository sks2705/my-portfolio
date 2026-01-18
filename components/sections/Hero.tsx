import Link from 'next/link'
import data from '../../data/data.json'
import NeuralBackground from '../NeuralBackground'

export default function Hero() {
  const personal = (data as any).personalInfo || {}
  const profileImage = personal.profileImage as string | undefined

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <NeuralBackground />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-primary)] mb-3">
              Personal AI Lab · Engineer&apos;s Notebook
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
              {personal.name}
            </h1>
            <div className="text-lg md:text-xl lead mb-2">{personal.title}</div>
            <div className="muted mb-4">{personal.subtitle}</div>
            <div className="text-sm muted mb-6">{personal.location}</div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link href="#projects" className="btn-accent px-5 py-2.5">
                View Projects
              </Link>
              <a
                href={personal.resumeLink}
                target="_blank"
                rel="noreferrer"
                className="btn-outline px-5 py-2.5"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-indigo-500/70 via-cyan-400/60 to-transparent opacity-70 blur-xl" />
              <div className="relative h-40 w-40 md:h-48 md:w-48 rounded-full overflow-hidden border border-white/60 dark:border-slate-700 bg-[radial-gradient(circle_at_10%_0,#6366f1_0,transparent_55%),radial-gradient(circle_at_90%_100%,#22d3ee_0,transparent_55%)] shadow-xl">
                {profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profileImage}
                    alt={personal.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-white">
                    {personal.avatar || 'SK'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


