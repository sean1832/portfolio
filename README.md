<h2 align="center">
  Zeke Zhang  Portfolio Website<br/>
  <a href="https://zekezhang.com" target="_blank">zekezhang.com</a>
</h2>

![mockup](./docs/images/portfolio-mockup.png)

![license](https://img.shields.io/github/license/sean1832/portfolio)
![nextjs-version](https://img.shields.io/badge/Next.js-14.1.1-blue)
![release](https://img.shields.io/github/v/release/sean1832/portfolio)
![status](https://img.shields.io/github/checks-status/sean1832/portfolio/master)

My architectural design portfolio website built with Next.js and Tailwind CSS, showcasing a range of projects and skills in a clean, minimalistic manor. It is fully responsive across all devices.

<h3 align="center">
    🔹
    <a href="https://github.com/sean1832/portfolio/issues">Report Bug</a> &nbsp; &nbsp;
    🔹
    <a href="https://github.com/sean1832/portfolio/issues">Request Feature</a>
</h3>

# 🌟 Features

- **Responsive Design**: Works smoothly on mobile, tablet, and desktop.
- **Customizable Content**: Easy to modify content to display your own projects and profile. (See [Managing Content](#managing-content). _This feature is still in development_)
- **SEO Optimized**: Includes metadata setup for SEO.

# 📋 Using This Repository

Feel free to use this codebase as a template for your own portfolio. If you do, please credit the original author, [@sean1832](https://github.com/sean1832/portfolio).

- 🌟 **Star this repository** if you find it useful!
- 💡 **Fork this repository** to begin using it as a base for your own project.

# 🛠️ Technologies Stack

- **[Next.js](https://nextjs.org/)** - The React framework for production.
- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework.
- **[Node.js](https://nodejs.org/en/)** - JavaScript runtime built on Chrome's V8 JavaScript engine.
- **[Shadcn UI](https://ui.shadcn.com/)** - A UI component library for React.
- **[JSON Schema](https://json-schema.org/)** - Validator for JSON documents.
- **[Vercel](https://vercel.com/)** - Platform for frontend frameworks and static sites.

# 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/en/) and [git](https://www.git-scm.com/downloads) installed on your machine.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/sean1832/portfolio.git
cd portfolio
npm install .
```

### Running Locally

Build and run the project:

```bash
npm run build
npm run start
```

# 🛠 Managing Content

Currently the content is stored in [`./data`](./data/) folder. You can modify the content in the following files:

| filename                                | description                   |
| --------------------------------------- | ----------------------------- |
| [`projects.json`](./data/projects.json) | Featured projects information |
| [`profile.json`](./data/profile.json)   | Personal profile information  |
| [`manifest.json`](./data/manifest.json) | Site manifest information     |

## Site Metadata

You can modify the site metadata in the [`./src/app/layout.js`](./src/app/layout.js) file. The metadata includes the site title, description, and social media links.

<details><summary><strong>Show Example</strong></summary>

```javascript
export const metadata = {
  metadataBase: new URL("https://zekezhang.com"), // Your site URL
  title: {
    default: "Zeke Zhang", // Default title
    template: "%s | Zeke Zhang", // Template title, %s will be replaced with the page title
  },
  description:
    "Melbourne based designer and researcher specializing machine learning, algorithmic design, and low-tech assembly craft in architecture.",
  icons: {
    icon: ["/favicon.ico?v=4"], // Favicon
    apple: ["/apple-touch-icon.png?v=4"], // Apple touch icon
    shortcut: ["/apple-touch-icon.png"], // Shortcut icon
  },
  keywords: [
    "Architecture",
    "Low-tech assembly craft",
    "Autonomos Material Reconstruction",
    "machine learning",
    "algorithmic design",
    "diffusion tectonics",
  ],
  creator: "Zeke Zhang", // Website creator
  manifest: "/site.webmanifest", // Path to site manifest
  authors: [{ name: "Zeke Zhang" }], // Website authors
  openGraph: {
    title: {
      default: "Zeke Zhang | Intelligent Synthesis", // Default title
      template: "Zeke Zhang | %s", // Template title, %s will be replaced with the page title
    },
    images: ["/opengraph-image.jpg"], // Open graph images
    description:
      "Melbourne based designer and researcher specializing machine learning, algorithmic design, and low-tech assembly craft in architecture.",
    type: "website", // Open graph type
    locale: "en_US", // Open graph locale
    url: "https://zekezhang.com", // Website URL
    siteName: "Zeke Zhang", // Website name
  },
};
```

</details>

## Managing Projects

The [`projects.json`](./data/projects.json) file located in the [`./data`](./data/) directory plays a key role in managing the projects showcased on your portfolio website. Here's an in-depth guide on how to effectively update and manage this file.

### Structure of [`projects.json`](./data/projects.json)

The JSON file is structured as an array of objects, each representing a project. Below is a detailed description of each field within a project object:

```yaml
- projects (array of objects, required)
  [
    - id (string, required)
    - name (string, required)
    - type (string, required)
      - Enum: ["Design Studio", "International Competition", "Design Studio / Research", "Research", "Research Assistanship"]
    - year (string, required)
    - description (string, required)
    - longDescription (string, required)
    - location (object, required)
      - name (string, required)
      - url (string, optional)
    - group (array of strings, optional)
    - awards (array of objects, optional)
        [
          - name (string, required)
          - url (string, optional)
          - img (string, optional)
        ]
    - publications (array of objects, optional)
        [
          - name (string, required)
          - url (string, required)
          - img (string, optional)
        ]
    - gallery (object, required)
      - className (string, required)
    - tutors (array of objects, optional)
        [
          - name (string, required)
          - url (string, required)
        ]
    - mediaContainer (object, required)
      - className (string, optional)
      - media (array of objects, optional)
          [
            - src (string, optional)
            - alt (string, optional)
            - className (string, optional)
            - credit (object, optional)
              - text (string, optional)
              - url (string, optional)
              - isButton (boolean, optional)
            - sizes (string, optional)
            - caption (object, optional)
              - text (string, optional)
              - isExpose (boolean, optional)
            - blurDataURL (string, optional)
            - isHero (boolean, optional)
            - isAdaptive (boolean, optional)
            - isCarousel (boolean, optional)
            - isExternal (boolean, optional)
            - isInverted (boolean, optional)
            - isVideo (boolean, optional)
          ]
  ]
```

### Notes

- The schema uses draft-07 of JSON Schema.
- Additional properties are not allowed in the project objects.
- The `location`, `gallery`, and `mediaContainer` objects are required for each project.

### Adding a New Project

To add a new project, simply append a new object to the array in [`projects.json`](./data/projects.json) using the schema provided above. Ensure all required fields are included to maintain site functionality.

## Managing Profile Information

Profile information is managed through the [`profile.json`](./data/profile.json) file located in the [`./data`](./data/) directory. This file is structured as a single JSON object representing your personal or professional profile.

### Structure of [`profile.json`](./data/profile.json)

Here’s what each field should contain:

## 🏗️ Structure
```yaml
- Profile object
  - name (string, required)
    - Description: A brief description of yourself.
  - about (string, required)
    - Description: A brief description of yourself.
  - image (object, optional)
    - src (string, required)
    - alt (string, optional)
  - keywords (array of strings, required)
  - slogan (string, required)
  - social (object, required)
    - instagram (string, optional)
      - Format: URI
    - github (string, optional)
      - Format: URI
    - youtube (string, optional)
      - Format: URI
  - contact (object, required)
    - email (string, optional)
      - Format: email
    - phone (string, optional)
```
### Notes
- The schema defines a single object with multiple properties.
- Required fields: `name`, `about`, `social`, `contact`, `keywords`, and `slogan`.
- The image object is optional, but if present, it must have a 'src' property.
- Social media links and contact information are structured as nested objects.
- All social media links should be valid URIs.
- The email field, if provided, should be in a valid email format.

## Images

Images are stored in the [`public`](./public/) folder. You can replace the images with your own images. Make sure to update the image paths in the [`projects.json`](./data/projects.json) file.

# 🤝 Contributing

Contributions to improve this project are welcome. Please follow the standard fork-and-pull request workflow.

# 📄 License

[Apache License 2.0](LICENSE)
