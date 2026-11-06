# Charles Shalua – React Portfolio

**Live site:** https://charlesAlgo.github.io/react-portfolio/

My personal portfolio website, built with **React**, **React Router** and **Vite**, styled with plain CSS, and hosted on **GitHub Pages**.

## Pages

| Page | What it shows |
|---|---|
| Home | Welcome message, mission statement, links into the site |
| About | Legal name, headshot, short bio, resume (PDF) link |
| Projects | Three highlighted projects with image, role, description and outcome |
| Education | Educational and professional qualifications with dates |
| Services | The services I offer |
| Contact | Contact details panel and a message form |

## Running locally

```bash
npm install
npm run dev      # start the dev server
npm run lint     # check the code for problems
npm run build    # production build into dist/
```

## Deploying

```bash
npm run deploy   # builds the site and publishes dist/ to the gh-pages branch
```

## Editing the content

All personal content (name, bio, projects, education, services and contact details) lives in **`src/data/portfolioData.js`**. Images are in `public/images/` and the resume is `public/resume.pdf`.

## Project structure

```
src/
  main.jsx            entry point, wraps the app in HashRouter
  App.jsx             layout: Navbar, page routes, Footer
  data/               portfolioData.js (all site content)
  components/         reusable pieces (Navbar, Logo, Footer, cards)
  pages/              one component + stylesheet per page
public/
  images/             profile, project and service images
  resume.pdf          downloadable resume
```

## Author

**Charles Shalua** – [GitHub](https://github.com/charlesAlgo) · [LinkedIn](https://www.linkedin.com/in/charles-shalua/) · [Data-Life Tech](https://data-life.tech)
