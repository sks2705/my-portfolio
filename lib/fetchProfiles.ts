type GitHubUser = any
type LeetCodeUser = any

async function fetchGitHub(username?: string, token?: string) {
  if (!username) return null
  const headers: Record<string, string> = { 'Accept': 'application/vnd.github+json' }
  if (token) headers['Authorization'] = `token ${token}`

  const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers })
  if (!userRes.ok) return null
  const user = await userRes.json()

  const reposRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100`, { headers })
  const repos = reposRes.ok ? await reposRes.json() : []

  return { user, repos }
}

async function fetchLeetCode(username?: string) {
  if (!username) return null

  const query = `query getUserProfile($username: String!) { matchedUser(username: $username) { username submitStats { acSubmissionNum { difficulty count submissions } } profile { realName ranking userSlug } } }`

  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { username } }),
  })

  if (!res.ok) return null
  const json = await res.json()
  return json.data?.matchedUser ?? null
}

export async function fetchAllProfiles(opts: { githubUsername?: string; githubToken?: string; leetcodeUsername?: string }) {
  const [github, leetcode] = await Promise.all([
    fetchGitHub(opts.githubUsername, opts.githubToken),
    fetchLeetCode(opts.leetcodeUsername),
  ])

  const result = {
    fetchedAt: new Date().toISOString(),
    github,
    leetcode,
  }

  return result
}

export type { GitHubUser, LeetCodeUser }
