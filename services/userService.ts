import request from '../utils/request'

const endpoint = '/admin/api/user'

// 获取用户列表
export const getUsers = async (query) => {
  try {
    const params = new URLSearchParams(query)
    const resData = await request(`${endpoint}?${params.toString()}`)
    return resData
  } catch (error) {
    console.error('Error during request:', error)
    throw error
  }
}

// 新建用户
export const createUser = async (data) => {
  const method = 'POST'
  try {
    const resData = await request(endpoint, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return resData
    console.log(resData)
  } catch (error) {
    console.error('Error during request:', error)
    throw error
  }
}

// 保存（编辑）用户
export const saveUser = async (data) => {
  const method = 'PUT'
  try {
    const resData = await request(endpoint, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return resData
  } catch (error) {
    console.error('Error during request:', error)
    throw error
  }
}

// 删除用户
export const deleteUser = async (userId) => {
  const method = 'DELETE'
  try {
    const resData = await request(`${endpoint}/${userId}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return resData
  } catch (error) {
    console.error('Error during request:', error)
    throw error
  }
}
