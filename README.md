# Portfolio

This repository is my personal portfolio showcasing my projects.

## Quick Start

To get started, fork the repository and clone it to your local machine.

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
npm install
npm run dev
```

### Building the Project

To build the project, ensure you have the necessary dependencies installed. Then run:

```bash
npm install
npm run build:placeholders && npm run build
npm run preview
```

Before deploying, generate tiny blur-up placeholders for images (used by the image components):

```bash
npm run build:placeholders
```

### Build OG Image

To update the OG image, modify the `og-image.svg` located in `/static` folder and run the following command to generate a new PNG image:

```bash
npm run build:og
```

### Build video thumbnails

After updating any video, run the following command to generate new video thumbnails:

```bash
npm run build:vid
```

Note: Videos and posters should be placed in the `static/projects/[project-name]/` folder.

## Stacks

- SvelteKit
- TypeScript
- TailwindCSS
- Vite
- Shadcn-Svelte

## Modify project content

All projects data are stored under `src/lib/data` folder in typescript files. You can modify or add your projects in these files. Each project should follow the structure defined in the `Project` type found in `src/lib/types/project.ts`.

To add a new project, simply create a new typescript file under the `src/lib/data/designs` or `src/lib/data/tools` folder and export a project object that adheres to the `Project` type. It should automatically populate in the portfolio.

### Media Assets

All media assets (images, videos) for the projects are stored in the `static/projects/[project-name]/` folder. Use pre-optimized image formats (AVIF/WebP) and pre-encoded video codecs (AV1/VP9 + H.264) for best results.

Workflow for images:

- Place files in `static/projects/[project-name]/`.
- Run `npm run build:placeholders` to generate `static/placeholders.json` (manifest of tiny base64 placeholders).
- In project data, reference images by root path, e.g. `/projects/agentic/collage.avif`.

Workflow for videos:

- Place videos and posters in `static/projects/[project-name]/`.
- Run `npm run build:vid` to generate any missing posters.
- In project data, reference video paths directly, e.g. `/projects/agentic/horizontal-preview.AV1.webm` and provide a `fallbackSrc` for H.264 MP4 when needed.
