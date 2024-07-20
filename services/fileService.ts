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
    const resData = await request(`${endpoint}?action=create_folder`, {
      method,
      body,
    })
    return resData
  } catch (error) {
    console.error('Error during request:', error)
    throw error
  }
}

//upload File
export const uploadFile = async (file, additionalData = {}) => {
  const formData = new FormData()
  formData.append('file', file)

  // 如果有额外的数据，也附加到 FormData 中
  Object.keys(additionalData).forEach((key) => {
    formData.append(key, additionalData[key])
  })

  try {
    const response = await fetch(`${endpoint}?action=upload_image`, {
      method: 'POST',
      body: formData,
    })

    const resData = await response.json()

    if (!response.ok) {
      throw new Error(resData.message || 'Error uploading file')
    }

    return resData
  } catch (error) {
    console.error('Error during request:', error)
    throw error
  }
}
