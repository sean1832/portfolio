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
npm run build
npm run preview
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

All media assets (images, videos) for the projects are stored in the `/src/lib/assets` folder. When adding a new project, make sure to place the corresponding media files in this directory and reference them correctly in your project data file.
