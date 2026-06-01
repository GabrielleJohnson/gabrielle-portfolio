'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Sphere, Torus } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const links = {
  github: 'https://github.com/GabrielleJohnson',
  linkedin: 'https://linkedin.com/in/gabrielle-johnson-0199a41a8',
  resume: '/resume.pdf',
  email: 'mailto:gabriellejohnson103@gmail.com',
}

const projects = [
  {
    id: 1,
    title: 'Portfolio OS',
    kicker: 'Live brand system',
    summary:
      'A Next.js portfolio with motion, project modals, responsive layouts, and a server-backed contact flow.',
    description:
      'Designed and built as a personal operating system for career storytelling. The site combines a distinctive visual system, GSAP scroll reveals, responsive content sections, project detail modals, and a Next.js API route that sends contact messages through Nodemailer.',
    image: '/images/portfolioImage.png',
    tags: ['Next.js', 'React', 'GSAP', 'Nodemailer', 'Three.js'],
    github: 'https://github.com/GabrielleJohnson/gabrielle-portfolio',
    live: 'https://gabrielle-portfolio-six.vercel.app',
  },
  {
    id: 2,
    title: 'Defectly',
    kicker: 'In progress',
    summary:
      'Defectly is a modern QA-focused issue tracking platform designed to simplify bug reporting, test case management, and team collaboration for developers and testers. Currently in progress.',
    description:
      'Defectly helps teams efficiently track defects, manage testing workflows, and streamline communication through a clean and intuitive interface. This project is currently in progress and will be linked once it is ready to publish.',
    image: '/images/inProgressImage.png',
    tags: ['In Progress'],
  },
  {
    id: 3,
    title: 'DevLens',
    kicker: 'Coming soon',
    summary:
      'DevLens is a modern developer productivity dashboard that visualizes coding activity, GitHub insights, and personal development tools in one clean interface. Coming soon.',
    description:
      'DevLens helps developers track repositories, monitor coding progress, and stay organized through interactive dashboards, analytics, and productivity-focused features. This project is coming soon and will be linked after it is published.',
    image: '/images/comingSoonImage.png',
    tags: ['Coming Soon'],
  },
]

const experience = [
  {
    role: 'QA Engineer Intern',
    company: 'Grid Dynamics, Kingston',
    date: 'Jun 2025 - Dec 2025',
    body:
      'Validated user-facing features, tested REST APIs with Postman, and supported automated regression testing in Agile CI/CD environments.',
  },
  {
    role: 'Computer Technician',
    company: 'Florville Pharmacy, Yallahs',
    date: 'Jul 2022',
    body:
      'Diagnosed technical issues, performed system updates, and translated fixes clearly for non-technical users.',
  },
  {
    role: 'Volunteer Lab Technician',
    company: 'Yallahs High School, Yallahs',
    date: 'Sep 2020 - Nov 2020',
    body:
      'Supported students and teachers with computer troubleshooting, e-learning tools, and network maintenance.',
  },
]

const skills = [
  ['Languages', 'Java', 'Python', 'JavaScript', 'SQL', 'PHP'],
  ['Web', 'React', 'Next.js', 'HTML', 'CSS', 'REST APIs'],
  ['Quality', 'Selenium', 'JUnit', 'Postman', 'Funtional Testing','Manual Testing', 'Regression Testing'],
  ['Tools', 'Git', 'GitHub', 'Jira', 'Jenkins', 'Docker', 'CI/CD', 'Microsoft Office'],
  ['Cloud', 'Google Cloud Digital Leader', 'API Security', 'OWASP'],
]

const personalNotes = [
  {
    title: 'Game Sense',
    body: 'Problem-solving, pattern spotting, and fast feedback loops show up in my work too.',
  },
  {
    title: 'Guitar Practice',
    body: 'I like skills that reward patience, repetition, and hearing when something is slightly off.',
  },
  {
    title: 'Photography Eye',
    body: 'Composition makes interfaces better. Small framing choices change how people feel.',
  },
]

const getPageFromUrl = () => {
  if (typeof window === 'undefined') return 'work'
  return new URLSearchParams(window.location.search).get('page') === 'life' ? 'life' : 'work'
}

