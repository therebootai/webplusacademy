import { Neet } from '@/components/cource/Neet'
import Neetsection2 from '@/components/cource/Neetsection2'
import Subbanner from '@/components/global/Subbanner'
import MainTemplates from '@/templates/Maintemplates'
import React from 'react'


export const metadata = {
  title: "Best NEET Coaching Institute in Siliguri | Waveplus Academy",
  description:
    "Join the best NEET coaching institute in Siliguri – Waveplus Academy. Experienced faculty, proven methods, and top results make us the top choice for NEET aspirants.",
}

const page = () => {
  return (
    <>
    
     <MainTemplates>
      <Subbanner heading="NEET"/>
      <section className='px-4 md:px-40'>


        <Neet/>
        <Neetsection2/>
      </section>
          


     </MainTemplates>
    
    </>
  )
}

export default page