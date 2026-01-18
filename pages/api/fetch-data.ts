import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAllProfiles } from '../../lib/fetchProfiles'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const githubUsername = process.env.GITHUB_USERNAME || (req.query.github as string) || undefined
    const githubToken = process.env.GITHUB_TOKEN || undefined
    const leetcodeUsername = process.env.LEETCODE_USERNAME || (req.query.leetcode as string) || undefined

    const data = await fetchAllProfiles({ githubUsername, githubToken, leetcodeUsername })

    // ensure data directory
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)

    const outPath = path.join(dataDir, 'data.json')
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2))

    res.status(200).json({ ok: true, writtenTo: '/data/data.json', data })
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message || String(err) })
  }
}
