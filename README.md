# Ursall Multiusos
[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/amartin-ursall/App_Multifuncional)
A modular, all-in-one productivity application featuring a minimalist and modern UI with a right-hand sidebar for seamless module navigation.
Ursall Multiusos is a modern, multifunctional productivity application designed with a minimalist aesthetic and a focus on user experience. It provides a central hub for various business modules including PDF management, Image handling, Templates, Data Connectors, Querying, Document storage, and Organization tools. The user interface is clean, with generous whitespace, a sophisticated neutral color palette with a single primary accent, and subtle, fluid animations to enhance user interaction without being distracting.
## Key Features
- **Modular Architecture**: Separate, focused modules for different tasks (PDFs, Images, Documents, etc.).
- **Minimalist & Modern UI**: Clean, uncluttered interface built with shadcn/ui and Tailwind CSS.
- **Intuitive Navigation**: A unique right-hand sidebar for quick access to all modules.
- **Responsive Design**: Flawless experience on desktop, tablet, and mobile devices.
- **Subtle Animations**: Smooth transitions and micro-interactions powered by Framer Motion.
- **Theming**: Built-in support for both light and dark modes.
## Technology Stack
- **Frontend**:
  - [React](https://react.dev/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Framer Motion](https://www.framer.com/motion/)
  - [React Router](https://reactrouter.com/)
  - [Zustand](https://zustand-demo.pmnd.rs/)
- **Backend**:
  - [Cloudflare Workers](https://workers.cloudflare.com/)
  - [Hono](https://hono.dev/)
- **Tooling**:
  - [Bun](https://bun.sh/)
  - [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
  - [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
## Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
- [Node.js](https://nodejs.org/) (v20 LTS or later)
- [Bun](https://bun.sh/) (v1.0 or later)
- A [Cloudflare account](https://dash.cloudflare.com/sign-up)
### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ursall_multiusos.git
    cd ursall_multiusos
    ```
2.  **Install dependencies:**
    This project uses `bun` as the package manager.
    ```bash
    bun install
    ```
3.  **Set up environment variables:**
    The frontend needs to know the URL of the backend API. Create a `.env` file in the root of the project:
    ```bash
    cp .env.example .env
    ```
    The default value `VITE_API_URL=http://localhost:8788/api` is suitable for local development.
## Development
To run the application locally, you need to start both the frontend Vite server and the backend Cloudflare Worker.
1.  **Start the backend worker:**
    Open a terminal and run the following command to start the local Wrangler development server:
    ```bash
    bun wrangler dev
    ```
    This will typically start the worker on `http://localhost:8788`.
2.  **Start the frontend application:**
    In a separate terminal, run the Vite development server:
    ```bash
    bun dev
    ```
    This will start the frontend application, usually on `http://localhost:3000`. You can now open this URL in your browser.
## Deployment
This project is configured for seamless deployment to Cloudflare Pages.
1.  **Log in to Cloudflare:**
    If you haven't already, authenticate Wrangler with your Cloudflare account.
    ```bash
    bun wrangler login
    ```
2.  **Deploy the application:**
    Run the deploy script. This command will build the Vite application and deploy both the static assets and the worker functions to Cloudflare.
    ```bash
    bun run deploy
    ```
    Wrangler will provide you with the final URL for your deployed application.
Alternatively, you can deploy directly from your GitHub repository with a single click.
[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/amartin-ursall/App_Multifuncional)