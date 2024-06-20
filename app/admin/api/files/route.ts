import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import formidable from 'formidable'

const uploadDir = path.join(process.cwd(), 'public', 'uploads')

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const subDir = searchParams.get('dir') || ''
  const targetDir = path.join(uploadDir, subDir)

  if (!fs.existsSync(targetDir)) {
    return new Response(JSON.stringify({ error: 'Directory does not exist' }), { status: 404 })
  }

  const files = fs.readdirSync(targetDir).map((file) => {
    const filePath = path.join(targetDir, file)
    const stats = fs.statSync(filePath)
    return {
      name: file,
      isDirectory: stats.isDirectory(),
      size: stats.size,
      lastModified: stats.mtime,
    }
  })

  return new Response(JSON.stringify({ success: true, files }), { status: 200 })
}

/*export const config = {
  api: {
    bodyParser: false,
  },
};*/

export async function POST(req: NextRequest) {
  const form = new formidable.IncomingForm()
  form.uploadDir = uploadDir
  form.keepExtensions = true

  try {
    const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err)
        resolve({ fields, files })
      })
    })

    const subDir = fields.subDir ? fields.subDir : ''
    const targetDir = path.join(uploadDir, subDir)

    try {
      await fs.mkdir(targetDir, { recursive: true })
    } catch (err) {
      if (err.code !== 'EEXIST') throw err
    }

    const oldPath = files.file.filepath
    const newPath = path.join(targetDir, files.file.newFilename)

    await fs.rename(oldPath, newPath)

    return NextResponse.json({ success: true, file: { name: files.file.newFilename } })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const subDir = searchParams.get('dir') || ''
  const dirName = searchParams.get('name')

  if (!dirName) {
    return new Response(JSON.stringify({ error: 'Directory name is required' }), { status: 400 })
  }

  const targetDir = path.join(uploadDir, subDir, dirName)

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } else {
    return new Response(JSON.stringify({ error: 'Directory already exists' }), { status: 400 })
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const subDir = searchParams.get('dir') || ''
  const fileName = searchParams.get('name')

  if (!fileName) {
    return new Response(JSON.stringify({ error: 'File or directory name is required' }), {
      status: 400,
    })
  }

  const targetPath = path.join(uploadDir, subDir, fileName)

  if (fs.existsSync(targetPath)) {
    const stats = fs.statSync(targetPath)
    if (stats.isDirectory()) {
      const files = fs.readdirSync(targetPath)
      if (files.length > 0) {
        return new Response(JSON.stringify({ error: 'Directory is not empty' }), { status: 400 })
      }
      fs.rmdirSync(targetPath)
    } else {
      fs.unlinkSync(targetPath)
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } else {
    return new Response(JSON.stringify({ error: 'File or directory does not exist' }), {
      status: 404,
    })
  }
}
