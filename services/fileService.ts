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
