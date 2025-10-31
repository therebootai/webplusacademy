
import { Facilities } from '@/components/facilities/Facilities'
import { Hostelfacilities } from '@/components/facilities/Hostelfacilities'
import Subbanner from '@/components/global/Subbanner'
import MainTemplates from '@/templates/Maintemplates'
import React from 'react'



export const metadata = {
  title: "Facilities at Waveplus Academy | Modern Learning Environment for NEET Students",
  description:
    "Explore the world-class facilities at Waveplus Academy in Siliguri — smart classrooms, study materials, regular tests, and mentorship to ensure the best NEET preparation experience.",
}

const page = () => {
  return (
         <>
         <MainTemplates>
            <Subbanner heading="Facilities"/>

              <section className='px-4 lg:px-28 xl:px-40'>

            
              <Facilities/>
              <Hostelfacilities/>
  
              </section>
         </MainTemplates>
         </>
  )
}

export default page