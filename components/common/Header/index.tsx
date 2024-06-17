'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import Logo from '@/components/common/Logo'
import Dropdown from '@/components/utils/dropdown'
import MobileMenu from './MobileMenu'
import type { HeaderType } from './data.d'
import OverlayWrapper from '@/components/wrappers/OverlayWrapper'

export default function Header({ data }: { data: HeaderType }) {
  const [top, setTop] = useState<boolean>(true)

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true)
  }

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [top])

  return (
    <header
      className={`fixed z-30 w-full transition duration-300 ease-in-out md:bg-opacity-90 ${!top ? 'bg-white shadow-lg backdrop-blur-sm' : ''}`}
    >
      <OverlayWrapper id="header">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Site branding */}
            <div className="mr-4 shrink-0">
              <Logo />
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex md:grow">
              {/* Desktop menu links */}
              <ul className="flex grow flex-wrap items-center justify-end">
                {data?.nav.map((item, i) =>
                  item.children ? (
                    <Dropdown title={item.label} key={`menu-top-${i}`}>
                      {/* 2nd level: hover */}
                      {item.children.map((child, idx) => (
                        <li key={`menu-second-${i}-${idx}`}>
                          <Link
                            href={child.href}
                            className="flex px-5 py-2 text-sm font-medium leading-tight text-gray-600 hover:text-gray-900"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </Dropdown>
                  ) : (
                    <Link
                      key={`menu-top-${i}`}
                      href={item.href}
                      className="flex px-5 py-2 text-sm font-medium leading-tight text-gray-600 hover:text-gray-900"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </ul>

              {/* Desktop sign in links */}
              <ul className="flex grow flex-wrap items-center justify-end">
                <li key="sign-in">
                  <Link
                    href="/signin"
                    className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                  >
                    Sign in
                  </Link>
                </li>
                <li key="sign-up">
                  <Link
                    href="/signup"
                    className="btn-sm ml-3 bg-gray-900 text-gray-200 hover:bg-gray-800"
                  >
                    <span>Sign up</span>
                    <svg
                      className="-mr-1 ml-2 h-3 w-3 shrink-0 fill-current text-gray-400"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </nav>

            <MobileMenu />
          </div>
        </div>
      </OverlayWrapper>
    </header>
  )
}
