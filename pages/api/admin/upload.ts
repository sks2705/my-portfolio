import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type UploadType = 'profileImage' | 'heroImage' | 'resume' | 'cv' | 'certification'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const host = req.headers.host || ''
  const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1')
  if (!isLocal) {
    res.status(403).json({ ok: false, error: 'Admin upload API is only available on localhost' })
    return
  }
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  try {
    const body = req.body as { type?: UploadType; fileName?: string; content?: string }
    const type = body.type
    const fileName = body.fileName || ''
    const content = body.content || ''

    if (!type || !fileName || !content) {
      res.status(400).json({ ok: false, error: 'Missing type, fileName or content' })
      return
    }

    let base64 = content
    const commaIndex = base64.indexOf(',')
    if (commaIndex !== -1) {
      base64 = base64.slice(commaIndex + 1)
    }

    const buffer = Buffer.from(base64, 'base64')

    const safeName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_')
    let dir = ''
    if (type === 'profileImage' || type === 'heroImage' || type === 'certification') {
      dir = path.join(process.cwd(), 'public', 'images')
    } else {
      dir = path.join(process.cwd(), 'public', 'data_files')
    }
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const stamp = Date.now()
    const outFile = `${type}-${stamp}-${safeName}`
    const fullPath = path.join(dir, outFile)
    fs.writeFileSync(fullPath, buffer)

    let publicPath = ''
    if (type === 'profileImage' || type === 'heroImage' || type === 'certification') {
      publicPath = `/images/${outFile}`
    } else {
      publicPath = `/data_files/${outFile}`
    }

    if (type === 'certification') {
      res.status(200).json({
        ok: true,
        path: publicPath,
      })
      return
    }

    const dataPath = path.join(process.cwd(), 'data', 'data.json')
    const raw = fs.readFileSync(dataPath, 'utf-8')
    const json = JSON.parse(raw)
    const personal = json.personalInfo || {}

    if (type === 'profileImage') {
      personal.profileImage = publicPath
    } else if (type === 'heroImage') {
      personal.heroImage = publicPath
    } else if (type === 'resume') {
      personal.resumeLink = publicPath
    } else if (type === 'cv') {
      personal.cvLink = publicPath
    }

    const updated = { ...json, personalInfo: personal }
    fs.writeFileSync(dataPath, JSON.stringify(updated, null, 2))

    res.status(200).json({
      ok: true,
      personalInfo: updated.personalInfo,
      path: publicPath,
    })
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message || String(err) })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
