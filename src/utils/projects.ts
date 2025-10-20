export interface IProject {
  title: string,
  description: string
  github: string
}

const projects: IProject[] = [{
  title: "Pit - basic implementation of Git",
  description: "Built a small scale version of Git from scratch using Python. Understood how version control systems work under the hood. Used SOLID and OOP patterns.",
  github: "https://github.com/nikhil-thorat/pit"
},
]

export default projects
