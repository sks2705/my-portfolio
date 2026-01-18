// Usage: node scripts/generate-data.js <githubUsername> <leetcodeUsername>
// OR set env vars GITHUB_USERNAME and LEETCODE_USERNAME
const fs = require('fs')
const path = require('path')

async function fetchGitHub(username, token) {
  if (!username) return null
  const headers = { Accept: 'application/vnd.github+json' }
  if (token) headers['Authorization'] = `token ${token}`

  const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers })
  if (!userRes.ok) return null
  const user = await userRes.json()
  const reposRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100`, { headers })
  const repos = reposRes.ok ? await reposRes.json() : []
  return { user, repos }
}

async function fetchLeetCode(username) {
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

async function main() {
  const githubUsername = process.argv[2] || process.env.GITHUB_USERNAME
  const leetcodeUsername = process.argv[3] || process.env.LEETCODE_USERNAME
  const githubToken = process.env.GITHUB_TOKEN

  const [github, leetcode] = await Promise.all([
    fetchGitHub(githubUsername, githubToken),
    fetchLeetCode(leetcodeUsername),
  ])

  const out = {
    fetchedAt: new Date().toISOString(),
    github,
    leetcode,
  }

  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)
  fs.writeFileSync(path.join(dataDir, 'data.json'), JSON.stringify(out, null, 2))
  console.log('Wrote data/data.json')
}

main().catch(err => { console.error(err); process.exit(1) })
