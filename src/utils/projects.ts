export interface IProject {
    title: string,
    description: string
    tags: string[],
    github: string
}

const projects: IProject[] = [
    {
        title: "Pit — Basic Implementation of Git",
        description: "Built a lightweight version control system from scratch in Python, recreating Git’s core functionalities like commit, diff, and checkout. Focused on understanding how Git manages file versions internally, applying SOLID principles and object-oriented design.",
        tags: ["Python", "Version Control", "OOP", "Design Patterns", "SOLID", "CLI Tools"],
        github: "https://github.com/nikhil-thorat/pit"
    },
    {
        title: "Goauth — User Authentication System with SMTP",
        description: "Developed a secure authentication service in Go with email verification through SMTP. Implemented password hashing, JWT-based authentication, and modular architecture to improve scalability and maintainability,",
        tags: ["Golang", "REST API", "Authentication", "JWT", "SMTP", "Backend"],
        github: "https://github.com/nikhil-thorat/goauth"
    },
    {
        title: "Notable — Minimal Markdown Note-Taking App",
        description: "Created a zenful, cross-platform desktop app for writing notes in Markdown using Electron. Focused on building a minimal and distraction-free writing experience with live preview, local storage, and keyboard-driven navigation for better productivity.",
        tags: ["Electron", "JavaScript", "Desktop App", "Markdown", "UI/UX"],
        github: "https://github.com/nikhil-thorat/Notable"
    },
    {
        title: "Promptnation — AI Prompt Sharing Hub",
        description: "Developed a platform for prompt engineers to explore and share AI prompts, with an integrated AI chatbot built using Next.js. Focused on full-stack development, integrating server components, authentication, and MongoDB for a dynamic, responsive experience.",
        tags: ["Next.js", "TypeScript", "React", "Node.js", "MongoDB", "AI", "Full Stack"],
        github: "https://github.com/nikhil-thorat/prompt-nation"
    },
    {
        title: "PaperPilot — 2D Arcade Game",
        description: "Designed and built a fast-paced 2D arcade game using Python and Pygame. Implemented physics-based movement, collision detection, and smooth animation loops while exploring game design and real-time event handling.",
        tags: ["Python", "Pygame", "Game Development", "Physics", "Animation"],
        github: "https://github.com/nikhil-thorat/PaperPilot"
    }
]

export default projects
