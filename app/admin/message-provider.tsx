'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import Toast from '@/components/admin/toast'

// message provider for set toast and notification
interface ToastProps {
  message: string
  type?: 'warning' | 'error' | 'success' | ''
}
interface NotificationProps {
  title: string
  message: string
  type?: 'warning' | 'error' | 'success' | ''
}
interface MessageProps {
  toast: ToastProps
  setToast: (toast: ToastProps) => void
  notification: NotificationProps
  setNotification: (notification: NotificationProps) => void
}

const Message = createContext<MessageProps | undefined>(undefined)

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastProps>({ message: '', type: 'success' })
  const [notification, setNotification] = useState<NotificationProps>({
    title: '',
    message: '',
    type: 'success',
  })
  const [toastOpen, setToastOpen] = useState(false)

  useEffect(() => {
    if (toast.message && toast.message != ' ') {
      setToastOpen(true)
    } else {
      setToastOpen(false)
    }
  }, [toast])

  return (
    <Message.Provider value={{ notification, setNotification, toast, setToast }}>
      {children}
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}

          <Toast type={toast.type || ''} open={toastOpen} setOpen={setToastOpen}>
            {toast.message}
          </Toast>
        </div>
      </div>
    </Message.Provider>
  )
}

export const useMessage = () => {
  const context = useContext(Message)
  if (!context) {
    throw new Error('usePageData must be used within a PageDataProvider')
  }
  return context
}
