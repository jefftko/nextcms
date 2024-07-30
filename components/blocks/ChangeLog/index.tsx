// Team.tsx

import Image from 'next/image'
import { ChangeLogType } from './data.d'
import Markdown from 'react-markdown'
import { formatDate } from 'pliny/utils/formatDate'

export default function ChangeLog({ data }: { data: ChangeLogType }) {
  return (
    <section className="relative bg-slate-900 opacity-90">
      {/* Radial gradient */}
      <div
        className="aspect-square pointer-events-none absolute left-1/2 top-0 -z-10 flex w-[800px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        aria-hidden="true"
      >
        <div className="translate-z-0 absolute inset-0 rounded-full bg-purple-500 opacity-30 blur-[120px]"></div>
        <div className="translate-z-0 absolute h-64 w-64 rounded-full bg-purple-400 opacity-70 blur-[80px]"></div>
      </div>

      {/* Particles animation */}
      <div className="absolute inset-0 -z-10 h-96" aria-hidden="true">
        <canvas data-particle-animation data-particle-quantity="15"></canvas>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          <div className="pb-12 text-center md:pb-20">
            <h1 className="h1 bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 bg-clip-text pb-4 text-transparent">
              {data.title}
            </h1>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <div
                className="after:animate-shine absolute left-[2px] top-4 -z-10 h-full w-0.5 overflow-hidden bg-slate-800 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_150px,theme(colors.white))] after:absolute after:left-0 after:top-0 after:h-4 after:w-0.5 after:-translate-y-full after:bg-[linear-gradient(180deg,_transparent,_theme(colors.purple.500/.65)_25%,_theme(colors.purple.200)_50%,_theme(colors.purple.500/.65)_75%,_transparent)]"
                aria-hidden="true"
              ></div>

              {data.items?.map((item, index) => (
                <article className="group pt-12 first-of-type:pt-0" key={index}>
                  <div className="md:flex">
                    <div className="w-48 shrink-0">
                      <time className="mb-3 inline-flex items-center bg-gradient-to-r from-purple-500 to-purple-200 bg-clip-text text-sm text-transparent before:h-1.5 before:w-1.5 before:rounded-full before:bg-purple-500 before:ring-4 before:ring-purple-500/30 md:leading-8">
                        <span className="ml-[1.625rem] md:ml-5">
                          {item?.date ? formatDate(item.date) : '-'}
                        </span>
                      </time>
                    </div>
                    <div className="ml-8 grow border-b pb-12 [border-image:linear-gradient(to_right,theme(colors.slate.700/.3),theme(colors.slate.700),theme(colors.slate.700/.3))1] group-last-of-type:border-none group-last-of-type:pb-0 md:ml-0">
                      <header>
                        <h2 className="bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 bg-clip-text pb-6 text-2xl font-bold leading-8 text-transparent">
                          {item?.name}
                        </h2>
                      </header>
                      <figure className="mb-8 rounded-3xl bg-gradient-to-b from-slate-300/20 to-transparent p-px">
                        {item?.image && (
                          <Image
                            className="w-full rounded-[inherit]"
                            src={item.image}
                            width={574}
                            height={326}
                            alt={item.name}
                          />
                        )}
                      </figure>
                      <div className="prose max-w-none text-slate-400 prose-p:leading-relaxed prose-a:text-purple-500 prose-a:no-underline hover:prose-a:underline prose-strong:font-medium prose-strong:text-slate-50">
                        <Markdown>{item?.description}</Markdown>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
