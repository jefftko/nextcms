import Image from 'next/image'
import TeamMember01 from '@/public/images/team-member-01.jpg'
import TeamMember02 from '@/public/images/team-member-02.jpg'
import TeamMember03 from '@/public/images/team-member-03.jpg'
import TeamMember04 from '@/public/images/team-member-04.jpg'
import TeamMember05 from '@/public/images/team-member-05.jpg'
import TeamMember06 from '@/public/images/team-member-06.jpg'
import TeamMember07 from '@/public/images/team-member-07.jpg'
import TeamMember08 from '@/public/images/team-member-08.jpg'
import TeamMember09 from '@/public/images/team-member-09.jpg'

export default function Team() {
  return (
    <section className="border-t border-gray-200 bg-gradient-to-b from-gray-100 to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h2 className="h2">The humans behind the product</h2>
          </div>

          {/* Team members */}
          <div
            className="-my-6 mx-auto max-w-sm sm:-mx-3 sm:-my-8 sm:flex sm:max-w-5xl sm:flex-wrap sm:justify-center"
            data-aos-id-team
          >
            {/* 1st member */}
            <div
              className="py-6 sm:w-1/2 sm:px-3 sm:py-8 md:w-1/3"
              data-aos="zoom-y-out"
              data-aos-anchor="[data-aos-id-team]"
            >
              <div className="flex flex-col items-center">
                <Image
                  className="mb-4 rounded-full"
                  src={TeamMember01}
                  width={120}
                  height={120}
                  alt="Team member 01"
                />
                <h4 className="mb-1 text-xl font-bold">Mark Lamprecht</h4>
                <div className="mb-2 font-medium text-blue-600">CEO & Co-founder</div>
                <p className="mb-3 text-center text-gray-600">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum sint
                  occaecat cupidatat.
                </p>
                <div className="text-sm font-medium text-gray-600">
                  <a className="text-gray-900 hover:underline" href="#0">
                    Twitter
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    GitHub
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* 2nd member */}
            <div
              className="py-6 sm:w-1/2 sm:px-3 sm:py-8 md:w-1/3"
              data-aos="zoom-y-out"
              data-aos-delay="150"
              data-aos-anchor="[data-aos-id-team]"
            >
              <div className="flex flex-col items-center">
                <Image
                  className="mb-4 rounded-full"
                  src={TeamMember02}
                  width={120}
                  height={120}
                  alt="Team member 02"
                />
                <h4 className="mb-1 text-xl font-bold">Jessie Pietrasiak</h4>
                <div className="mb-2 font-medium text-blue-600">CTO & Co-founder</div>
                <p className="mb-3 text-center text-gray-600">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum sint
                  occaecat cupidatat.
                </p>
                <div className="text-sm font-medium text-gray-600">
                  <a className="text-gray-900 hover:underline" href="#0">
                    Twitter
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    GitHub
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* 3rd member */}
            <div
              className="py-6 sm:w-1/2 sm:px-3 sm:py-8 md:w-1/3"
              data-aos="zoom-y-out"
              data-aos-delay="300"
              data-aos-anchor="[data-aos-id-team]"
            >
              <div className="flex flex-col items-center">
                <Image
                  className="mb-4 rounded-full"
                  src={TeamMember03}
                  width={120}
                  height={120}
                  alt="Team member 03"
                />
                <h4 className="mb-1 text-xl font-bold">Marina Hoffman</h4>
                <div className="mb-2 font-medium text-blue-600">Community Manager</div>
                <p className="mb-3 text-center text-gray-600">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum sint
                  occaecat cupidatat.
                </p>
                <div className="text-sm font-medium text-gray-600">
                  <a className="text-gray-900 hover:underline" href="#0">
                    Twitter
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    GitHub
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* 4th member */}
            <div
              className="py-6 sm:w-1/2 sm:px-3 sm:py-8 md:w-1/3"
              data-aos="zoom-y-out"
              data-aos-delay="450"
              data-aos-anchor="[data-aos-id-team]"
            >
              <div className="flex flex-col items-center">
                <Image
                  className="mb-4 rounded-full"
                  src={TeamMember04}
                  width={120}
                  height={120}
                  alt="Team member 04"
                />
                <h4 className="mb-1 text-xl font-bold">Anthony McGargle</h4>
                <div className="mb-2 font-medium text-blue-600">Lead Front-end Engineer</div>
                <p className="mb-3 text-center text-gray-600">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum sint
                  occaecat cupidatat.
                </p>
                <div className="text-sm font-medium text-gray-600">
                  <a className="text-gray-900 hover:underline" href="#0">
                    Twitter
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    GitHub
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* 5th member */}
            <div
              className="py-6 sm:w-1/2 sm:px-3 sm:py-8 md:w-1/3"
              data-aos="zoom-y-out"
              data-aos-delay="600"
              data-aos-anchor="[data-aos-id-team]"
            >
              <div className="flex flex-col items-center">
                <Image
                  className="mb-4 rounded-full"
                  src={TeamMember05}
                  width={120}
                  height={120}
                  alt="Team member 05"
                />
                <h4 className="mb-1 text-xl font-bold">Jessie Pietrasiak</h4>
                <div className="mb-2 font-medium text-blue-600">Head of Design</div>
                <p className="mb-3 text-center text-gray-600">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum sint
                  occaecat cupidatat.
                </p>
                <div className="text-sm font-medium text-gray-600">
                  <a className="text-gray-900 hover:underline" href="#0">
                    Twitter
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    GitHub
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* 6th member */}
            <div
              className="py-6 sm:w-1/2 sm:px-3 sm:py-8 md:w-1/3"
              data-aos="zoom-y-out"
              data-aos-delay="750"
              data-aos-anchor="[data-aos-id-team]"
            >
              <div className="flex flex-col items-center">
                <Image
                  className="mb-4 rounded-full"
                  src={TeamMember06}
                  width={120}
                  height={120}
                  alt="Team member 06"
                />
                <h4 className="mb-1 text-xl font-bold">Marina Hoffman</h4>
                <div className="mb-2 font-medium text-blue-600">Front-end Engineer</div>
                <p className="mb-3 text-center text-gray-600">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum sint
                  occaecat cupidatat.
                </p>
                <div className="text-sm font-medium text-gray-600">
                  <a className="text-gray-900 hover:underline" href="#0">
                    Twitter
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    GitHub
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* 7th member */}
            <div
              className="py-6 sm:w-1/2 sm:px-3 sm:py-8 md:w-1/3"
              data-aos="zoom-y-out"
              data-aos-delay="900"
              data-aos-anchor="[data-aos-id-team]"
            >
              <div className="flex flex-col items-center">
                <Image
                  className="mb-4 rounded-full"
                  src={TeamMember07}
                  width={120}
                  height={120}
                  alt="Team member 07"
                />
                <h4 className="mb-1 text-xl font-bold">Tamara Hastings</h4>
                <div className="mb-2 font-medium text-blue-600">Product Developer</div>
                <p className="mb-3 text-center text-gray-600">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum sint
                  occaecat cupidatat.
                </p>
                <div className="text-sm font-medium text-gray-600">
                  <a className="text-gray-900 hover:underline" href="#0">
                    Twitter
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    GitHub
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* 8th member */}
            <div
              className="py-6 sm:w-1/2 sm:px-3 sm:py-8 md:w-1/3"
              data-aos="zoom-y-out"
              data-aos-delay="1050"
              data-aos-anchor="[data-aos-id-team]"
            >
              <div className="flex flex-col items-center">
                <Image
                  className="mb-4 rounded-full"
                  src={TeamMember08}
                  width={120}
                  height={120}
                  alt="Team member 08"
                />
                <h4 className="mb-1 text-xl font-bold">Rachel Vervack</h4>
                <div className="mb-2 font-medium text-blue-600">Senior Data Scientist</div>
                <p className="mb-3 text-center text-gray-600">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum sint
                  occaecat cupidatat.
                </p>
                <div className="text-sm font-medium text-gray-600">
                  <a className="text-gray-900 hover:underline" href="#0">
                    Twitter
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    GitHub
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* 9th member */}
            <div
              className="py-6 sm:w-1/2 sm:px-3 sm:py-8 md:w-1/3"
              data-aos="zoom-y-out"
              data-aos-delay="1200"
              data-aos-anchor="[data-aos-id-team]"
            >
              <div className="flex flex-col items-center">
                <Image
                  className="mb-4 rounded-full"
                  src={TeamMember09}
                  width={120}
                  height={120}
                  alt="Team member 09"
                />
                <h4 className="mb-1 text-xl font-bold">Andrew Laurencio</h4>
                <div className="mb-2 font-medium text-blue-600">Front-end Engineer</div>
                <p className="mb-3 text-center text-gray-600">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum sint
                  occaecat cupidatat.
                </p>
                <div className="text-sm font-medium text-gray-600">
                  <a className="text-gray-900 hover:underline" href="#0">
                    Twitter
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    GitHub
                  </a>{' '}
                  ·{' '}
                  <a className="text-gray-900 hover:underline" href="#0">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
