export type GitHubProfile = {
  login: string
  name: string | null
  public_repos: number
  followers: number
  following: number
  html_url: string
}

const GITHUB_USERNAME = 'sks2705'
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`

export async function fetchGitHubProfile(): Promise<GitHubProfile | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/vnd.github+json',
      },
    })

    if (!res.ok) return null

    const json = (await res.json()) as GitHubProfile
    return json
  } catch {
    return null
  }
}



