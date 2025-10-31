import { Aboutsection1 } from '@/components/about/aboutsection1'
import { Whatweoffer } from '@/components/about/Whatweoffer'
import Subbanner from '@/components/global/Subbanner'
import MainTemplates from '@/templates/Maintemplates'
import React from 'react'


export const metadata = {
  title: "About Waveplus Academy | 15+ Years of NEET Coaching Experience in Siliguri",
  description:
    "Learn about Waveplus Academy, Siliguri’s trusted NEET coaching institute with 15+ years of experience, expert faculty, and a legacy of producing top NEET achievers every year.",
}

const page = () => {
  return (
    <>
      <MainTemplates>
        <Subbanner heading="About Us" />
        <section className="px-4 lg:px-28 xl:px-40">
          <Aboutsection1 />
          <Whatweoffer />
        </section>
      </MainTemplates>
    </>
  )
}

export default page
