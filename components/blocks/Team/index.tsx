// Team.tsx

import Image from 'next/image'
import { TeamSectionType } from './data.d'

export default function Team({ data }: { data: TeamSectionType }) {
  return (
    <section className="border-t border-gray-200 bg-gradient-to-b from-gray-100 to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="h2" style={{ color: data?.titleColor }}>
              {data.title}
            </h2>
          </div>

          {/* Team members */}
          <div
            className="-my-6 mx-auto max-w-sm sm:-mx-3 sm:-my-8 sm:flex sm:max-w-5xl sm:flex-wrap sm:justify-center"
            data-aos-id-team
          >
            {data.members &&
              data.members.map((member, index) => (
                <div
                  key={index}
                  className="py-6 sm:w-1/2 sm:px-3 sm:py-8 md:w-1/3"
                  data-aos="zoom-y-out"
                  data-aos-anchor="[data-aos-id-team]"
                  data-aos-delay={index * 150}
                >
                  <div className="flex flex-col items-center">
                    {member.image && (
                      <Image
                        className="mb-4 rounded-full"
                        src={member.image}
                        width={120}
                        height={120}
                        alt={`Team member ${index + 1}`}
                      />
                    )}
                    <h4 className="mb-1 text-xl font-bold">{member.name}</h4>
                    <div className="mb-2 font-medium text-blue-600">{member.position}</div>
                    <p className="mb-3 text-center text-gray-600">{member.description}</p>
                    <div className="text-sm font-medium text-gray-600">
                      {member.twitter && (
                        <>
                          <a className="text-gray-900 hover:underline" href={member.twitter}>
                            Twitter
                          </a>{' '}
                          ·{' '}
                        </>
                      )}
                      {member.github && (
                        <>
                          <a className="text-gray-900 hover:underline" href={member.github}>
                            GitHub
                          </a>{' '}
                          ·{' '}
                        </>
                      )}
                      {member.linkedin && (
                        <a className="text-gray-900 hover:underline" href={member.linkedin}>
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
