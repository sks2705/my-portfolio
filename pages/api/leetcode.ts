import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dataPath = path.join(process.cwd(), 'data', 'data.json')
  let current: any = {}

  try {
    const raw = fs.readFileSync(dataPath, 'utf-8')
    current = JSON.parse(raw)
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message || String(err) })
    return
  }

  let username: string | undefined = process.env.LEETCODE_USERNAME as string | undefined

  if (!username) {
    const lcUrl = current.personalInfo?.leetcode as string | undefined
    if (lcUrl) {
      const match = lcUrl.match(/leetcode\.com\/(?:u\/)?([^/]+)/)
      if (match && match[1]) {
        username = match[1]
      }
    }
  }

  if (!username && req.query && req.query.username) {
    username = String(req.query.username)
  }

  if (!username) {
    res.status(200).json({ ok: true, leetcodeStats: current.leetcodeStats || {} })
    return
  }

  try {
    const query =
      'query userProfile($username: String!) { matchedUser(username: $username) { username profile { ranking reputation } submitStats { acSubmissionNum { difficulty count submissions } } } }'

    const resp = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { username } }),
    })

    if (!resp.ok) {
      res.status(resp.status).json({ ok: false, error: 'Upstream error', leetcodeStats: current.leetcodeStats || {} })
      return
    }

    const json = await resp.json()
    const matched = json?.data?.matchedUser
    if (!matched) {
      res.status(404).json({ ok: false, error: 'User not found', leetcodeStats: current.leetcodeStats || {} })
      return
    }

    const statsArr: Array<{ difficulty: string; count: number; submissions?: number }> =
      matched.submitStats?.acSubmissionNum || []
    const byDiff = Object.fromEntries(
      statsArr.map((s) => [s.difficulty, { count: Number(s.count || 0), submissions: Number(s.submissions || 0) }]),
    )
    const easy = byDiff.Easy?.count || 0
    const medium = byDiff.Medium?.count || 0
    const hard = byDiff.Hard?.count || 0
    const totalSolved = easy + medium + hard
    const totalSubmissions =
      (byDiff.Easy?.submissions || 0) + (byDiff.Medium?.submissions || 0) + (byDiff.Hard?.submissions || 0)

    const ranking = Number(matched.profile?.ranking || 0)
    const reputation = Number(matched.profile?.reputation || 0)
    const profileUrl =
      current.personalInfo?.leetcode || `https://leetcode.com/${encodeURIComponent(username)}/`

    const baseStats = current.leetcodeStats || {}
    const updatedStats = {
      ...baseStats,
      profileUrl,
      totalSolved,
      easy,
      medium,
      hard,
      streak: baseStats.streak || 0,
      strongTopics: baseStats.strongTopics || [],
      ranking,
      reputation,
      totalSubmissions,
    }

    try {
      const updated = { ...current, leetcodeStats: updatedStats }
      fs.writeFileSync(dataPath, JSON.stringify(updated, null, 2))
    } catch {
    }

    res.status(200).json({ ok: true, leetcodeStats: updatedStats })
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message || String(err), leetcodeStats: current.leetcodeStats || {} })
  }
}
