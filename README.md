# AI Workplace Productivity Assistant

## Project Overview

The **AI Workplace Productivity Assistant** is a modern, responsive web application designed to help professionals simplify everyday workplace tasks using AI-inspired tools. It provides a central dashboard for generating professional emails, summarising research, and interacting with a workplace chatbot.

The application features a clean, dark-themed interface with charcoal grey, black, and subtle blue accents. It is designed for easy access without requiring users to register, sign in, or provide personal information.

## Features Implemented

- **Dashboard:** Central workspace with sidebar navigation and access to all tools.
- **Smart Email Generator:** Helps users draft professional emails using Formal, Friendly, and Persuasive tones.
- **AI Research Assistant:** Summarises topics or user-provided text and presents key insights and recommendations.
- **AI Chatbot:** Provides an interactive interface for workplace-related questions and prompts.
- **Responsive Design:** Supports desktop and mobile devices.
- **Input and Output Sections:** Allows users to enter prompts and view generated results.
- **Responsible AI Disclaimer:** Reminds users to verify AI-generated content and avoid sharing sensitive information.
- **No Authentication Required:** Users can access the application directly without registration or sign-in.
- **Frontend-Only Implementation:** No backend or database is required. Responses may be simulated if no AI API is connected.

## Technologies and Tools Used

The following technologies may be used, depending on the final implementation:

- **Lovable:** AI-powered application development and UI generation.
- **React:** Building reusable user interface components.
- **TypeScript:** Adding type safety to application code.
- **Tailwind CSS:** Styling and responsive layouts.
- **Lucide Icons:** Providing modern interface icons.
- **Git and GitHub:** Version control and project hosting.
- **Vite:** Development server and frontend build tool, if included in the generated project.

## Setup Instructions

### Prerequisites

Install the following tools:

- [Node.js](https://nodejs.org/) (use a version compatible with the project dependencies).
- npm, which is included with Node.js.
- [Git](https://git-scm.com/), if cloning the repository.

### 1. Clone the Repository

Replace `YOUR-USERNAME` with your GitHub username and `YOUR-REPOSITORY` with your repository name.

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

### 2. Navigate to the Project Folder

```bash
cd YOUR-REPOSITORY
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

```bash
npm run dev
```

Open the local URL displayed in your terminal, commonly `http://localhost:5173`, to access the application.

### 5. Build for Production

To create a production build, run:

```bash
npm run build
```

To preview the production build locally, run:

```bash
npm run preview
```

*Note: These commands assume the generated project uses Vite and npm. Check the project's `package.json` for the actual available scripts.*

## Responsible AI and Limitations

This application is designed to support workplace productivity, not replace professional judgement. Users should review generated emails, research summaries, recommendations, and chatbot responses for accuracy before relying on them.

Unless a real AI service is connected, generated responses are simulated and should not be presented as outputs from a live AI model. Avoid entering confidential, personal, or sensitive workplace information.

## Future Improvements

- Integrate a real AI API for live email generation, research summaries, and chatbot responses.
- Add export and copy-to-clipboard functionality.
- Improve response customisation and formatting.
- Introduce optional conversation history using privacy-conscious storage.
- Deploy the application for public access.

## Project Status

**Status:** Frontend prototype

The project focuses on delivering a responsive, user-friendly interface for common workplace productivity tasks without requiring a backend or user authentication.

## License

This project is available for educational and portfolio purposes. Add a specific open-source licence, such as the MIT License, if you intend to permit reuse and redistribution under its terms.
