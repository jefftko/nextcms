'use client'

import { useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'

interface DropdownFullProps {
  options: { key: string; value: string }[]
  value: string
  setValue: (value: string) => void
}

export default function DropdownFull({ options, value, setValue }: DropdownFullProps) {
  const [selected, setSelected] = useState<number>(0)

  useEffect(() => {
    if (value) {
      const selectedOption = options.find((option) => option.value === value)
      if (selectedOption) {
        //get the index of the selected option
        setSelected(options.indexOf(selectedOption))
      }
    }
  }, [value, options])

  return (
    <Menu as="div" className="relative inline-flex w-full">
      {({ open }) => (
        <>
          <Menu.Button
            className="btn w-full min-w-[11rem] justify-between border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-slate-200"
            aria-label="Select option"
          >
            <span className="flex items-center">
              <span>{options[selected].value}</span>
            </span>
            <svg
              className="ml-1 shrink-0 fill-current text-slate-400"
              width="11"
              height="7"
              viewBox="0 0 11 7"
            >
              <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
            </svg>
          </Menu.Button>
          <Transition
            className="absolute left-0 top-full z-10 mt-1 w-full overflow-hidden rounded border border-slate-200 bg-white py-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800"
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Menu.Items className="divide-y divide-slate-200 text-sm font-medium text-slate-600 focus:outline-none dark:divide-slate-700 dark:text-slate-300">
              {options.map((option, optionIndex) => (
                <Menu.Item key={optionIndex}>
                  {({ active }) => (
                    <button
                      className={`flex w-full cursor-pointer items-center justify-between px-3 py-2 ${active ? 'bg-slate-50 dark:bg-slate-700/20' : ''} ${optionIndex === selected && 'text-indigo-500'}`}
                      onClick={() => {
                        setValue(option!.key)
                        setSelected(optionIndex)
                      }}
                    >
                      <span>{option.value}</span>
                      <svg
                        className={`mr-2 shrink-0 fill-current text-indigo-500 ${optionIndex !== selected && 'invisible'}`}
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                      >
                        <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                      </svg>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
