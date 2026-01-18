import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const host = req.headers.host || ''
  const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1')
  if (!isLocal) {
    res.status(403).json({ ok: false, error: 'Admin API is only available on localhost' })
    return
  }
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }
  try {
    const body = req.body || {}
    const key = body.key as string
    const value = body.value
    if (!key) {
      res.status(400).json({ ok: false, error: 'Missing key' })
      return
    }
    const dataPath = path.join(process.cwd(), 'data', 'data.json')
    const raw = fs.readFileSync(dataPath, 'utf-8')
    const json = JSON.parse(raw)
    const updated = { ...json, [key]: value }
    fs.writeFileSync(dataPath, JSON.stringify(updated, null, 2))
    res.status(200).json({ ok: true, data: updated })
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message || String(err) })
  }
}

