import request from '../utils/request'

const endpoint = '/admin/api/files'

export const getFiles = async (query) => {
  try {
    const params = new URLSearchParams(query)
    const resData = await request(`${endpoint}?${params.toString()}`)
    return resData
  } catch (error) {
    console.error('Error during request:', error)
    throw error
  }
}

export const createFolder = async (data) => {
  const method = 'POST'

  const body = JSON.stringify({ ...data, action: 'create_folder' })
  try {
    const resData = await request(endpoint, {
      method,
      body,
    })
    return resData
  } catch (error) {
    console.error('Error during request:', error)
    throw error
  }
}
