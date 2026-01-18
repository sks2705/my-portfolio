const LEETCODE_USERNAME = 'sks_2705'
export const LEETCODE_PROFILE_URL = 'https://leetcode.com/u/sks_2705/'

type DifficultyStat = {
  difficulty: string
  count: number
}

type LeetCodeResponse = {
  data?: {
    matchedUser: {
      profile: { ranking: number | null }
      submitStats: {
        acSubmissionNum: DifficultyStat[]
      }
    } | null
  }
}

export type LeetCodeStats = {
  totalSolved: number
  easy: number
  medium: number
  hard: number
  ranking: number | null
}

export async function fetchLeetCodeStats(): Promise<LeetCodeStats | null> {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        profile {
          ranking
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `

  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username: LEETCODE_USERNAME },
      }),
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return null
    }

    const json = (await res.json()) as LeetCodeResponse
    const matchedUser = json.data?.matchedUser
    if (!matchedUser) return null

    const stats = matchedUser.submitStats?.acSubmissionNum || []
    const getCount = (difficulty: string) =>
      stats.find((s) => s.difficulty === difficulty)?.count ?? 0

    const totalSolved = getCount('All')
    const easy = getCount('Easy')
    const medium = getCount('Medium')
    const hard = getCount('Hard')
    const ranking = matchedUser.profile?.ranking ?? null

    return {
      totalSolved,
      easy,
      medium,
      hard,
      ranking,
    }
  } catch {
    return null
  }
}


