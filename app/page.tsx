import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import LeetCodeStats from '../components/sections/LeetCodeStatsServer'
import AIDashboard from '../components/sections/AIDashboard'
import GitHubStats from '../components/sections/GitHubStats'
import ProjectsGrid from '../components/sections/ProjectsGrid'
import Education from '../components/sections/Education'
import Certifications from '../components/sections/Certifications'
import Contact from '../components/sections/Contact'
import Footer from '../components/sections/Footer'

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <AIDashboard />
      <LeetCodeStats />
      <GitHubStats />
      <ProjectsGrid />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}