const getProjectFromUrl = () => {
  if (typeof window === 'undefined') return null
  const projectId = Number(new URLSearchParams(window.location.search).get('project'))
  return projects.find((project) => project.id === projectId) || null
}

const updateHistory = ({ page = 'work', project = null, replace = false }) => {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.search = ''
  if (page === 'life') url.searchParams.set('page', 'life')
  if (project) url.searchParams.set('project', String(project.id))
  const method = replace ? 'replaceState' : 'pushState'
  window.history[method]({ page, projectId: project?.id || null }, '', url)
}

function SignalOrb() {
  const groupRef = useRef(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.28
    groupRef.current.rotation.x = Math.sin(t * 0.35) * 0.18
  })

  return (
    <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.45}>
      <group ref={groupRef}>
        <Sphere args={[1.35, 64, 64]}>
          <MeshTransmissionMaterial
            color="#f4efe5"
            thickness={0.4}
            roughness={0.2}
            transmission={0.75}
            chromaticAberration={0.08}
          />
        </Sphere>
        <Torus args={[1.75, 0.012, 16, 160]} rotation={[Math.PI / 2.2, 0, 0]}>
          <meshStandardMaterial color="#ff6b4a" emissive="#ff6b4a" emissiveIntensity={0.8} />
        </Torus>
        <Torus args={[1.95, 0.01, 16, 160]} rotation={[0.7, 0.4, 0.3]}>
          <meshStandardMaterial color="#18c7a6" emissive="#18c7a6" emissiveIntensity={0.6} />
        </Torus>
      </group>
    </Float>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <span>{'\u00A9'} 2026 Gabrielle Johnson. All Rights Reserved.</span>
      <a href={links.email}>gabriellejohnson103@gmail.com</a>
      <a href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </footer>
  )
}

