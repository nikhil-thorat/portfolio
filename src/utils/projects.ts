export interface IProject {
    title: string,
    description: string
    github: string
}

const projects: IProject[] = [{
    title: "Pit - Basic implementation of Git",
    description: "Built a small scale version of Git from scratch using Python. Understood how version control systems work under the hood. Used SOLID and OOP patterns.",
    github: "https://github.com/nikhil-thorat/pit"
},
{
    title: "Goauth - User auth system with SMTP service",
    description:
        "Created a api server for handling user authentication with email verification while learning Golang.",
    github: "https://github.com/nikhil-thorat/goauth",
},
{
    title: "Notable - Minimal note taking desktop app",
    description:
        "Developed a zenful desktop application for taking notes in markdown syntax using Electron framework.",
    github: "https://github.com/nikhil-thorat/Notable",
},
{
    title: "Promptnation - Hub for sharing and exploring AI prompts",
    description:
        "Made a platform for prompt engineers for exploring and sharing AI prompts with integrated AI chat bot using NextJs.",
    github: "https://github.com/nikhil-thorat/prompt-nation",
},
{
    title: "PaperPilot - 2D arcage game",
    description: "Developed an Arcade style 2d game with Python and Pygame.",
    github: "https://github.com/nikhil-thorat/PaperPilot",
},
]

export default projects
