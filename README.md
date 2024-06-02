<h2 align="center">
  Zeke Zhang  Portfolio Website<br/>
  <a href="https://zekezhang.com" target="_blank">zekezhang.com</a>
</h2>

My personal portfolio website built with Next.js and Tailwind CSS. The website showcases my past projects, skills, and experiences.

> **Note:** 🚧The website is still under development and will be updated frequently.

> You are welcome to use this as a template for your own portfolio website. If you do, please give credit to the original author.

## Build With

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Run Locally

To run the project locally, clone the repository and run the following commands:

```bash
npm install .
npm run build
npm run start
```

## Modify Content

Currently the content is stored in `data` folder. You can modify the content in the following files:

| filename               | description                   |
| ---------------------- | ----------------------------- |
| `projects.json`        | Featured projects information |
| `projects-schema.json` | JSON schema for the projects  |
| `profile.json`         | Personal profile information  |
| `navbar.json`          | Navigation bar links          |

> There is a plan to move the content to a CMS in the future.

## To-Do

- [x] Responsive design
- [x] Server-side rendering
- [x] Dark mode
- [x] Open graph meta
- [x] SEO optimization
- [x] Detailed project pages
  - [x] Carousel
  - [x] Mobile view
- [x] UI/UX improvements
  - [x] Long text ellipsis
  - [x] Scroll to top button
  - [x] Navigation button improvements
- [ ] Resume download
- [ ] Coding projects section

## Improvements

Improvements from reddit feedback:

[Reddit thread 1](https://www.reddit.com/r/webdev/comments/1d5ssym/comment/l6nws0g/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

- [x] Vertical padding issue for smaller screens
- [x] Enlarge about section icon size
- [x] Optimize for tablet and laptop screen larger than 1024px, smaller than 1600px in project description section
- [x] Theme toggle button as rectangular to match rest of the design
- [x] System theme detection