export default function Home() {
  const scrollRef = useRef(null)
  const cursorDot = useRef(null)
  const cursorRing = useRef(null)
  const modalRef = useRef(null)
  const [activePage, setActivePage] = useState('work')
  const [activeProject, setActiveProject] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', message: '' })
  const [formErrors, setFormErrors] = useState({})
  const [formLoading, setFormLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  const switchPage = (page, options = {}) => {
    setActivePage(page)
    setActiveProject(null)
    setMenuOpen(false)
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    if (!options.skipHistory) updateHistory({ page })
  }

  const scrollTo = (id) => {
    const container = scrollRef.current
    const target = document.getElementById(id)
    if (!target || !container) return
    const targetPosition = target.getBoundingClientRect().top + container.scrollTop - 84
    container.scrollTo({ top: targetPosition, behavior: 'smooth' })
    setMenuOpen(false)
  }

  const goToSection = (page, id) => {
    setActivePage(page)
    setActiveProject(null)
    setMenuOpen(false)
    updateHistory({ page })
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollTo(id))
    })
  }

  const goToContact = () => {
    setActivePage('life')
    setActiveProject(null)
    setMenuOpen(false)
    updateHistory({ page: 'life' })
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollTo('contact'))
    })
  }

  const openModal = (project) => {
    setActiveProject(project)
    updateHistory({ page: activePage, project })
    requestAnimationFrame(() => {
      if (!modalRef.current) return
      gsap.fromTo(modalRef.current, { opacity: 0, y: 24, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: 'power3.out' })
    })
  }

  const closeModal = (options = {}) => {
    if (!modalRef.current) {
      setActiveProject(null)
      if (!options.skipHistory) updateHistory({ page: activePage, replace: true })
      return
    }
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 18,
      scale: 0.97,
      duration: 0.18,
      ease: 'power2.in',
      onComplete: () => {
        setActiveProject(null)
        if (!options.skipHistory) updateHistory({ page: activePage, replace: true })
      },
    })
  }

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData((current) => ({ ...current, [id]: value }))
    setFormErrors((current) => ({ ...current, [id]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormLoading(true)
    setFormSuccess(false)
    setFormErrors({})

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (data.success) {
        setFormSuccess(true)
        setFormData({ firstname: '', lastname: '', email: '', message: '' })
      } else {
        setFormErrors(data.errors || {})
      }
    } catch {
      setFormErrors({ server: 'Something went wrong. Please try again or email me directly.' })
    } finally {
      setFormLoading(false)
    }
  }

  useEffect(() => {
    const syncFromUrl = () => {
      const page = getPageFromUrl()
      const project = getProjectFromUrl()
      setActivePage(page)
      setActiveProject(project)
      setMenuOpen(false)
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' })
      })
    }

    syncFromUrl()
    window.history.replaceState(
      { page: getPageFromUrl(), projectId: getProjectFromUrl()?.id || null },
      '',
      window.location.href,
    )
    window.addEventListener('popstate', syncFromUrl)

    return () => window.removeEventListener('popstate', syncFromUrl)
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    const dot = cursorDot.current
    const ring = cursorRing.current
    const cleanupFns = []

    if (dot && ring) {
      let mouseX = 0
      let mouseY = 0
      let ringX = 0
      let ringY = 0
      let frameId

      const onMove = (event) => {
        mouseX = event.clientX
        mouseY = event.clientY
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }
      const loop = () => {
        ringX += (mouseX - ringX) * 0.14
        ringY += (mouseY - ringY) * 0.14
        ring.style.transform = `translate(${ringX}px, ${ringY}px)`
        frameId = requestAnimationFrame(loop)
      }

      window.addEventListener('mousemove', onMove)
      loop()
      cleanupFns.push(() => {
        window.removeEventListener('mousemove', onMove)
        cancelAnimationFrame(frameId)
      })

      document.querySelectorAll('a, button, .project-card, .tile').forEach((el) => {
        const enter = () => ring.classList.add('hovering')
        const leave = () => ring.classList.remove('hovering')
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
        cleanupFns.push(() => {
          el.removeEventListener('mouseenter', enter)
          el.removeEventListener('mouseleave', leave)
        })
      })
    }

    gsap.fromTo('.reveal', { opacity: 0, y: 28 }, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.06,
      ease: 'power2.out',
    })

    gsap.utils.toArray('.rise').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 34 }, {
        opacity: 1,
        y: 0,
        duration: 0.58,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, scroller: container, start: 'top 88%' },
      })
    })

    return () => {
      cleanupFns.forEach((fn) => fn())
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [activePage])

  return (
    <>
      <div className="cursor-dot" ref={cursorDot} />
      <div className="cursor-ring" ref={cursorRing} />

      <nav className="navbar">
        <button className="brand" onClick={() => switchPage('work')} aria-label="Go to home">
          <span>GJ</span>
          <small>Quality x Code</small>
        </button>

        <div className="nav-tabs" aria-label="Portfolio sections">
          <button className={activePage === 'work' ? 'active' : ''} onClick={() => switchPage('work')}>Work</button>
          <button className={activePage === 'life' ? 'active' : ''} onClick={() => switchPage('life')}>Life</button>
        </div>

        <div className="nav-actions">
          <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
          <a className="resume-link" href={links.resume} target="_blank" rel="noopener noreferrer">CV</a>
        </div>

        <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu">
          <span />
          <span />
        </button>

        {menuOpen && (
          <div className="mobile-menu">
            <button onClick={() => switchPage('work')}>Work</button>
            <button onClick={() => switchPage('life')}>Life</button>
            <button onClick={() => goToSection('work', 'projects')}>Projects</button>
            <button onClick={() => goToSection('work', 'experience')}>Experience</button>
            <button onClick={() => goToSection('work', 'skills')}>Skills</button>
            <button onClick={() => goToSection('life', 'contact')}>Contact</button>
          </div>
        )}
      </nav>

      <main className="page-scroll" ref={scrollRef}>
        {activePage === 'work' ? (
          <>
            <section className="hero" id="home">
              <div className="hero-copy">
                <p className="eyebrow reveal">Software Engineer / QA-minded builder</p>
                <h1 className="reveal">Gabrielle Johnson builds reliable web experiences with a tester&apos;s eye.</h1>
                <p className="hero-text reveal">
                  I combine software engineering, quality assurance, and practical problem-solving to ship interfaces that feel thoughtful and behave predictably.
                </p>
                <div className="hero-actions reveal">
                  <a className="primary-btn" href={links.resume} target="_blank" rel="noopener noreferrer">View CV</a>
                  <button className="ghost-btn" onClick={() => scrollTo('projects')}>See work</button>
                </div>
              </div>

              <div className="hero-lab reveal" aria-hidden="true">
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <ambientLight intensity={0.9} />
                  <directionalLight position={[4, 5, 4]} intensity={1.8} />
                  <pointLight position={[-3, -2, 3]} color="#18c7a6" intensity={1.2} />
                  <Suspense fallback={null}>
                    <SignalOrb />
                  </Suspense>
                </Canvas>
                <div className="lab-readout">
                  <span>Regression clean</span>
                  <strong>99.8%</strong>
                </div>
              </div>
            </section>

            <section className="intro-grid">
              <article className="identity-panel rise">
                <p className="eyebrow">Based in St. Thomas, Jamaica</p>
                <h2>Clean code, careful testing, steady delivery.</h2>
              </article>
              <article className="tile rise">
                <span>01</span>
                <h3>Engineer</h3>
                <p>Next.js, React, JavaScript, Java, Python, SQL, and APIs.</p>
              </article>
              <article className="tile rise">
                <span>02</span>
                <h3>Quality</h3>
                <p>Manual testing, automation practice, regression, Selenium, JUnit, Postman.</p>
              </article>
              <article className="tile accent rise">
                <span>03</span>
                <h3>Available</h3>
                <p>Open to software engineering and QA engineering opportunities.</p>
              </article>
            </section>

            <section className="section" id="projects">
              <div className="section-heading rise">
                <p className="eyebrow">Selected Builds</p>
                <h2>Projects with proof points.</h2>
              </div>
              <div className="projects-grid project-showcase">
                {projects.map((project, index) => (
                  <article
                    className={`project-card rise ${index === 0 ? 'featured-project' : ''}`}
                    key={project.id}
                    onClick={() => openModal(project)}
                  >
                    <img src={project.image} alt="" />
                    <div className="project-body">
                      <div className="project-meta">
                        <p>{project.kicker}</p>
                        <small>{String(index + 1).padStart(2, '0')}</small>
                      </div>
                      <h3>{project.title}</h3>
                      <span>{project.summary}</span>
                      <div className="tag-row">
                        {project.tags.map((tag) => <small key={tag}>{tag}</small>)}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="section split-section" id="experience">
              <div className="section-heading sticky-heading rise">
                <p className="eyebrow">Experience</p>
                <h2>Where support, testing, and engineering meet.</h2>
              </div>
              <div className="timeline">
                {experience.map((item) => (
                  <article className="timeline-item rise" key={item.role}>
                    <p>{item.date}</p>
                    <h3>{item.role}</h3>
                    <strong>{item.company}</strong>
                    <span>{item.body}</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="section" id="skills">
              <div className="section-heading rise">
                <p className="eyebrow">Stack</p>
                <h2>A practical toolkit for building and verifying.</h2>
              </div>
              <div className="skills-grid">
                {skills.map(([group, ...items]) => (
                  <article className="skill-band rise" key={group}>
                    <h3>{group}</h3>
                    <div>
                      {items.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="work-contact rise" id="work-contact">
              <div>
                <p className="eyebrow">Next step</p>
                <h2>Need a builder who thinks like a tester?</h2>
                <p>Send a message, connect on LinkedIn, or open the CV. I am open to software engineering and QA engineering conversations.</p>
              </div>
              <div className="work-contact-actions">
                <button className="primary-btn" onClick={goToContact}>Send a message</button>
                <a className="ghost-btn" href={links.linkedin} target="_blank" rel="noopener noreferrer">Connect</a>
              </div>
            </section>

            <Footer />
          </>
        ) : (
          <>
            <section className="life-hero">
              <div className="life-copy reveal">
                <p className="eyebrow">A little more human</p>
                <h1>Outside the editor, I am usually chasing a sharper eye, a cleaner chord, or a better strategy.</h1>
                <button className="primary-btn" onClick={() => scrollTo('contact')}>Send a message</button>
              </div>
              <div className="life-mockup reveal" aria-label="Life page color mockup">
                <div className="life-orbit">
                  <span>Gaming</span>
                  <span>Guitar</span>
                  <span>Photos</span>
                  <span>Learning</span>
                </div>
                <div className="photo-stack">
                  <img src="/images/shipAtSea.jpeg" alt="" />
                  <img src="/images/morningSun.jpeg" alt="" />
                </div>
              </div>
            </section>

            <section className="life-color-band rise">
              <div className="marquee">
                <div className="marquee-group">
                 <span>Problem solver</span>
                 <span>Tech enthusiast</span>
                 <span>Curious mindset</span>
                 <span>Fast learner</span>
                 <span>Detail oriented</span>
                 <span>Creative thinker</span>
                 <span>Team player</span>
                 <span>Adaptable</span>
                 <span>Logical mind</span>
                 <span>Always improving</span>
                 <span>Problem solver</span>
                 <span>Tech enthusiast</span>
                 <span>Curious mindset</span>
                 <span>Fast learner</span>
                </div>
                <div className="marquee-group" aria-hidden="true">
                  <span>Clean code</span>
                  <span>Debugging mindset</span>
                  <span>Curious by nature</span>
                  <span>Continuous learning</span>
                  <span>System thinker</span>
                  <span>Creative solutions</span>
                  <span>Detail driven</span>
                  <span>Tech focused</span>
                  <span>Reliable teammate</span>
                  <span>Growth oriented</span>
                  <span>Clean code</span>
                  <span>Debugging mindset</span>
                  <span>Curious by nature</span>
                  <span>Continuous learning</span>
                </div>
              </div>
            </section>

            <section className="note-grid color-notes">
              {personalNotes.map((note, index) => (
                <article className={`note-card rise note-${index + 1}`} key={note.title}>
                  <h2>{note.title}</h2>
                  <p>{note.body}</p>
                </article>
              ))}
            </section>

            <section className="section contact-section" id="contact">
              <div className="section-heading rise">
                <p className="eyebrow">Connect</p>
                <h2>Have an opportunity, idea, or question?</h2>
              </div>
              <form className="contact-form rise" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label>
                    First name
                    <input id="firstname" value={formData.firstname} onChange={handleChange} className={formErrors.firstname ? 'input-error' : ''} placeholder="Jane" />
                    {formErrors.firstname && <span>{formErrors.firstname}</span>}
                  </label>
                  <label>
                    Last name
                    <input id="lastname" value={formData.lastname} onChange={handleChange} className={formErrors.lastname ? 'input-error' : ''} placeholder="Doe" />
                    {formErrors.lastname && <span>{formErrors.lastname}</span>}
                  </label>
                </div>
                <label>
                  Email
                  <input id="email" type="email" value={formData.email} onChange={handleChange} className={formErrors.email ? 'input-error' : ''} placeholder="jane@example.com" />
                  {formErrors.email && <span>{formErrors.email}</span>}
                </label>
                <label>
                  Message
                  <textarea id="message" rows="5" value={formData.message} onChange={handleChange} className={formErrors.message ? 'input-error' : ''} placeholder="Tell me what you are building..." />
                  {formErrors.message && <span>{formErrors.message}</span>}
                </label>
                {formErrors.server && <span className="form-status error">{formErrors.server}</span>}
                {formSuccess && <span className="form-status success">Message sent. I will get back to you soon.</span>}
                <button className="primary-btn" type="submit" disabled={formLoading}>
                  {formLoading ? 'Sending...' : 'Send message'}
                </button>
              </form>
            </section>

            <Footer />
          </>
        )}
      </main>

      {activeProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <article className="modal" ref={modalRef} onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close project details">x</button>
            <img src={activeProject.image} alt="" />
            <div className="modal-body">
              <p className="eyebrow">{activeProject.kicker}</p>
              <h2>{activeProject.title}</h2>
              <p>{activeProject.description}</p>
              <div className="tag-row">
                {activeProject.tags.map((tag) => <small key={tag}>{tag}</small>)}
              </div>
              <div className="modal-actions">
                {activeProject.live && (
                  <a className="primary-btn" href={activeProject.live} target="_blank" rel="noopener noreferrer">Open Live Site</a>
                )}
                {activeProject.github && (
                  <a className="ghost-btn" href={activeProject.github} target="_blank" rel="noopener noreferrer">Open GitHub</a>
                )}
                {!activeProject.live && !activeProject.github && (
                  <span className="project-status">{activeProject.kicker}</span>
                )}
              </div>
            </div>
          </article>
        </div>
      )}
    </>
  )
}
