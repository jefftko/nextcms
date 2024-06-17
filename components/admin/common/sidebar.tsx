'use client'

import { useEffect, useRef, useState } from 'react'
import { useAppProvider } from '@/app/admin/app-provider'
import { useSelectedLayoutSegments } from 'next/navigation'
import { Transition, Popover } from '@headlessui/react'
import SidebarLinkGroup from './sidebar-link-group'
import SidebarLink from './sidebar-link'
import Logo from './logo'
import { getBreakpoint } from '../../utils/utils'
import { Icon, IconComponents } from '@/components/icons'
import { usePathname } from 'next/navigation'
import UserMenu from './user-menu'

interface Config {
  nav: {
    href: string
    label: string
    icon: string
    children?: {
      href: string
      label: string
    }[]
  }[]
}

export default function Sidebar() {
  const sidebar = useRef<HTMLDivElement>(null)
  const { sidebarOpen, setSidebarOpen, adminData } = useAppProvider()
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false)
  const segments = useSelectedLayoutSegments()
  const [breakpoint, setBreakpoint] = useState<string | undefined>(getBreakpoint())
  const expandOnly = !sidebarExpanded && (breakpoint === 'lg' || breakpoint === 'xl')
  const pathname = usePathname()
  //当子的菜单激活时，父菜单的图标为展开状态
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    adminData.nav.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          if (child.href === pathname) {
            setActive(item.href)
          }
        })
      } else {
        if (item.href === pathname) {
          setActive(item.href)
        }
      }
    })
  }, [])
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!sidebar.current) return
      if (!sidebarOpen || sidebar.current.contains(target as Node)) return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  }, [sidebarOpen])

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [sidebarOpen])

  const handleBreakpoint = () => {
    setBreakpoint(getBreakpoint())
  }
  useEffect(() => {
    window.addEventListener('resize', handleBreakpoint)
    return () => {
      window.removeEventListener('resize', handleBreakpoint)
    }
  }, [breakpoint])

  return (
    <div className={`min-w-fit ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
      {/* Sidebar backdrop (mobile only) */}
      <Transition
        className="fixed inset-0 z-40 bg-slate-900 bg-opacity-30 lg:z-auto lg:hidden"
        show={sidebarOpen}
        enter="transition-opacity ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-out duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        aria-hidden="true"
      />

      {/* Sidebar */}
      <Transition
        show={sidebarOpen}
        unmount={false}
        as="div"
        id="sidebar"
        ref={sidebar}
        className="no-scrollbar absolute left-0 top-0 z-40 flex h-[100dvh] w-64 shrink-0 flex-col overflow-y-scroll bg-slate-800 p-4 transition-all duration-200 ease-in-out lg:static lg:left-auto lg:top-auto lg:!flex lg:w-20 lg:translate-x-0 lg:overflow-y-auto lg:sidebar-expanded:!w-64 2xl:!w-64"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {/* Sidebar header */}
        <div className="mb-10 flex justify-between pr-3 sm:px-2">
          {/* Close button */}
          <button
            className="text-slate-500 hover:text-slate-400 lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <Icon kind="arrowLeft" size={6} />
          </button>
          {/* Logo */}
          <Logo color="#ffffff" />
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="pl-3 text-xs font-semibold uppercase text-slate-500">
              <span
                className="hidden w-6 text-center lg:block lg:sidebar-expanded:hidden 2xl:hidden"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Next CMS</span>
            </h3>
            <ul className="mt-3">
              {/* if has children use group */}
              {adminData?.nav.map((item, index) => {
                if (item.children) {
                  return (
                    <SidebarLinkGroup key={index} open={segments?.includes(item.href)}>
                      {(handleClick, open) => {
                        return (
                          <>
                            <a
                              href="#0"
                              className={`block truncate text-slate-200 transition duration-150 ${
                                active && active === item.href
                                  ? 'hover:text-slate-200'
                                  : 'hover:text-white'
                              }`}
                              onClick={(e) => {
                                e.preventDefault()
                                expandOnly ? setSidebarExpanded(true) : handleClick()
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  {/* include path last segment */}
                                  <Icon
                                    kind={item.icon as keyof typeof IconComponents}
                                    size={6}
                                    className={`${active && active === item.href ? 'text-indigo-500' : 'text-slate-400'}`}
                                  />
                                  <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                    {item.label}
                                  </span>
                                </div>
                                {/* Icon */}
                                <div className="ml-2 flex shrink-0">
                                  <svg
                                    className={`ml-1 h-3 w-3 shrink-0 fill-current text-slate-400 ${open && 'rotate-180'}`}
                                    viewBox="0 0 12 12"
                                  >
                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                  </svg>
                                </div>
                              </div>
                            </a>
                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                              <ul className={`mt-1 pl-9 ${!open && 'hidden'}`}>
                                {item &&
                                  item.children &&
                                  item.children.map((child) => (
                                    <li className="mb-1 last:mb-0" key={child.href}>
                                      <SidebarLink href={child.href}>
                                        <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                          {child.label}
                                        </span>
                                      </SidebarLink>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </>
                        )
                      }}
                    </SidebarLinkGroup>
                  )
                } else {
                  return (
                    <li
                      className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${pathname === item.href && 'bg-slate-900'}`}
                      key={item.href}
                    >
                      <SidebarLink href={item.href}>
                        <div className="flex items-center justify-between">
                          <div className="flex grow items-center">
                            <Icon
                              kind={item.icon as keyof typeof IconComponents}
                              size={6}
                              className={`${pathname === item.href ? 'text-indigo-500' : 'text-slate-400'}`}
                            />
                            <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                              {item.label}
                            </span>
                          </div>
                        </div>
                      </SidebarLink>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        {/*<div className="mt-auto hidden justify-end pt-3 lg:inline-flex 2xl:hidden">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="h-6 w-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>*/}

        {/* user profile */}
        <div className="mt-auto inline-flex justify-start pt-3">
          <div className="mb-0 w-full rounded-sm px-3 px-3 py-2 py-2">
            {/* <button
                    className="flex grow items-center"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true" className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 text-slate-200">Tom Cook</span>
                  </button>*/}

            <UserMenu sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
          </div>
        </div>
      </Transition>
    </div>
  )
}
