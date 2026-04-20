export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  language: string;
}

export async function getRepositories(username: string): Promise<Repository[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) throw new Error('Failed to fetch repositories');
    
    const data: Repository[] = await res.json();
    return data;
  } catch (error) {
    console.error('GitHub API Error:', error);
    return [];
  }
}

export function filterRepositories(repos: Repository[], category: string) {
  if (category === 'All') return repos;
  
  return repos.filter(repo => {
    const searchString = `${repo.name} ${repo.description} ${repo.topics.join(' ')}`.toLowerCase();
    
    if (category === 'AI') {
      return searchString.includes('ai') || searchString.includes('ml') || searchString.includes('intelligence') || searchString.includes('llm');
    }
    if (category === 'Full Stack') {
      return searchString.includes('fullstack') || searchString.includes('full-stack') || (searchString.includes('next') && searchString.includes('supabase')) || searchString.includes('mern');
    }
    if (category === 'Web') {
      return searchString.includes('web') || searchString.includes('frontend') || searchString.includes('react') || searchString.includes('html');
    }
    return true;
  });
}
