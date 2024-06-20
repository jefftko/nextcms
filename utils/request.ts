// request.js
async function request(url, options = {}) {
  // 设置默认的请求选项，比如 headers
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${localStorage.getItem('token')}`, // 示例：如何处理令牌
    },
  }

  // 合并传入的选项和默认选项
  const finalOptions = { ...defaultOptions, ...options }

  // 处理请求，添加错误处理和其他逻辑
  try {
    const response = await fetch(url, finalOptions)
    const data = await response.json()

    // 检查响应内容类型
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text() // 获取响应文本
      throw new Error(`Expected JSON response but got: ${text}`)
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    if (response.ok) {
      return data
    } else {
      //throw new Error(data.message || "Something went wrong");
      return { status: 'error', message: data.message || 'Something went wrong' }
    }
  } catch (error) {
    // 这里可以添加错误日志或错误上报的代码
    console.error('Request failed:', error)
    //throw error;
    return { status: 'error', message: error.message || 'Something went wrong' }
  }
}

export default request
