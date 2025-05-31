
# ContractGuard AI - Your AI-Powered Contract Co-Pilot & Negotiation Coach

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-13.5.4-000000?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

ContractGuard AI is a cutting-edge Next.js web application that leverages advanced AI to transform how individuals and businesses handle contracts. This comprehensive platform provides intelligent tools for contract analysis, risk assessment, legal document understanding, and negotiation simulation, all wrapped in an intuitive, user-friendly interface.

## 🚀 Key Features

- **AI-Powered Contract Analysis**: Upload and scan contracts for potential risks and issues
- **Plain-English Explanations**: Decode complex legal jargon into understandable language
- **Clause Guardian**: Identify and improve potentially unfavorable contract terms
- **Negotiation Simulator**: Practice contract negotiations with AI-powered scenarios
- **Responsive Design**: Fully responsive interface that works across all devices
- **Modern Tech Stack**: Built with Next.js 13+, TypeScript, and Tailwind CSS
- **AI Integration**: Leverages advanced language models for intelligent contract processing
- **Secure & Private**: Built with security and data privacy as top priorities

## 🛠️ Technology Stack

### Core Technologies
- **Frontend Framework**: [Next.js 13+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5.2+](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4+](https://tailwindcss.com/) with CSS Modules
- **UI Components**: Custom components built with [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **AI Integration**: [Genkit AI](https://github.com/google/generative-ai-js/tree/main/packages/genkit)

### Development Tools
- **Package Manager**: npm
- **Code Formatting**: Prettier
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Version Control**: Git

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm 9.6.7 or later
- Git
- Firebase project (for authentication and database)
- Google Cloud Project (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbhinavAnand241201/contract-Guard-AI.git
   cd contract-Guard-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   
   # Google Cloud (for AI features)
   GOOGLE_APPLICATION_CREDENTIALS=path/to/your/service-account-key.json
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 🏗️ Project Structure

```
contract-Guard-AI/
├── public/                     # Static files
│   └── assets/                 # Images and other static assets
│       ├── avatars/            # User profile pictures
│       └── features/           # Feature showcase images
├── src/
│   ├── ai/                    # AI integration and flows
│   │   ├── flows/             # Individual AI workflows
│   │   └── genkit.ts          # Genkit AI configuration
│   ├── app/                   # Next.js 13+ app directory
│   │   ├── dashboard/         # Dashboard page
│   │   ├── pricing/           # Pricing page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable UI components
│   │   ├── ui/                # Shadcn/ui components
│   │   └── *.tsx              # Feature components
│   └── lib/                   # Utility functions and hooks
├── .eslintrc.json             # ESLint configuration
├── .gitignore                 # Git ignore file
├── next.config.ts             # Next.js configuration
├── package.json               # Project dependencies
└── tsconfig.json              # TypeScript configuration
```

## 🧩 Features in Detail

### 1. AI Contract Risk Scanner
- Upload documents in various formats (PDF, DOCX, TXT)
- AI analyzes the contract for potential risks and assigns a risk score
- Detailed risk report with highlighted sections
- Actionable insights and recommendations

### 2. Plain-English Clause Decoder
- Paste any legal clause for instant analysis
- Get clear, jargon-free explanations
- Understand the implications of complex terms
- Save and organize decoded clauses for future reference

### 3. Clause Guardian AI
- Identify potentially unfavorable terms
- Get AI-suggested improvements
- Compare original vs. improved clauses
- Export enhanced contract versions

### 4. AI Negotiation Simulator
- Practice contract negotiations in realistic scenarios
- AI-powered counterparty simulation
- Receive feedback on your negotiation approach
- Learn effective negotiation strategies

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to a GitHub repository
2. Import the repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

Abhinav Anand - [@your_twitter](https://twitter.com/your_twitter)

Project Link: [https://github.com/AbhinavAnand241201/contract-Guard-AI](https://github.com/AbhinavAnand241201/contract-Guard-AI)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [Shadcn/ui](https://ui.shadcn.com/)

## Overview

Navigating contracts can be daunting. ContractGuard AI aims to level the playing field by providing users with AI-driven insights and tools. Whether you're a freelancer, a small business owner, or an individual dealing with legal agreements, ContractGuard AI helps you:

*   **Understand Complexity**: Decode complex legal clauses into plain English.
*   **Identify Risks**: Scan contracts for potential pitfalls and ambiguities.
*   **Protect Your Interests**: Generate counter-clauses to safeguard your position.
*   **Hone Negotiation Skills**: Practice negotiation strategies against an AI opponent in various scenarios.

## Key Features

1.  **AI Contract Risk Scanner**:
    *   Upload contract documents (PDF, DOCX, TXT).
    *   Receives an AI-generated risk report, a risk score (0-100), and a list of specific risk factors.
    *   Helps users quickly assess the potential dangers in an agreement.

2.  **Basic Clause Decoder**:
    *   Paste any complex legal clause.
    *   Get an instant, easy-to-understand explanation in plain English.
    *   Breaks down jargon and clarifies the implications of specific terms.

3.  **1-Click Protection**:
    *   Input the text of a contract.
    *   The AI generates a protective counter-clause designed to safeguard the user's interests.
    *   Offers a quick way to add a layer of security to agreements.

4.  **AI Negotiation Simulator**:
    *   **Interactive Practice**: Simulate contract negotiations against an AI.
    *   **Role & Scenario Selection**: Choose from pre-defined counterparty roles (e.g., Landlord, Client, Employer) and common negotiation scenarios.
    *   **Dynamic Conversation**: Engage in a turn-based conversation with the AI, which adapts its responses based on the chosen role and ongoing dialogue.
    *   **Feedback System**: After the simulation, receive an effectiveness score, identification of key mistakes, and actionable improvement suggestions.

5.  **User-Friendly Dashboard**:
    *   Access all features through a clean, tabbed interface.
    *   Intuitive controls for uploading files, inputting text, and interacting with AI tools.

6.  **Landing & Pricing Pages**:
    *   A welcoming landing page detailing the app's value proposition and features.
    *   A clear pricing page outlining different membership tiers (Starter, Pro, Enterprise) and their respective benefits.

## Technology Stack

*   **Frontend**:
    *   **Next.js**: React framework for server-side rendering, static site generation, and a seamless developer experience.
    *   **React**: JavaScript library for building user interfaces.
    *   **TypeScript**: Superset of JavaScript that adds static typing.
*   **UI Components & Styling**:
    *   **ShadCN UI**: Re-usable components built with Radix UI and Tailwind CSS.
    *   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
    *   **Lucide React**: Library for beautiful and consistent icons.
*   **AI & Generative Features**:
    *   **Genkit (by Google)**: Toolkit for building AI-powered features, used here to interface with Google's Gemini models.
    *   **Google Gemini Models**: Leveraged for text generation, analysis, and conversational AI.
*   **State Management**: Primarily client-side state using React Hooks (`useState`, `useEffect`).
*   **Deployment**: Configured for Firebase App Hosting (see `apphosting.yaml`).

## Project Structure

```
.
├── public/                 # Static assets
├── src/
│   ├── ai/                 # Genkit AI flows and configuration
│   │   ├── flows/          # Specific AI feature flows (e.g., risk scanning, negotiation)
│   │   ├── dev.ts          # Genkit development server entry point
│   │   └── genkit.ts       # Genkit global AI instance configuration
│   ├── app/                # Next.js App Router (pages, layouts)
│   │   ├── (pages)/        # Route groups
│   │   │   ├── dashboard/
│   │   │   ├── pricing/
│   │   │   └── page.tsx    # Landing page
│   │   ├── globals.css     # Global styles and Tailwind directives
│   │   └── layout.tsx      # Root layout
│   ├── components/         # React components
│   │   ├── ui/             # ShadCN UI components
│   │   ├── *.tsx           # Custom application components (header, footer, feature components)
│   ├── hooks/              # Custom React hooks (e.g., useToast, useMobile)
│   └── lib/                # Utility functions (e.g., cn for classnames)
├── .env                    # Environment variables (e.g., API keys)
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add your Google AI (Gemini) API key:
    ```env
    GOOGLE_API_KEY=your_gemini_api_key_here
    ```
    You can obtain an API key from [Google AI Studio](https://aistudio.google.com/).

## Running the Application

### Development Mode

To run the Next.js application in development mode:

```bash
npm run dev
```

This will typically start the application on `http://localhost:9002`.

### Genkit Development

Genkit flows are developed and can be tested separately. To start the Genkit development server (which allows you to inspect and run flows via the Genkit Developer UI):

```bash
npm run genkit:dev
```

Or, to watch for changes in your flow files and automatically restart:

```bash
npm run genkit:watch
```

The Genkit Developer UI is usually available at `http://localhost:4000`.

### Production Build & Start

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## AI Flows

The core AI functionalities are implemented as Genkit flows located in `src/ai/flows/`. Each flow typically defines:
*   Input and output schemas using Zod.
*   A prompt template for the Gemini model.
*   The logic to call the AI model and process its response.

**Key Flows:**

*   **`contract-risk-scanner.ts`**: Analyzes a contract document (provided as a data URI) and returns a risk report, score, and contributing factors.
*   **`basic-clause-decoder.ts`**: Takes a legal clause as input and returns a plain English explanation.
*   **`one-click-protection.ts`**: Accepts contract text and generates a protective counter-clause.
*   **`negotiation-simulator-flow.ts`**: Manages the AI's responses in the negotiation simulator based on role, scenario, and conversation history.
*   **`negotiation-feedback-flow.ts`**: Analyzes a completed negotiation conversation and provides feedback on user performance, including an effectiveness score, key mistake, and improvement suggestion.

## UI & Styling

*   **ShadCN UI**: Provides a base set of accessible and customizable components. These are located in `src/components/ui/`.
*   **Tailwind CSS**: Used for all styling. Utility classes are applied directly in the JSX. The main theme (colors, fonts, etc.) is configured in `tailwind.config.ts` and `src/app/globals.css`.
*   **Custom Components**: Application-specific components like `AppHeader`, `AppFooter`, and feature-specific components (e.g., `ContractRiskScannerFeature`) are in `src/components/`.
*   **Responsiveness**: The UI is designed to be responsive across various screen sizes using Tailwind's responsive prefixes (sm, md, lg, etc.).

## Pages & Routing

The application uses the Next.js App Router. Key pages include:

*   **`/` (Landing Page - `src/app/page.tsx`)**: Introduces the app, its features, and value proposition.
*   **`/dashboard` (`src/app/dashboard/page.tsx`)**: The main user dashboard where all AI tools are accessible via tabs.
*   **`/pricing` (`src/app/pricing/page.tsx`)**: Displays the available subscription plans and their features.

Global layout elements like the header and footer are defined in `src/app/layout.tsx`.

## Future Enhancements

*   User authentication and accounts.
*   Saving and managing scanned contracts and reports.
*   Pro tier features for the Negotiation Simulator (custom roles, industry-specific scenarios, emotion-aware AI).
*   Advanced analytics on negotiation performance.
*   Integration with document storage services.
*   Team collaboration features.

---

This README provides a comprehensive overview of the ContractGuard AI project. For more detailed information on specific Next.js or Genkit features, please refer to their official documentation.
