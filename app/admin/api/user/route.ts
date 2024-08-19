import { type NextRequest, NextResponse } from 'next/server'
import { createUser, editUser, deleteUser } from '@/utils/userActions' // 假设你有这些功能的实现
import fs from 'fs'
import path from 'path'

// 获取 users.json 文件路径
const usersFilePath = path.join(process.cwd(), 'data/users/index.json')

// 读取用户数据
const readUsers = () => {
  const fileContents = fs.readFileSync(usersFilePath, 'utf8')
  return JSON.parse(fileContents)
}

// 检查用户名是否存在的辅助函数
const checkUsernameExists = (username: string, users: any[]) => {
  return users.some((user) => user.username === username)
}

// POST: 添加新用户
export async function POST(req: NextRequest) {
  const data = await req.json()
  const users = readUsers()

  // 1. 检查用户名是否存在
  if (checkUsernameExists(data.username, users)) {
    return NextResponse.json({ status: 'error', message: 'Username already exists.' })
  }

  // 2. 仅允许创建 role 为 admin 的用户
  if (data.role !== 'admin') {
    return NextResponse.json({
      status: 'error',
      message: 'Only users with role admin can be created.',
    })
  }

  try {
    const res = await createUser(data) // 调用 createUser 函数创建用户
    return NextResponse.json(res, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: 'error', message: 'Error creating user.' }, { status: 500 })
  }
}

// PUT: 编辑用户
export async function PUT(req: NextRequest) {
  const data = await req.json()
  const users = readUsers()

  // 1. 检查新用户名是否与其他用户重复
  if (
    checkUsernameExists(
      data.username,
      users.filter((user) => user.id !== data.id)
    )
  ) {
    return NextResponse.json(
      { status: 'error', message: 'Username already exists.' },
      { status: 400 }
    )
  }

  try {
    const res = await editUser(data) // 调用 editUser 函数编辑用户
    return NextResponse.json(res, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: 'error', message: 'Error editing user.' }, { status: 500 })
  }
}

// DELETE: 删除用户
export async function DELETE(req: NextRequest) {
  const data = await req.json()
  const users = readUsers()
  const userToDelete = users.find((user) => user.id === data.id)

  // 1. 防止删除自己
  if (userToDelete.username === data.currentUsername) {
    return NextResponse.json(
      { status: 'error', message: 'You cannot delete yourself.' },
      { status: 400 }
    )
  }

  // 2. 防止删除 role 为 superadmin 的用户
  if (userToDelete.role === 'superadmin') {
    return NextResponse.json(
      { status: 'error', message: 'Superadmin users cannot be deleted.' },
      { status: 400 }
    )
  }

  try {
    const res = await deleteUser(data.id) // 调用 deleteUser 函数删除用户
    return NextResponse.json(res, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: 'error', message: 'Error deleting user.' }, { status: 500 })
  }
}
