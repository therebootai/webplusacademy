
import { XI } from '@/components/cource/XI'
import XII2 from '@/components/cource/XI2'
import Subbanner from '@/components/global/Subbanner'
import TabCard from '@/components/home/Tabcard'
import MainTemplates from '@/templates/Maintemplates'
import React from 'react'

export const metadata = {
  title: "Waveplus Academy Results | Top NEET Rank Holders from Siliguri",
  description:
    "Check Waveplus Academy’s proven NEET results. Our students consistently secure top ranks, making us one of the best NEET coaching institutes in Siliguri with a strong success history.",
}


const page = () => {
  return (
    <>
    
     <MainTemplates>
      <Subbanner heading=" Result "/>
      <section className='px-4 lg:px-28 xl:px-40 py-10'>


        <TabCard/>


        
      </section>
          


     </MainTemplates>
    
    </>
  )
}

export default page