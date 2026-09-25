export interface IProject {
    title: string,
    description: string
    tags: string[],
    github: string
}

const projects: IProject[] = [
    {
        title: "MiniDB",
        description: "A blazing-fast, in-memory key-value database built entirely from scratch in C. MiniDB is an embedded database engine designed to process millions of operations per second. It acts as an LRU (Least Recently Used) cache and relies on custom memory management, bitwise math, and an optimized hashing algorithm to achieve extreme hardware efficiency.",
        tags: ["C", "Memory Management", "Hashing", "LRU Cache"],
        github: "https://github.com/nikhil-thorat/minidb"
    },
    {
        title: "Relay",
        description: "Relay is a lightweight load balancer written in Go. It is designed to be used both as a standalone CLI application and as an embeddable Go package. The project focuses on simplicity, extensibility, and observability while providing a solid foundation for building production-grade traffic routing systems.",
        tags: ["Go", "Reverse Proxy", "Load Balancer", "Networking", "Concurrency"],
        github: "https://github.com/nikhil-thorat/relay"
    },
    {
        title: "CHIP8",
        description: "Implemented a terminal-based CHP8 emulator in C from ground up with zero external dependencies, including CPU state, 4KB memory, 62x32(VRAM) display memory, hexadecimal keypad, timers and audio state.",
        tags: ["C", "Emulation", "Computer Architecture", "Low-Level Programming"],
        github: "https://github.com/nikhil-thorat/chip8"
    },
    {
        title: "PlaceMate [Actively developing]",
        description: "Developed a placement-cell platform connecting students, placement-cell members and companies for profile-management, opportunity discovery, application tracking, central dashboards and AI-assisted tutoring.",
        tags: ["Next.js", "Typescript", "React", "Supabase", "Multi-Agent Systems"],
        github: "https://github.com/CODEFORBLIND/placemate"
    },
]

export default projects
