import fs from 'fs'
import path from 'path'
import sizeOf from 'image-size'
import { type NextRequest, NextResponse } from 'next/server'

const uploadDir = path.join(process.cwd(), 'public')

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp']
const handleLocalFiles = async (type: string, filePath: string) => {
  try {
    const targetDir = path.join(uploadDir, type, filePath)

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    if (type === 'images') {
      //将非图片文件过滤，保留目录
      const files = fs.readdirSync(targetDir).filter((file) => {
        const ext = path.extname(file).toLowerCase()
        //如果文件是图片，给出图片的详细信息，如果是目录，返回目录信息
        if (fs.statSync(path.join(targetDir, file)).isDirectory()) {
          return true
        }
        return imageExtensions.includes(ext)
      })

      return files
    } else {
      return []
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const handlers = {
  GET: async (req, res) => {
    //const { type, source } = req.url.searchParams;
    const type = req.nextUrl.searchParams.get('type')
    const filePath = req.nextUrl.searchParams.get('filePath')
    try {
      let files
      files = await handleLocalFiles(type as string, filePath as string)
      let resData = []
      files.forEach((file) => {
        // if is directory
        if (
          fs.statSync(path.join(uploadDir, type as string, filePath as string, file)).isDirectory()
        ) {
          resData.push({
            title: file,
            source: `/${filePath}/${file}`,
            type: 'directory',
          })
        } else {
          const ext = path.extname(file).toLowerCase()
          const dimensions = sizeOf(path.join(uploadDir, type as string, filePath, file))
          resData.push({
            title: file,
            size: `${(fs.statSync(path.join(uploadDir, type as string, filePath, file)).size / 1024).toFixed(2)} KB`,
            source: `/${type}/${filePath}/${file}`,
            dimensions: `${dimensions.width} x ${dimensions.height}`,
            type: 'image',
          })
        }
      })

      return NextResponse.json(resData)
    } catch (error) {
      console.log(error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  },
}
