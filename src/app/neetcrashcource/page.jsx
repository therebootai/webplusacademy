
import { Neetcrashcource } from '@/components/cource/Neetcrashcource'
import Neetcrashcource2 from '@/components/cource/Neetcrashcource2'
import Subbanner from '@/components/global/Subbanner'
import MainTemplates from '@/templates/Maintemplates'
import React from 'react'


export const metadata = {
  title: "Best NEET Crash Course in Siliguri | Waveplus Academy",
  description:
    "Enroll in Waveplus Academy’s best NEET crash course in Siliguri. Intensive preparation, doubt-clearing sessions, and expert guidance to boost your NEET score in less time.",
}

const page = () => {
  return (
    <>
    
     <MainTemplates>
      <Subbanner heading="NEET Crash Cource"/>
      <section className='px-4 md:px-40'>

           <Neetcrashcource/>
           <Neetcrashcource2/>
        
      </section>
          


     </MainTemplates>
    
    </>
  )
}

export default page