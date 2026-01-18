import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'data.json')
    const raw = fs.readFileSync(dataPath, 'utf-8')
    const json = JSON.parse(raw)
    const stats = json.leetcodeStats || {}
    res.status(200).json({ ok: true, leetcodeStats: stats })
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message || String(err) })
  }
}
