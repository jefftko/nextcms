import { useState } from 'react'

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(undefined)
    } catch (error) {
      console.log(error)
    }
  }

  const clearStorage = () => {
    try {
      window.localStorage.clear()
      setStoredValue(undefined)
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue, removeItem, clearStorage]
}

export default useLocalStorage
