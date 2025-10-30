function Title({ children }: { children: React.ReactNode }) {
    return <h1 className="text-neutral-700"><span className="group-hover:text-blue-500">/*</span> {children} <span className="group-hover:text-blue-500">*/</span></h1>
}

export default Title
