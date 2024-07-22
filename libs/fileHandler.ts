import fs from 'fs'
import path from 'path'
import sizeOf from 'image-size'
import { type NextRequest, NextResponse } from 'next/server'

interface Directory {
  title: string
  source: string
  type: 'directory'
}

interface Image {
  title: string
  size: string
  source: string
  dimensions: string
  type: 'image'
}

type FileItem = Directory | Image

type ProcessedFiles = Array<[string, File]>

const uploadDir = path.join(process.cwd(), 'public/uploads')

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp']

export const handleLocalFiles = async (type: string, filePath: string) => {
  try {
    const targetDir = path.join(uploadDir, type, filePath)
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    if (!fs.existsSync(targetDir)) {
      //fs.mkdirSync(targetDir, { recursive: true })
      return []
    }

    const resData: FileItem[] = []

    if (type === 'images') {
      fs.readdirSync(targetDir).forEach((file) => {
        // if is directory
        const ext = path.extname(file).toLowerCase()
        if (fs.statSync(path.join(uploadDir, type, filePath, file)).isDirectory()) {
          resData.push({
            title: file,
            source: `/${filePath}/${file}`,
            type: 'directory',
          })
        } else if (imageExtensions.includes(ext)) {
          const ext = path.extname(file).toLowerCase()
          const dimensions = sizeOf(path.join(uploadDir, type, filePath, file))
          resData.push({
            title: file,
            size: `${(fs.statSync(path.join(uploadDir, type, filePath, file)).size / 1024).toFixed(2)} KB`,
            source: `/uploads/${type}/${filePath}/${file}`,
            dimensions: `${dimensions.width} x ${dimensions.height}`,
            type: 'image',
          })
        }
      })
      return resData
    } else {
      return []
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

const createFolder = (data) => {
  const { directory_name, file_path, type } = data

  console.log(file_path)
  try {
    const targetDir = path.join(
      uploadDir,
      type as string,
      file_path as string,
      directory_name as string
    )
    if (fs.existsSync(targetDir)) {
      return { status: 'error', message: 'Directory already exists' }
    }
    fs.mkdirSync(targetDir, { recursive: true })
    return { status: 'success', message: 'Directory created successfully' }
  } catch (err) {
    return { status: 'error', message: err.message }
  }
}

export const handlers = {
  GET: async (req, res) => {
    //const { type, source } = req.url.searchParams;
    const type = req.nextUrl.searchParams.get('type')
    const filePath = req.nextUrl.searchParams.get('filePath')
    try {
      const files = await handleLocalFiles(type as string, filePath as string)
      return NextResponse.json(files)
    } catch (error) {
      console.log(error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  },
  POST: async (req: NextRequest) => {
    //const { type, action, filePath } = await req.json()
    const action = req.nextUrl.searchParams.get('action')

    if (action === 'create_folder') {
      const { ...data } = await req.json()
      const res = createFolder(data)
      return NextResponse.json(res)
    }

    /* if (action === 'deleteDir') {
      try {
        const targetDir = path.join(uploadDir, type as string, filePath as string)
        if (!fs.existsSync(targetDir)) {
          return NextResponse.json(
            { status: 'error', error: 'Directory does not exist' },
            { status: 400 }
          )
        }
        const files = fs.readdirSync(targetDir)
        if (files.length > 0) {
          return NextResponse.json({ error: 'Directory is not empty' }, { status: 400 })
        }
        fs.rmdirSync(targetDir)
        return NextResponse.json({ message: 'Directory deleted successfully' })
      } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
      }
      } */

    if (action === 'upload_image') {
      const formData = await req.formData()
      const file = formData.get('file') as File
      const type = formData.get('type') as string
      const filePath = formData.get('file_path') as string

      console.log('form data', formData, file)

      if (!file || !type) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
      }

      // 创建目标目录
      const targetDir = path.join(uploadDir, type, filePath)
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true })
      }

      // 读取文件内容并保存到目标目录
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const targetFilePath = path.join(targetDir, file.name)
      fs.writeFileSync(targetFilePath, buffer)

      return NextResponse.json({
        status: 'success',
        message: 'File uploaded successfully',
        data: { source: `/uploads/${type}/${filePath}/${file.name}` },
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  },
  DELETE: async (req: NextRequest) => {
    const type = req.nextUrl.searchParams.get('type')
    const filePath = req.nextUrl.searchParams.get('filePath')
    const fileName = req.nextUrl.searchParams.get('fileName')

    try {
      const targetFile = path.join(
        uploadDir,
        type as string,
        filePath as string,
        fileName as string
      )
      if (!fs.existsSync(targetFile)) {
        return NextResponse.json({ error: 'File does not exist' }, { status: 400 })
      }
      fs.unlinkSync(targetFile)
      return NextResponse.json({ message: 'File deleted successfully' })
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
  },
}
