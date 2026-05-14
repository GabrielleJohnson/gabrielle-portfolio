'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Script from 'next/script'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'Portfolio',
    summary: 'A personal portfolio website built from scratch, featuring a 3D animated background, smooth scroll animations, a custom cursor, and a working contact form.',
    description: `This portfolio was designed and built from scratch. It features a live 3D background powered by Spline, smooth scroll animations using GSAP ScrollTrigger, and a fully custom animated cursor. The site is structured with a fixed navbar, scrollable content sections covering About, Experience, Projects, and Contact, all layered over the 3D scene.
    The contact form includes both client-side and server-side validation, and sends emails directly to my inbox using Nodemailer through a Next.js API route. Project cards open into animated modals with full descriptions and direct GitHub links. The design uses a consistent purple gradient theme with glassmorphism effects, a custom scrollbar, and hover animations throughout.
    Built with: Next.js 14, React, GSAP, Spline, Nodemailer, and CSS custom properties.`,
    image: '/images/portfolioImage.png',
    tags: ['Next.js', 'React', 'GSAP', 'Spline', 'Nodemailer', 'CSS'],
    github: 'https://github.com/GabrielleJohnson/gabrielle-portfolio.git',
  },
  {
    id: 2,
    title: 'Project Title',
    summary: 'Short description of what this project does and the tech used.',
    description: `Full detailed description of the project goes here. You can explain the problem you were solving, your approach, challenges you faced, and the outcome.`,
    image: '/images/your-image.png',
    tags: ['Java', 'JUnit'],
    github: 'https://github.com/YOUR-USERNAME/YOUR-REPO',
  },
  {
    id: 3,
    title: 'Project Title',
    summary: 'Short description of what this project does and the tech used.',
    description: `Full detailed description of the project goes here. You can explain the problem you were solving, your approach, challenges you faced, and the outcome.`,
    image: '/images/your-image.png',
    tags: ['Postman', 'REST API'],
    github: 'https://github.com/YOUR-USERNAME/YOUR-REPO',
  },
]

