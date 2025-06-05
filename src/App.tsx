import { useState, useEffect } from 'react'
import FeaturedProjects from './components/FeaturedProjects'

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  fork: boolean;
}

function ProjectCard({ repo }: { repo: Repository }) {
  return (
    <div className="border p-4 rounded-xl shadow-md dark:bg-gray-800 dark:text-white">
      <h2 className="text-xl font-semibold mb-1">{repo.name}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{repo.description || 'No description available'}</p>
      <div className="flex gap-4 text-sm">
        <a href={repo.html_url} className="text-blue-600 dark:text-blue-400" target="_blank" rel="noreferrer">GitHub</a>
        {repo.homepage && (
          <a href={repo.homepage} className="text-green-600 dark:text-green-400" target="_blank" rel="noreferrer">Live Demo</a>
        )}
      </div>
    </div>
  );
}

function App() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    fetch('https://api.github.com/users/Tejaswi-Nooka/repos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch repositories')
        }
        return response.json()
      })
      .then(data => {
        setRepos(data.filter((repo: Repository) => !repo.fork))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen dark:text-white">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition-all">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Tejaswi's Portfolio</h1>
            <button
              onClick={() => setDark(!dark)}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
            >
              {dark ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-8">Welcome to my project showcase!</p>
          
          <FeaturedProjects />
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">All Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map(repo => <ProjectCard key={repo.id} repo={repo} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
