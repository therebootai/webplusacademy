import Gallery from '@/components/gallery/Gallery'
import Subbanner from '@/components/global/Subbanner'
import MainTemplates from '@/templates/Maintemplates'
import React from 'react'



export const metadata = {
  title: "Gallery | Waveplus Academy – NEET Coaching in Siliguri",
  description:
    "View our gallery showcasing classroom sessions, student achievements, and events at Waveplus Academy – the leading NEET coaching center in Siliguri.",
}


const page = () => {
  return (
    <>
    
     <MainTemplates>
      <Subbanner heading="Image Gallery"/>
      <section className="px-4 md:px-40">

      <Gallery/>
      </section>

     </MainTemplates>
    
    </>
  )
}

export default page