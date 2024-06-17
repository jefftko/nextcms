import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Icon, IconComponents } from '@/components/icons'
import { useAppProvider } from '@/app/admin/app-provider'
import { useSession, signOut } from 'next-auth/react'

interface UserMenuProps {
  sidebarExpanded: boolean
  setSidebarExpanded: (value: boolean) => void
}

function MyDropdown({ sidebarExpanded, setSidebarExpanded }: UserMenuProps) {
  const { data: session } = useSession()
  //console.log(session)

  const handleMenuClick = () => {
    if (!sidebarExpanded) {
      setSidebarExpanded(true) // 如果侧边栏是关闭的，打开它
      return
    }
  }

  return (
    <div className="relative w-full">
      <Menu as="div" className={`inline-block text-left`}>
        <Menu.Button as={Fragment}>
          <button className="flex grow items-center" onClick={handleMenuClick}>
            <Icon kind="user" size={8} className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-50" />
            <span className="sr-only">Your profile</span>
            <span
              aria-hidden="true"
              className={`ml-3 text-sm font-medium text-slate-200 duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100`}
            >
              {session?.user?.name}
            </span>
          </button>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute bottom-12 mt-2 w-full origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default MyDropdown
