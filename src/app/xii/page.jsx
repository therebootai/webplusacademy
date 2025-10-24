
import { XII } from '@/components/cource/XII'
import XII2 from '@/components/cource/XII2'
import Subbanner from '@/components/global/Subbanner'
import MainTemplates from '@/templates/Maintemplates'
import React from 'react'

export const metadata = {
  title: "Class XII NEET Preparation Course | Waveplus Academy Siliguri",
  description:
    "Ace your NEET with Waveplus Academy’s Class XII course in Siliguri. Comprehensive syllabus coverage, personalized attention, and consistent test analysis for better results.",
}


const page = () => {
  return (
    <>
    
     <MainTemplates>
      <Subbanner heading="Class-XII"/>
      <section className='px-4 md:px-40'>

        <XII/>
        <XII2/>
       
      </section>
          


     </MainTemplates>
    
    </>
  )
}

export default page