export interface IProject {
  title: string;
  description: string;
  tags: string[];
  github: string;
  video: string;
  featured: boolean;
}

const projects: IProject[] = [
  {
    title: "Fwdly",
    description:
      "A URL-shortening platform built around independent Go services. Separates link management from latency-sensitive redirects, using PostgreSQL, Redis, and Kafka to handle persistence, caching, and asynchronous workflows, with subscription billing through Stripe.",
    tags: ["Go", "Microservices", "PostgreSQL", "Redis", "Kafka", "Stripe"],
    github: "https://github.com/nikhil-thorat/fwdly",
    video: "fwdly.mp4",
    featured: true,
  },
  {
    title: "MiniDB",
    description:
      "An embedded, in-memory key-value database built from scratch in C. Combines custom memory management, cache-conscious hash tables, sharding, and O(1) LRU eviction. Benchmarked across 50 million operations, achieving approximately 1.2M writes/sec and 2.8M reads/sec.",
    tags: [
      "C",
      "Memory Management",
      "Hashing",
      "Data Structures",
      "Performance",
    ],
    github: "https://github.com/nikhil-thorat/minidb",
    video: "minidb.mp4",
    featured: true,
  },
  {
    title: "Relay",
    description:
      "A lightweight HTTP load balancer written in Go, designed as both a standalone CLI and an embeddable package. Features modular routing strategies, backend health checks, reverse proxying, structured logging, and optional Prometheus metrics.",
    tags: [
      "Go",
      "Reverse Proxy",
      "Load Balancing",
      "Networking",
      "Concurrency",
    ],
    github: "https://github.com/nikhil-thorat/relay",
    video: "relay.mp4",
    featured: true,
  },
  {
    title: "CHIP8",
    description:
      "A CHIP-8 emulator implemented from scratch in C, without external dependencies. Models a virtual CPU, memory, instruction execution, display, keypad, and timers, with the emulation core decoupled from terminal I/O.",
    tags: ["C", "Emulation", "Computer Architecture", "Low-Level Programming"],
    github: "https://github.com/nikhil-thorat/chip8",
    video: "chip8.mp4",
    featured: true,
  },
  {
    title: "Paper Pilot",
    description:
      "An Arcade style Game made with Pygame base on a Paper Plane which is being chased by Pencils, the main Goal is to stay alive and collect Coins which spaws randomly and If you manage to collied Pencils with each other you get Bonus points",
    tags: [
      "Python",
      "Pygame",
      "Object-Oriented Programming",
      "Game Development",
    ],
    github: "https://github.com/nikhil-thorat/PaperPilot",
    video: "paper_pilot.mp4",
    featured: true,
  },
];

export default projects;
