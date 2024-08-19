import fs from 'fs'
import path from 'path'
import bcrypt from 'bcrypt'

// 定义用户类型
interface User {
  id: string
  name: string
  email: string
  username: string
  status: string
  role: string
  password: string
}

// 获取 users.json 文件路径
const usersFilePath = path.join(process.cwd(), 'data/users/index.json')

// 读取用户数据
const readUsers = (): User[] => {
  const fileContents = fs.readFileSync(usersFilePath, 'utf8')
  return JSON.parse(fileContents) as User[]
}

// 写入用户数据
const writeUsers = (users: User[]) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8')
}

// 生成唯一 ID
const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

// 创建用户
export const createUser = async (
  userData: Omit<User, 'id' | 'password'> & { password: string }
) => {
  const users = readUsers()

  // 检查用户名是否存在
  if (users.some((user) => user.username === userData.username)) {
    return { status: 'error', message: 'Username already exists.' }
  }

  // 生成新的用户 ID 和加密密码
  const newUser: User = {
    ...userData,
    id: generateId(),
    password: await bcrypt.hash(userData.password, 10), // 加密密码
  }

  users.push(newUser)
  writeUsers(users)

  return { status: 'success', message: 'User created successfully.', user: newUser }
}

// 编辑用户
export const editUser = async (userData: Partial<User> & { id: string }) => {
  const users = readUsers()
  const userIndex = users.findIndex((user) => user.id === userData.id)

  if (userIndex === -1) {
    return { status: 'error', message: 'User not found.' }
  }

  // 检查新用户名是否已存在且不是当前用户
  if (
    userData.username &&
    users.some((user) => user.username === userData.username && user.id !== userData.id)
  ) {
    return { status: 'error', message: 'Username already exists.' }
  }

  // 更新用户数据，保留旧密码或加密新密码
  users[userIndex] = {
    ...users[userIndex],
    ...userData,
    password: userData.password
      ? await bcrypt.hash(userData.password, 10)
      : users[userIndex].password,
  }

  writeUsers(users)

  return { status: 'success', message: 'User updated successfully.', user: users[userIndex] }
}

// 删除用户
export const deleteUser = (userId: string) => {
  const users = readUsers()
  const user = users.find((user) => user.id === userId)

  if (!user) {
    return { status: 'error', message: 'User not found.' }
  }

  if (user.role === 'superadmin') {
    return { status: 'error', message: 'Superadmin users cannot be deleted.' }
  }

  const updatedUsers = users.filter((user) => user.id !== userId)
  writeUsers(updatedUsers)

  return { status: 'success', message: 'User deleted successfully.' }
}
