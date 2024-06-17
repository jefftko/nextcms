'use client'

import { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import Link from 'next/link'

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return
      setMobileNavOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return
      setMobileNavOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <div className="flex md:hidden">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${mobileNavOpen && 'active'}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="h-6 w-6 fill-current text-gray-900"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" />
          <rect y="11" width="24" height="2" />
          <rect y="18" width="24" height="2" />
        </svg>
      </button>

      {/*Mobile navigation */}
      <div ref={mobileNav}>
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="absolute left-0 top-full z-20 h-screen w-full overflow-scroll bg-white pb-16"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul className="px-5 py-2">
            <li>
              <Link
                href="/pricing"
                className="flex py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setMobileNavOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="flex py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setMobileNavOpen(false)}
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href="/tutorials"
                className="flex py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setMobileNavOpen(false)}
              >
                Tutorials
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="flex py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setMobileNavOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li className="my-2 border-b border-t border-gray-200 py-2">
              {/* eslint-disable jsx-a11y/no-static-element-interactions */}
              {/* eslint-disable jsx-a11y/click-events-have-key-events */}
              <span
                className="flex py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setMobileNavOpen(false)}
              >
                Resources
              </span>
              <ul className="pl-4">
                <li>
                  <Link
                    href="/documentation"
                    className="flex py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="flex py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Support center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/404"
                    className="flex py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    404
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="/signin"
                className="flex w-full justify-center py-2 font-medium text-gray-600 hover:text-gray-900"
                onClick={() => setMobileNavOpen(false)}
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="btn-sm my-2 w-full bg-gray-900 text-gray-200 hover:bg-gray-800"
                onClick={() => setMobileNavOpen(false)}
              >
                <span>Sign up</span>
                <svg
                  className="-mr-1 ml-2 h-3 w-3 shrink-0 fill-current text-gray-400"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                    fill="#999"
                    fillRule="nonzero"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </Transition>
      </div>
    </div>
  )
}
