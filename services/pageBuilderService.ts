import request from '../utils/request'

const endpoint = '/admin/api/page'

export const editPage = async (data) => {
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

export const createPage = async (data) => {
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
