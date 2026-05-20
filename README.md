# Gabrielle Johnson Portfolio

A personal portfolio for Gabrielle Johnson, built to present software engineering work, QA experience, technical skills, and a more personal Life section in one responsive Next.js application.

The site combines a custom visual system, animated page transitions, project detail modals, responsive mobile navigation, and a server-backed contact form.

## Features

- Work and Life page views with browser history support
- Responsive hamburger navigation for mobile
- Project showcase cards with centered images for desktop and mobile
- Project detail modals with responsive image handling
- Experience, skills, resume, GitHub, and LinkedIn sections
- Contact form with validation and email delivery through Nodemailer
- GSAP scroll animations and custom cursor interactions
- Three.js hero visual built with React Three Fiber

## Tech Stack

- Next.js 16
- React 19
- CSS
- GSAP
- Three.js
- React Three Fiber
- Drei
- Nodemailer

## Project Structure

```text
app/
  api/contact/route.js   Contact form API route
  globals.css            Global styles and responsive layout
  layout.js              App metadata, fonts, and root layout
  page.js                Main portfolio experience
public/
  images/                Portfolio and section images
  resume.pdf             Resume/CV file
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

The contact form uses Gmail SMTP through Nodemailer. Create a `.env.local` file with:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

Use a Gmail app password instead of your regular account password.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deployment

This project can be deployed on Vercel or any platform that supports Next.js. Make sure the email environment variables are configured in the hosting provider before enabling the contact form in production.