export default function Home() {
  const scrollRef = useRef(null)
  const cursorDot = useRef(null)
  const cursorRing = useRef(null)
  const modalRef = useRef(null)
  const [activeProject, setActiveProject] = useState(null)
  const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', message: '' })
  const [formErrors, setFormErrors] = useState({})
  const [formLoading, setFormLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.id]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setFormSuccess(false)
    setFormErrors({})

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const data = await res.json()
    setFormLoading(false)

    if (data.success) {
      setFormSuccess(true)
      setFormData({ firstname: '', lastname: '', email: '', message: '' })
    } else {
      setFormErrors(data.errors || {})
    }
  }

  const openModal = (project) => {
    setActiveProject(project)
    setTimeout(() => {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }
      )
    }, 10)
  }

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0, scale: 0.92, duration: 0.25, ease: 'power2.in',
      onComplete: () => setActiveProject(null)
    })
  }

  useEffect(() => {
    const container = scrollRef.current
    const dot = cursorDot.current
    const ring = cursorRing.current

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    })

    const loop = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(loop)
    }
    loop()

    const hoverEls = document.querySelectorAll('a, button, .card, .project-card, li')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'))
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'))
    })

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault()
        const target = document.querySelector(link.getAttribute('href'))
        if (!target) return
        container.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        })
      })
    })

    gsap.fromTo('.text1',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )
    gsap.fromTo('.hero-sub',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' }
    )
    gsap.fromTo('.navbar',
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )

    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.fromTo(title,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: title, scroller: container, start: 'top 85%' }
        }
      )
    })

    gsap.utils.toArray('.card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: card, scroller: container, start: 'top 88%' }
        }
      )
    })

    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)',
          delay: i * 0.12,
          scrollTrigger: { trigger: card, scroller: container, start: 'top 88%' }
        }
      )
    })

    gsap.fromTo('.about-grid',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-grid', scroller: container, start: 'top 85%' }
      }
    )

    gsap.fromTo('.contact-form',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-form', scroller: container, start: 'top 85%' }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={cursorDot} />
      <div className="cursor-ring" ref={cursorRing} />

      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.12.92/build/spline-viewer.js"
        strategy="beforeInteractive"
      />

      <spline-viewer
        className="background"
        url="https://prod.spline.design/dpbaDuRzk6jODzCa/scene.splinecode"
      />

      <nav className="navbar">
        <h1 className="logo">Gabrielle Johnson</h1>
        <ul className="menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="btn1">Resume</button>
      </nav>

      <div className="page-scroll" ref={scrollRef}>

        {/* HOME */}
        <section className="hero" id="home">
          <h1 className="text1">Gabrielle Johnson</h1>
          <p className="hero-sub">Software Engineer</p>
        </section>

        {/* ABOUT */}
        <section className="content-section" id="about">
          <h2 className="section-title">Hi Everyone!</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>Hi, I'm Gabrielle — a Computer Science student passionate about software quality, testing, and building reliable systems. I enjoy finding bugs before users do and making software that just works.</p>
              <p>When I'm not writing test cases or exploring automation frameworks, I'm learning new technologies and sharpening my development skills.</p>
              <div className="social-links">
                <a href="https://github.com/GabrielleJohnson" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a href="https://linkedin.com/in/gabrielle-johnson-0199a41a8" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">3+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">QA</span>
                <span className="stat-label">Specialization</span>
              </div>
              <div className="stat">
                <span className="stat-number">JM</span>
                <span className="stat-label">Based in Jamaica</span>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="content-section" id="experience">
          <h2 className="section-title">Experience</h2>
          <div className="card">
            <span className="card-year">June 2025 – December 2025</span>
            <h3 className="card-title">Quality Assurance Engineer Intern</h3>
            <span className="card-company">Grid Dynamics · Kingston</span>
            <p>Supported software testing and QA activities by validating features, testing APIs, and executing automated tests in Agile development environments. Contributed to improving software reliability, defect resolution, and overall testing efficiency.</p>
          </div>
          <div className="card">
            <span className="card-year">July 2022</span>
            <h3 className="card-title">Computer Technician (Part-time)</h3>
            <span className="card-company">Florville Pharmacy · Yallahs</span>
            <p>Provided technical support by troubleshooting software and system issues while assisting users with clear and effective solutions. Helped maintain smooth daily operations through system updates, configurations, and issue resolution.</p>
          </div>
          <div className="card">
            <span className="card-year">September 2020 – November 2020</span>
            <h3 className="card-title">Volunteer Lab Technician</h3>
            <span className="card-company">Yallahs High School · Yallahs</span>
            <p>Provided IT support by troubleshooting computer systems, assisting with network maintenance, and supporting users with the E-learning platform. Helped improve daily school operations through technical assistance and accurate data management.</p>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="content-section" id="projects">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {projects.map(project => (
              <div className="project-card" key={project.id} onClick={() => openModal(project)}>
                <img src={project.image} className="project-img" alt={project.title} />
                <div className="project-info">
                  <h3 className="card-title">{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span className="tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="content-section" id="contact">
          <h2 className="section-title">Lets Connect!</h2>
          <p className="contact-intro">
            Got a question, opportunity, or just want to say hi? Email me gabriellejohnson103@gmail.com
            or drop me a message below ☺️
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  placeholder="Jane"
                  value={formData.firstname}
                  onChange={handleChange}
                  className={formErrors.firstname ? 'input-error' : ''}
                />
                {formErrors.firstname && <span className="error-msg">{formErrors.firstname}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  placeholder="Doe"
                  value={formData.lastname}
                  onChange={handleChange}
                  className={formErrors.lastname ? 'input-error' : ''}
                />
                {formErrors.lastname && <span className="error-msg">{formErrors.lastname}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? 'input-error' : ''}
              />
              {formErrors.email && <span className="error-msg">{formErrors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="6"
                placeholder="Say something..."
                value={formData.message}
                onChange={handleChange}
                className={formErrors.message ? 'input-error' : ''}
              />
              {formErrors.message && <span className="error-msg">{formErrors.message}</span>}
            </div>
            {formErrors.server && <span className="error-msg">{formErrors.server}</span>}
            {formSuccess && <span className="success-msg">Message sent! I'll get back to you soon. 🎉</span>}
            <button type="submit" className="btn1" disabled={formLoading}>
              {formLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p className="footer-name">© 2025 Gabrielle Johnson</p>
          <div className="footer-icons">
            <a href="https://github.com/GabrielleJohnson" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/gabrielle-johnson-0199a41a8" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </footer>

      </div>

      {/* PROJECT MODAL */}
      {activeProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" ref={modalRef} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <img src={activeProject.image} className="modal-img" alt={activeProject.title} />
            <div className="modal-body">
              <div className="project-tags" style={{ marginBottom: '16px' }}>
                {activeProject.tags.map(tag => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
              <h2 className="modal-title">{activeProject.title}</h2>
              <p className="modal-description">{activeProject.description}</p>
              <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="modal-github-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}