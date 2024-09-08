import request from '../utils/request'

const endpoint = '/admin/api/content'

export const editContent = async (data) => {
  const method = 'PUT'
  const body = JSON.stringify({
    ...data,
    lastmod: new Date().toISOString(),
    date: data?.date ?? new Date().toISOString(),
  })

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

export const createContent = async (data) => {
  const method = 'POST'
  const body = JSON.stringify({
    ...data,
    lastmod: new Date().toISOString(),
    date: data?.date ?? new Date().toISOString(),
  })

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

export const deleteContent = async (slug: string) => {
  const method = 'DELETE'
  const body = JSON.stringify({ slug })

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
