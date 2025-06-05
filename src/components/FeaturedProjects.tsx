interface Project {
  name: string;
  description: string;
  github: string;
  live: string;
}

export const featured: Project[] = [
  {
    name: "Expense Tracker API",
    description: "Track your personal expenses with JWT auth and PostgreSQL backend.",
    github: "https://github.com/Tejaswi-Nooka/expense-tracker-api",
    live: ""
  },
  {
    name: "Task Manager API",
    description: "Manage daily tasks with secure token-based login.",
    github: "https://github.com/Tejaswi-Nooka/task-manager-api",
    live: ""
  }
];

export default function FeaturedProjects() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">⭐ Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map((proj, i) => (
          <div key={i} className="border p-4 rounded-xl shadow-md dark:bg-gray-800 dark:text-white">
            <h3 className="text-lg font-bold">{proj.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{proj.description}</p>
            <div className="flex gap-4 text-sm">
              <a href={proj.github} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400">GitHub</a>
              {proj.live && (
                <a href={proj.live} target="_blank" rel="noreferrer" className="text-green-600 dark:text-green-400">Live</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 