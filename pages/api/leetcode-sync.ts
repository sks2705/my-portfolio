import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ ok: false, error: 'Method not allowed' })
      return
    }
    const username =
      (req.body && req.body.username) ||
      (req.query && (req.query.username as string)) ||
      process.env.LEETCODE_USERNAME
    if (!username) {
      res.status(400).json({ ok: false, error: 'Missing username' })
      return
    }

    const query =
      'query userProfile($username: String!) { matchedUser(username: $username) { username profile { ranking reputation } submitStats { acSubmissionNum { difficulty count submissions } } } }'

    const resp = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { username } }),
    })
    if (!resp.ok) {
      res.status(resp.status).json({ ok: false, error: 'Upstream error' })
      return
    }
    const json = await resp.json()
    const matched = json?.data?.matchedUser
    if (!matched) {
      res.status(404).json({ ok: false, error: 'User not found' })
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
    const profileUrl = `https://leetcode.com/${encodeURIComponent(username)}/`

    const dataPath = path.join(process.cwd(), 'data', 'data.json')
    const current = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    const updated = {
      ...current,
      leetcodeStats: {
        ...(current.leetcodeStats || {}),
        profileUrl,
        totalSolved,
        easy,
        medium,
        hard,
        streak: current.leetcodeStats?.streak || 0,
        strongTopics: current.leetcodeStats?.strongTopics || [],
        ranking,
        reputation,
        totalSubmissions,
      },
    }
    fs.writeFileSync(dataPath, JSON.stringify(updated, null, 2))
    res.status(200).json({ ok: true, leetcodeStats: updated.leetcodeStats })
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message || String(err) })
  }
}
